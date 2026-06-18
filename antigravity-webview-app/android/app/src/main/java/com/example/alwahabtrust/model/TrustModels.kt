package com.example.alwahabtrust.model

enum class AppTab(val label: String, val shortLabel: String) {
  Overview("Overview", "Home"),
  Ledger("Ledger", "Book"),
  Insights("Insights", "Data"),
  Settings("Settings", "More"),
}

enum class TransactionKind {
  Intake,
  Outlay,
}

data class TrustTransaction(
  val id: String,
  val date: String,
  val title: String,
  val note: String,
  val amountPkr: Long,
  val category: String,
  val kind: TransactionKind,
  val representative: String,
  val donorName: String? = null,
  val receiptName: String? = null,
  val receiptFilePath: String? = null,
)

data class TransactionDraft(
  val title: String,
  val note: String,
  val amountPkr: String,
  val category: String,
  val date: String,
  val representative: String,
  val kind: TransactionKind,
  val receiptName: String? = null,
  val receiptSourceUri: String? = null,
  val keepExistingReceipt: Boolean = true,
)

data class TrustAppState(
  val transactions: List<TrustTransaction> = emptyList(),
  val isAdminUnlocked: Boolean = false,
  val isUrduEnabled: Boolean = false,
) {
  companion object {
    fun sample(isAdminUnlocked: Boolean = false): TrustAppState =
      TrustAppState(
        transactions =
          listOf(
            TrustTransaction(
              id = "1",
              date = "04 Apr 2026",
              title = "Donation from community sponsor",
              note = "Support received for ration distribution",
              amountPkr = 145000,
              category = "Donations",
              kind = TransactionKind.Intake,
              representative = "Usman",
              donorName = "Confidential donor",
              receiptName = "Bank transfer",
            ),
            TrustTransaction(
              id = "2",
              date = "09 Apr 2026",
              title = "Bulk groceries",
              note = "Rice, flour, cooking oil, lentils and packing supplies",
              amountPkr = 68250,
              category = "Food Relief",
              kind = TransactionKind.Outlay,
              representative = "Operations",
              receiptName = "MandI invoice",
            ),
            TrustTransaction(
              id = "3",
              date = "19 May 2026",
              title = "Donation from family collection",
              note = "Collected during Friday community visit",
              amountPkr = 97000,
              category = "Donations",
              kind = TransactionKind.Intake,
              representative = "Farhan",
              donorName = "Private family contribution",
              receiptName = "Cash receipt",
            ),
            TrustTransaction(
              id = "4",
              date = "02 Jun 2026",
              title = "Transport and labor",
              note = "Delivery support for ration drop-off",
              amountPkr = 21400,
              category = "Logistics",
              kind = TransactionKind.Outlay,
              representative = "Operations",
              receiptName = "Driver receipt",
            ),
          ),
        isAdminUnlocked = isAdminUnlocked,
      )
  }
}
