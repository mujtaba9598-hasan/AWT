package com.example.alwahabtrust.ui.main

import android.app.Application
import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.example.alwahabtrust.data.LocalTrustRepository
import com.example.alwahabtrust.data.TrustRepository
import com.example.alwahabtrust.model.TransactionDraft
import com.example.alwahabtrust.model.TrustAppState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class MainScreenUiState(
  val appState: TrustAppState = TrustAppState(),
  val pinError: String? = null,
  val bannerMessage: String? = null,
)

class MainScreenViewModel(private val repository: TrustRepository) : ViewModel() {
  private val pinError = MutableStateFlow<String?>(null)
  private val bannerMessage = MutableStateFlow<String?>(null)

  val uiState: StateFlow<MainScreenUiState> =
    combine(repository.appState, pinError, bannerMessage) { appState, currentPinError, currentBanner ->
        MainScreenUiState(
          appState = appState,
          pinError = currentPinError,
          bannerMessage = currentBanner,
        )
      }
      .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), MainScreenUiState())

  fun unlockAdmin(pin: String) {
    viewModelScope.launch {
      val unlocked = repository.unlockAdmin(pin)
      pinError.value = if (unlocked) null else "Incorrect PIN"
      bannerMessage.value = if (unlocked) "Admin view unlocked on this device" else null
    }
  }

  fun lockAdmin() {
    viewModelScope.launch {
      repository.lockAdmin()
      pinError.value = null
      bannerMessage.value = "Returned to public view"
    }
  }

  fun setUrduEnabled(enabled: Boolean) {
    viewModelScope.launch {
      repository.setUrduEnabled(enabled)
      bannerMessage.value = if (enabled) "Urdu mode enabled locally" else "English mode enabled locally"
    }
  }

  fun addTransaction(draft: TransactionDraft) {
    viewModelScope.launch {
      val amount = draft.amountPkr.toLongOrNull()
      if (draft.title.isBlank() || draft.category.isBlank() || amount == null) {
        bannerMessage.value = "Enter title, category, and a valid amount"
        return@launch
      }

      repository.addTransaction(draft.copy(amountPkr = amount.toString()))
      bannerMessage.value = "Entry saved to local phone storage"
    }
  }

  fun updateTransaction(transactionId: String, draft: TransactionDraft) {
    viewModelScope.launch {
      val amount = draft.amountPkr.toLongOrNull()
      if (draft.title.isBlank() || draft.category.isBlank() || amount == null) {
        bannerMessage.value = "Enter title, category, and a valid amount"
        return@launch
      }

      repository.updateTransaction(transactionId, draft.copy(amountPkr = amount.toString()))
      bannerMessage.value = "Entry updated on this device"
    }
  }

  fun deleteTransaction(transactionId: String) {
    viewModelScope.launch {
      repository.deleteTransaction(transactionId)
      bannerMessage.value = "Entry deleted from local storage"
    }
  }

  companion object {
    fun factory(): ViewModelProvider.Factory =
      viewModelFactory {
        initializer {
          val application = this[ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY] as Application
          MainScreenViewModel(LocalTrustRepository(application.applicationContext))
        }
      }
  }
}
