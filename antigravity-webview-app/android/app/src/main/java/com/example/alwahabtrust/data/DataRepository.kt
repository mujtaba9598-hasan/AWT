package com.example.alwahabtrust.data

import android.content.Context
import android.net.Uri
import android.provider.OpenableColumns
import com.example.alwahabtrust.model.TransactionDraft
import com.example.alwahabtrust.model.TransactionKind
import com.example.alwahabtrust.model.TrustAppState
import com.example.alwahabtrust.model.TrustTransaction
import java.io.File
import java.io.FileOutputStream
import java.util.UUID
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject

interface TrustRepository {
  val appState: StateFlow<TrustAppState>

  suspend fun unlockAdmin(pin: String): Boolean

  suspend fun lockAdmin()

  suspend fun setUrduEnabled(enabled: Boolean)

  suspend fun addTransaction(draft: TransactionDraft)

  suspend fun updateTransaction(transactionId: String, draft: TransactionDraft)

  suspend fun deleteTransaction(transactionId: String)
}

class LocalTrustRepository(private val context: Context) : TrustRepository {
  private val transactionsFile = File(context.filesDir, "awt_transactions.json")
  private val settingsFile = File(context.filesDir, "awt_settings.json")
  private val receiptsDir = File(context.filesDir, "receipts").apply { mkdirs() }
  private val _appState = MutableStateFlow(loadState())

  override val appState: StateFlow<TrustAppState> = _appState.asStateFlow()

  override suspend fun unlockAdmin(pin: String): Boolean =
    withContext(Dispatchers.IO) {
      if (pin.trim() != ADMIN_PIN) return@withContext false
      _appState.value = _appState.value.copy(isAdminUnlocked = true)
      true
    }

  override suspend fun lockAdmin() {
    withContext(Dispatchers.IO) {
      _appState.value = _appState.value.copy(isAdminUnlocked = false)
    }
  }

  override suspend fun setUrduEnabled(enabled: Boolean) {
    withContext(Dispatchers.IO) {
      _appState.value = _appState.value.copy(isUrduEnabled = enabled)
      saveSettings(enabled)
    }
  }

  override suspend fun addTransaction(draft: TransactionDraft) {
    withContext(Dispatchers.IO) {
      val receipt = persistReceipt(draft.receiptSourceUri, draft.receiptName)
      val transaction =
        TrustTransaction(
          id = UUID.randomUUID().toString(),
          date = draft.date,
          title = draft.title,
          note = draft.note.ifBlank { draft.title },
          amountPkr = draft.amountPkr.toLong(),
          category = draft.category,
          kind = draft.kind,
          representative = draft.representative.ifBlank { "Field team" },
          donorName = if (draft.kind == TransactionKind.Intake) "Private donor" else null,
          receiptName = receipt?.displayName,
          receiptFilePath = receipt?.localPath,
        )

      val updatedTransactions = listOf(transaction) + _appState.value.transactions
      _appState.value = _appState.value.copy(transactions = updatedTransactions)
      saveTransactions(updatedTransactions)
    }
  }

  override suspend fun updateTransaction(transactionId: String, draft: TransactionDraft) {
    withContext(Dispatchers.IO) {
      val existing = _appState.value.transactions.firstOrNull { it.id == transactionId } ?: return@withContext
      val newReceipt = if (draft.receiptSourceUri != null) persistReceipt(draft.receiptSourceUri, draft.receiptName) else null

      if ((newReceipt != null || !draft.keepExistingReceipt) && existing.receiptFilePath != null) {
        File(existing.receiptFilePath).takeIf { it.exists() }?.delete()
      }

      val updatedTransaction =
        existing.copy(
          date = draft.date,
          title = draft.title,
          note = draft.note.ifBlank { draft.title },
          amountPkr = draft.amountPkr.toLong(),
          category = draft.category,
          kind = draft.kind,
          representative = draft.representative.ifBlank { existing.representative },
          donorName =
            when (draft.kind) {
              TransactionKind.Intake -> existing.donorName ?: "Private donor"
              TransactionKind.Outlay -> null
            },
          receiptName =
            when {
              newReceipt != null -> newReceipt.displayName
              draft.keepExistingReceipt -> existing.receiptName
              else -> null
            },
          receiptFilePath =
            when {
              newReceipt != null -> newReceipt.localPath
              draft.keepExistingReceipt -> existing.receiptFilePath
              else -> null
            },
        )

      val updatedTransactions =
        _appState.value.transactions.map { transaction ->
          if (transaction.id == transactionId) updatedTransaction else transaction
        }
      _appState.value = _appState.value.copy(transactions = updatedTransactions)
      saveTransactions(updatedTransactions)
    }
  }

