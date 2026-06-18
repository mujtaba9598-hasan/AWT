package com.example.alwahabtrust.ui.main

import com.example.alwahabtrust.data.TrustRepository
import com.example.alwahabtrust.model.TransactionDraft
import com.example.alwahabtrust.model.TransactionKind
import com.example.alwahabtrust.model.TrustAppState
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertFalse
import junit.framework.TestCase.assertTrue
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.runTest
import org.junit.Test

class MainScreenViewModelTest {
  @Test
  fun unlockAdmin_withWrongPin_setsError() = runTest {
    val viewModel = MainScreenViewModel(FakeTrustRepository())

    viewModel.unlockAdmin("0000")
    advanceUntilIdle()

    assertEquals("Incorrect PIN", viewModel.uiState.value.pinError)
    assertFalse(viewModel.uiState.value.appState.isAdminUnlocked)
  }

  @Test
  fun addTransaction_withValidDraft_updatesLocalState() = runTest {
    val repository = FakeTrustRepository()
    val viewModel = MainScreenViewModel(repository)

    viewModel.addTransaction(
      TransactionDraft(
        title = "Vendor payment",
        note = "Rice bags",
        amountPkr = "9000",
        category = "Food Relief",
        date = "18 Jun 2026",
        representative = "Ops",
        kind = TransactionKind.Outlay,
      )
    )
    advanceUntilIdle()

    assertTrue(repository.appState.value.transactions.any { it.title == "Vendor payment" })
  }
}

private class FakeTrustRepository : TrustRepository {
  private val mutableState = MutableStateFlow(TrustAppState.sample())
  override val appState: StateFlow<TrustAppState> = mutableState

  override suspend fun unlockAdmin(pin: String): Boolean {
    val unlocked = pin == "1234"
    if (unlocked) {
      mutableState.value = mutableState.value.copy(isAdminUnlocked = true)
    }
    return unlocked
  }

  override suspend fun lockAdmin() {
    mutableState.value = mutableState.value.copy(isAdminUnlocked = false)
  }

  override suspend fun setUrduEnabled(enabled: Boolean) {
    mutableState.value = mutableState.value.copy(isUrduEnabled = enabled)
  }

  override suspend fun addTransaction(draft: TransactionDraft) {
    mutableState.value =
      mutableState.value.copy(
        transactions =
          mutableListOf<com.example.alwahabtrust.model.TrustTransaction>().apply {
            addAll(mutableState.value.transactions)
            add(
              com.example.alwahabtrust.model.TrustTransaction(
                id = "new",
                date = draft.date,
                title = draft.title,
                note = draft.note,
                amountPkr = draft.amountPkr.toLong(),
                category = draft.category,
                kind = draft.kind,
                representative = draft.representative,
              )
            )
          }
      )
  }

  override suspend fun updateTransaction(transactionId: String, draft: TransactionDraft) {
    mutableState.value =
      mutableState.value.copy(
        transactions =
          mutableState.value.transactions.map { transaction ->
            if (transaction.id == transactionId) {
              transaction.copy(
                date = draft.date,
                title = draft.title,
                note = draft.note,
                amountPkr = draft.amountPkr.toLong(),
                category = draft.category,
                kind = draft.kind,
                representative = draft.representative,
              )
            } else {
              transaction
            }
          }
      )
  }

  override suspend fun deleteTransaction(transactionId: String) {
    mutableState.value =
      mutableState.value.copy(
        transactions = mutableState.value.transactions.filterNot { it.id == transactionId }
      )
  }
}
