package com.example.alwahabtrust.ui.main

import androidx.activity.ComponentActivity
import androidx.compose.ui.test.assertExists
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithText
import com.example.alwahabtrust.model.TrustAppState
import com.example.alwahabtrust.theme.AlWahabTrustTheme
import org.junit.Before
import org.junit.Rule
import org.junit.Test

class MainScreenTest {
  @get:Rule val composeTestRule = createAndroidComposeRule<ComponentActivity>()

  @Before
  fun setup() {
    composeTestRule.setContent {
      AlWahabTrustTheme {
        MainScreenContent(
          state = MainScreenUiState(appState = TrustAppState.sample()),
          onUnlockAdmin = {},
          onLockAdmin = {},
          onToggleLanguage = {},
          onAddTransaction = {},
          onUpdateTransaction = { _, _ -> },
          onDeleteTransaction = {},
        )
      }
    }
  }

  @Test
  fun overviewContent_exists() {
    composeTestRule.onNodeWithText("Total funds").assertExists()
    composeTestRule.onNodeWithText("Recent activity").assertExists()
  }
}