  override suspend fun deleteTransaction(transactionId: String) {
    withContext(Dispatchers.IO) {
      val existing = _appState.value.transactions.firstOrNull { it.id == transactionId } ?: return@withContext
      existing.receiptFilePath?.let { path -> File(path).takeIf { it.exists() }?.delete() }
      val updatedTransactions = _appState.value.transactions.filterNot { it.id == transactionId }
      _appState.value = _appState.value.copy(transactions = updatedTransactions)
      saveTransactions(updatedTransactions)
    }
  }

  private fun loadState(): TrustAppState {
    val storedTransactions = loadTransactions()
    val isUrduEnabled = loadSettings()
    return TrustAppState(
      transactions = storedTransactions.ifEmpty { TrustAppState.sample().transactions },
      isAdminUnlocked = false,
      isUrduEnabled = isUrduEnabled,
    ).also {
      if (storedTransactions.isEmpty()) {
        saveTransactions(it.transactions)
      }
    }
  }

  private fun loadTransactions(): List<TrustTransaction> {
    if (!transactionsFile.exists()) return emptyList()
    val raw = transactionsFile.readText()
    if (raw.isBlank()) return emptyList()

    val jsonArray = JSONArray(raw)
    return buildList {
      for (index in 0 until jsonArray.length()) {
        val item = jsonArray.getJSONObject(index)
        add(
          TrustTransaction(
            id = item.getString("id"),
            date = item.getString("date"),
            title = item.getString("title"),
            note = item.getString("note"),
            amountPkr = item.getLong("amountPkr"),
            category = item.getString("category"),
            kind = TransactionKind.valueOf(item.getString("kind")),
            representative = item.getString("representative"),
            donorName = item.optString("donorName").takeIf { it.isNotBlank() },
            receiptName = item.optString("receiptName").takeIf { it.isNotBlank() },
            receiptFilePath = item.optString("receiptFilePath").takeIf { it.isNotBlank() },
          )
        )
      }
    }
  }

  private fun saveTransactions(transactions: List<TrustTransaction>) {
    val jsonArray =
      JSONArray().apply {
        transactions.forEach { transaction ->
          put(
            JSONObject().apply {
              put("id", transaction.id)
              put("date", transaction.date)
              put("title", transaction.title)
              put("note", transaction.note)
              put("amountPkr", transaction.amountPkr)
              put("category", transaction.category)
              put("kind", transaction.kind.name)
              put("representative", transaction.representative)
              put("donorName", transaction.donorName ?: "")
              put("receiptName", transaction.receiptName ?: "")
              put("receiptFilePath", transaction.receiptFilePath ?: "")
            }
          )
        }
      }
    transactionsFile.writeText(jsonArray.toString())
  }

  private fun loadSettings(): Boolean {
    if (!settingsFile.exists()) return false
    val raw = settingsFile.readText()
    if (raw.isBlank()) return false
    return JSONObject(raw).optBoolean("isUrduEnabled", false)
  }

  private fun saveSettings(isUrduEnabled: Boolean) {
    settingsFile.writeText(JSONObject().put("isUrduEnabled", isUrduEnabled).toString())
  }

  private fun persistReceipt(uriString: String?, requestedName: String?): StoredReceipt? {
    if (uriString.isNullOrBlank()) return null

    val uri = Uri.parse(uriString)
    val displayName = requestedName ?: resolveDisplayName(uri) ?: "receipt-${System.currentTimeMillis()}"
    val extension = displayName.substringAfterLast('.', "").takeIf { it.isNotBlank() } ?: "bin"
    val sanitizedBase = displayName.substringBeforeLast('.').replace(Regex("[^A-Za-z0-9_-]"), "_").ifBlank { "receipt" }
    val outputFile = File(receiptsDir, "${sanitizedBase}_${System.currentTimeMillis()}.$extension")

    context.contentResolver.openInputStream(uri)?.use { input ->
      FileOutputStream(outputFile).use { output -> input.copyTo(output) }
    } ?: return null

    return StoredReceipt(displayName = displayName, localPath = outputFile.absolutePath)
  }

  private fun resolveDisplayName(uri: Uri): String? =
    context.contentResolver.query(uri, arrayOf(OpenableColumns.DISPLAY_NAME), null, null, null)?.use { cursor ->
      val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
      if (nameIndex >= 0 && cursor.moveToFirst()) cursor.getString(nameIndex) else null
    }

  private data class StoredReceipt(val displayName: String, val localPath: String)

  private companion object {
    const val ADMIN_PIN = "1234"
  }
}
