package com.example.alwahabtrust.ui.main

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.Crossfade
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.Image
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.alwahabtrust.R
import com.example.alwahabtrust.model.AppTab
import com.example.alwahabtrust.model.TransactionDraft
import com.example.alwahabtrust.model.TransactionKind
import com.example.alwahabtrust.model.TrustAppState
import com.example.alwahabtrust.model.TrustTransaction
import com.example.alwahabtrust.theme.AlWahabTrustTheme
import java.text.NumberFormat
import java.util.Locale

@Composable
fun MainScreen(
  modifier: Modifier = Modifier,
  viewModel: MainScreenViewModel = viewModel(factory = MainScreenViewModel.factory()),
) {
  val state by viewModel.uiState.collectAsStateWithLifecycle()
  MainScreenContent(
    state = state,
    modifier = modifier,
    onUnlockAdmin = viewModel::unlockAdmin,
    onLockAdmin = viewModel::lockAdmin,
    onToggleLanguage = viewModel::setUrduEnabled,
    onAddTransaction = viewModel::addTransaction,
  )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun MainScreenContent(
  state: MainScreenUiState,
  onUnlockAdmin: (String) -> Unit,
  onLockAdmin: () -> Unit,
  onToggleLanguage: (Boolean) -> Unit,
  onAddTransaction: (TransactionDraft) -> Unit,
  modifier: Modifier = Modifier,
) {
  val appState = state.appState
  var selectedTab by rememberSaveable { mutableStateOf(AppTab.Overview) }
  var showPinDialog by rememberSaveable { mutableStateOf(false) }
  var showAddDialog by rememberSaveable { mutableStateOf(false) }
  val snackbarHostState = remember { SnackbarHostState() }

  LaunchedEffect(state.bannerMessage) {
    state.bannerMessage?.let { snackbarHostState.showSnackbar(it) }
  }

  LaunchedEffect(appState.isAdminUnlocked) {
    if (appState.isAdminUnlocked) {
      showPinDialog = false
      selectedTab = AppTab.Settings
    }
  }

  Scaffold(
    modifier = modifier.fillMaxSize(),
    containerColor = MaterialTheme.colorScheme.background,
    snackbarHost = { SnackbarHost(snackbarHostState) },
    topBar = {
      AppHero(
        appState = appState,
        selectedTab = selectedTab,
        onPublicSelected = { selectedTab = AppTab.Overview },
        onAdminSelected = { if (appState.isAdminUnlocked) selectedTab = AppTab.Settings else showPinDialog = true },
      )
    },
    bottomBar = {
      NavigationBar(containerColor = MaterialTheme.colorScheme.surface) {
        AppTab.entries.forEach { tab ->
          NavigationBarItem(
            selected = tab == selectedTab,
            onClick = { selectedTab = tab },
            icon = {
              Surface(
                shape = CircleShape,
                color =
                  if (tab == selectedTab) MaterialTheme.colorScheme.primary.copy(alpha = 0.14f)
                  else Color.Transparent,
              ) {
                Text(
                  text = tab.shortLabel,
                  modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                  style = MaterialTheme.typography.labelMedium,
                  color =
                    if (tab == selectedTab) MaterialTheme.colorScheme.primary
                    else MaterialTheme.colorScheme.onSurfaceVariant,
                )
              }
            },
            label = { Text(tab.label) },
          )
        }
      }
    },
    floatingActionButton = {
      if (appState.isAdminUnlocked && selectedTab == AppTab.Ledger) {
        FloatingActionButton(
          onClick = { showAddDialog = true },
          containerColor = MaterialTheme.colorScheme.primary,
          contentColor = MaterialTheme.colorScheme.onPrimary,
        ) {
          Text("Add")
        }
      }
    },
  ) { innerPadding ->
    Crossfade(
      targetState = selectedTab,
      animationSpec = tween(durationMillis = 320, easing = FastOutSlowInEasing),
      label = "tab_content",
    ) { tab ->
      when (tab) {
        AppTab.Overview ->
          OverviewTab(
            appState = appState,
            modifier = Modifier.padding(innerPadding),
          )
        AppTab.Ledger ->
          LedgerTab(
            appState = appState,
            modifier = Modifier.padding(innerPadding),
          )
        AppTab.Insights ->
          InsightsTab(
            appState = appState,
            modifier = Modifier.padding(innerPadding),
          )
        AppTab.Settings ->
          SettingsTab(
            appState = appState,
            onToggleLanguage = onToggleLanguage,
            onOpenAdmin = { showPinDialog = true },
            onLockAdmin = onLockAdmin,
            modifier = Modifier.padding(innerPadding),
          )
      }
    }
  }

  if (showPinDialog) {
    AdminPinDialog(
      error = state.pinError,
      onDismiss = { showPinDialog = false },
      onUnlock = onUnlockAdmin,
    )
  }

  if (showAddDialog) {
    AddTransactionDialog(
      onDismiss = { showAddDialog = false },
      onSave = {
        onAddTransaction(it)
        showAddDialog = false
      },
    )
  }
}

@Composable
private fun AppHero(
  appState: TrustAppState,
  selectedTab: AppTab,
  onPublicSelected: () -> Unit,
  onAdminSelected: () -> Unit,
) {
  val gradient =
    Brush.linearGradient(
      listOf(
        MaterialTheme.colorScheme.primaryContainer,
        MaterialTheme.colorScheme.secondaryContainer,
        MaterialTheme.colorScheme.tertiaryContainer,
      )
    )

  Box(
    modifier =
      Modifier
        .fillMaxWidth()
        .background(MaterialTheme.colorScheme.background)
        .padding(horizontal = 16.dp, vertical = 12.dp),
  ) {
    Card(
      shape = RoundedCornerShape(28.dp),
      colors = CardDefaults.cardColors(containerColor = Color.Transparent),
      modifier = Modifier.fillMaxWidth(),
    ) {
      Box(
        modifier =
          Modifier
            .background(gradient)
            .padding(horizontal = 20.dp, vertical = 18.dp),
      ) {
        Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
          ) {
            Row(
              modifier = Modifier.weight(1f),
              verticalAlignment = Alignment.CenterVertically,
              horizontalArrangement = Arrangement.spacedBy(14.dp),
            ) {
              Surface(
                shape = RoundedCornerShape(22.dp),
                color = MaterialTheme.colorScheme.surface.copy(alpha = 0.82f),
              ) {
                Image(
                  painter = painterResource(id = R.drawable.logo),
                  contentDescription = "Al Wahab Trust logo",
                  contentScale = ContentScale.Fit,
                  modifier = Modifier.size(72.dp).padding(8.dp),
                )
              }
              Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                  text = "Al Wahab Trust",
                  style = MaterialTheme.typography.headlineSmall,
                  fontWeight = FontWeight.SemiBold,
                  color = MaterialTheme.colorScheme.onPrimaryContainer,
                )
                Text(
                  text =
                    if (appState.isAdminUnlocked) "Native local app with admin controls"
                    else "Public transparency view with private donor protection",
                  style = MaterialTheme.typography.bodyMedium,
                  color = MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.82f),
                )
              }
            }
            StatusPill(
              text = if (appState.isAdminUnlocked) "Admin View" else "Public View",
              tint =
                if (appState.isAdminUnlocked) MaterialTheme.colorScheme.tertiary
                else MaterialTheme.colorScheme.primary,
            )
          }

          Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            TogglePill(
              text = "Public",
              selected = !appState.isAdminUnlocked || selectedTab != AppTab.Settings,
              onClick = onPublicSelected,
            )
            TogglePill(
              text = if (appState.isAdminUnlocked) "Admin Ready" else "Unlock Admin",
              selected = appState.isAdminUnlocked && selectedTab == AppTab.Settings,
              onClick = onAdminSelected,
            )
          }
        }
      }
    }
  }
}

@Composable
private fun TogglePill(text: String, selected: Boolean, onClick: () -> Unit) {
  OutlinedButton(
    onClick = onClick,
    shape = RoundedCornerShape(999.dp),
    border =
      BorderStroke(
        width = 1.dp,
        color =
          if (selected) MaterialTheme.colorScheme.onPrimaryContainer
          else MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.28f),
      ),
    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
  ) {
    Text(
      text = text,
      color =
        if (selected) MaterialTheme.colorScheme.onPrimaryContainer
        else MaterialTheme.colorScheme.onPrimaryContainer.copy(alpha = 0.78f),
    )
  }
}

@Composable
private fun OverviewTab(appState: TrustAppState, modifier: Modifier = Modifier) {
  val dashboard = remember(appState) { DashboardStats.from(appState.transactions) }

  Column(
    modifier =
      modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .safeDrawingPadding()
        .navigationBarsPadding()
        .padding(horizontal = 16.dp, vertical = 8.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp),
  ) {
    Row(
      modifier = Modifier.horizontalScroll(rememberScrollState()),
      horizontalArrangement = Arrangement.spacedBy(12.dp),
    ) {
      MetricCard("Total funds", dashboard.balanceLabel, "Available for community work")
      MetricCard("Total intake", dashboard.intakeLabel, "Protected donor-facing donations")
      MetricCard("Total outlay", dashboard.outlayLabel, "Visible public spending")
    }

    PremiumSectionCard(title = "Today at a glance", subtitle = "A clearer mobile-first trust dashboard") {
      Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        InsightRow("Recent activity", "${appState.transactions.size} stored entries on this device")
        InsightRow("Privacy mode", "Public users see protected donor intake details")
        InsightRow("Storage mode", "Everything stays on the phone for now")
      }
    }

    PremiumSectionCard(title = "Recent activity", subtitle = "Designed to read like a real app, not a webpage") {
      Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        appState.transactions.take(4).forEach { transaction ->
          TransactionCard(transaction = transaction, isAdmin = appState.isAdminUnlocked)
        }
      }
    }
  }
}

@Composable
private fun LedgerTab(appState: TrustAppState, modifier: Modifier = Modifier) {
  var filter by rememberSaveable { mutableStateOf("All") }
  val filteredTransactions =
    remember(appState, filter) {
      when (filter) {
        "Intake" -> appState.transactions.filter { it.kind == TransactionKind.Intake }
        "Outlay" -> appState.transactions.filter { it.kind == TransactionKind.Outlay }
        else -> appState.transactions
      }
    }

  Column(
    modifier =
      modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .safeDrawingPadding()
        .navigationBarsPadding()
        .padding(horizontal = 16.dp, vertical = 8.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp),
  ) {
    PremiumSectionCard(title = "Ledger", subtitle = "Swipe-friendly finance tracking with local-only data") {
      Row(
        modifier = Modifier.horizontalScroll(rememberScrollState()),
        horizontalArrangement = Arrangement.spacedBy(10.dp),
      ) {
        listOf("All", "Intake", "Outlay").forEach { label ->
          FilterChip(
            selected = filter == label,
            onClick = { filter = label },
            label = { Text(label) },
          )
        }
      }
    }

    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
      filteredTransactions.forEach { transaction ->
        TransactionCard(transaction = transaction, isAdmin = appState.isAdminUnlocked)
      }
    }
  }
}

@Composable
private fun InsightsTab(appState: TrustAppState, modifier: Modifier = Modifier) {
  val dashboard = remember(appState) { DashboardStats.from(appState.transactions) }
  val monthlyProgress = remember(appState) { monthlyBreakdown(appState.transactions) }

  Column(
    modifier =
      modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .safeDrawingPadding()
        .navigationBarsPadding()
        .padding(horizontal = 16.dp, vertical = 8.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp),
  ) {
    PremiumSectionCard(title = "Spending rhythm", subtitle = "A native visual summary for local operations") {
      Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        monthlyProgress.forEach { item ->
          val spendRatio =
            if (dashboard.maxMonthlyOutlay == 0f) 0f else item.outlay.toFloat() / dashboard.maxMonthlyOutlay
          val fill by animateFloatAsState(spendRatio, label = "bar_fill")
          Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
              Text(item.label, style = MaterialTheme.typography.titleSmall)
              Text(formatCurrency(item.outlay), style = MaterialTheme.typography.bodyMedium)
            }
            Box(
              modifier =
                Modifier
                  .fillMaxWidth()
                  .clip(RoundedCornerShape(999.dp))
                  .background(MaterialTheme.colorScheme.surfaceVariant)
                  .height(12.dp),
            ) {
              Box(
                modifier =
                  Modifier
                    .fillMaxWidth(fill)
                    .clip(RoundedCornerShape(999.dp))
                    .background(
                      Brush.horizontalGradient(
                        listOf(MaterialTheme.colorScheme.primary, MaterialTheme.colorScheme.tertiary)
                      )
                    )
                    .height(12.dp),
              )
            }
          }
        }
      }
    }

    PremiumSectionCard(title = "Category mix", subtitle = "What this phone currently shows") {
      Row(
        modifier = Modifier.horizontalScroll(rememberScrollState()),
        horizontalArrangement = Arrangement.spacedBy(10.dp),
      ) {
        dashboard.categorySummary.forEach { summary ->
          AssistChip(onClick = {}, label = { Text("${summary.first} ${formatCurrency(summary.second)}") })
        }
      }
    }
  }
}

@Composable
private fun SettingsTab(
  appState: TrustAppState,
  onToggleLanguage: (Boolean) -> Unit,
  onOpenAdmin: () -> Unit,
  onLockAdmin: () -> Unit,
  modifier: Modifier = Modifier,
) {
  Column(
    modifier =
      modifier
        .fillMaxSize()
        .verticalScroll(rememberScrollState())
        .safeDrawingPadding()
        .navigationBarsPadding()
        .padding(horizontal = 16.dp, vertical = 8.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp),
  ) {
    PremiumSectionCard(title = "Device mode", subtitle = "This first version stays fully local") {
      Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        SettingRow(
          title = "Urdu support",
          subtitle = "Keeps language state on this device only",
          trailing = {
            Switch(checked = appState.isUrduEnabled, onCheckedChange = onToggleLanguage)
          },
        )
        SettingRow(
          title = "Receipt storage",
          subtitle = "Images and future files stay on phone storage for now",
          trailing = { StatusPill(text = "Local", tint = MaterialTheme.colorScheme.secondary) },
        )
      }
    }

    PremiumSectionCard(title = "Admin center", subtitle = "Separate controls from the public experience") {
      Column(verticalArrangement = Arrangement.spacedBy(14.dp)) {
        SettingRow(
          title = if (appState.isAdminUnlocked) "Admin unlocked" else "Admin locked",
          subtitle =
            if (appState.isAdminUnlocked) "Sensitive donor details are visible only in admin mode"
            else "Unlock to add and manage local entries",
          trailing = {
            if (appState.isAdminUnlocked) {
              OutlinedButton(onClick = onLockAdmin) { Text("Lock") }
            } else {
              Button(onClick = onOpenAdmin) { Text("Unlock") }
            }
          },
        )
        if (appState.isAdminUnlocked) {
          InsightRow("Admin controls", "Add entries, review original donor names, manage receipts later")
          InsightRow("Current state", "Session stays local and resets to public on fresh launch")
        }
      }
    }
  }
}

@Composable
private fun TransactionCard(transaction: TrustTransaction, isAdmin: Boolean) {
  val isPublicIntake = transaction.kind == TransactionKind.Intake && !isAdmin
  val accent =
    if (transaction.kind == TransactionKind.Intake) {
      listOf(MaterialTheme.colorScheme.primaryContainer, MaterialTheme.colorScheme.secondaryContainer)
    } else {
      listOf(MaterialTheme.colorScheme.secondaryContainer, MaterialTheme.colorScheme.tertiaryContainer)
    }

  Card(
    shape = RoundedCornerShape(24.dp),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
  ) {
    Box(
      modifier =
        Modifier
          .fillMaxWidth()
          .background(Brush.linearGradient(accent))
          .padding(18.dp),
    ) {
      Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
          Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
              text = if (isPublicIntake) "Donation received" else transaction.title,
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.SemiBold,
              color = MaterialTheme.colorScheme.onSurface,
            )
            Text(
              text =
                if (isPublicIntake) "Collected by ${transaction.representative}"
                else transaction.note,
              style = MaterialTheme.typography.bodyMedium,
              color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
          }
          Column(horizontalAlignment = Alignment.End) {
            StatusPill(
              text = if (transaction.kind == TransactionKind.Intake) "Intake" else "Outlay",
              tint =
                if (transaction.kind == TransactionKind.Intake) MaterialTheme.colorScheme.primary
                else MaterialTheme.colorScheme.tertiary,
            )
            Spacer(Modifier.height(8.dp))
            Text(
              text = formatCurrency(transaction.amountPkr),
              style = MaterialTheme.typography.titleMedium,
              fontWeight = FontWeight.Bold,
            )
          }
        }
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
          Text(transaction.date, style = MaterialTheme.typography.bodySmall)
          Text(
            text =
              when {
                isPublicIntake -> "Receipt hidden"
                transaction.receiptName != null -> transaction.receiptName
                else -> "No receipt yet"
              },
            style = MaterialTheme.typography.bodySmall,
            textAlign = TextAlign.End,
          )
        }
      }
    }
  }
}

@Composable
private fun MetricCard(title: String, value: String, subtitle: String) {
  Card(
    modifier = Modifier.width(170.dp),
    shape = RoundedCornerShape(24.dp),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
  ) {
    Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
      Text(title, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
      Text(value, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.SemiBold)
      Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
  }
}

@Composable
private fun PremiumSectionCard(title: String, subtitle: String, content: @Composable () -> Unit) {
  Card(
    shape = RoundedCornerShape(28.dp),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
  ) {
    Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
      Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Text(title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
        Text(subtitle, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
      }
      content()
    }
  }
}

@Composable
private fun InsightRow(label: String, value: String) {
  Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
    Text(label, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
    Text(value, style = MaterialTheme.typography.bodyMedium, textAlign = TextAlign.End)
  }
}

@Composable
private fun SettingRow(title: String, subtitle: String, trailing: @Composable () -> Unit) {
  Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
    Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
      Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
      Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
    Spacer(Modifier.width(12.dp))
    trailing()
  }
}

@Composable
private fun StatusPill(text: String, tint: Color) {
  Box(
    modifier =
      Modifier
        .clip(RoundedCornerShape(999.dp))
        .background(tint.copy(alpha = 0.14f))
        .padding(horizontal = 12.dp, vertical = 6.dp),
  ) {
    Text(text, color = tint, style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold)
  }
}

@Composable
private fun AdminPinDialog(error: String?, onDismiss: () -> Unit, onUnlock: (String) -> Unit) {
  var pin by rememberSaveable { mutableStateOf("") }

  AlertDialog(
    onDismissRequest = onDismiss,
    confirmButton = { Button(onClick = { onUnlock(pin) }) { Text("Unlock") } },
    dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    title = { Text("Admin access") },
    text = {
      Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text("Enter the local admin PIN to switch into the private management view.")
        OutlinedTextField(
          value = pin,
          onValueChange = { pin = it },
          label = { Text("PIN") },
          singleLine = true,
          visualTransformation = PasswordVisualTransformation(),
        )
        if (error != null) {
          Text(error, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall)
        }
      }
    },
  )
}

@Composable
private fun AddTransactionDialog(onDismiss: () -> Unit, onSave: (TransactionDraft) -> Unit) {
  var title by rememberSaveable { mutableStateOf("") }
  var note by rememberSaveable { mutableStateOf("") }
  var amount by rememberSaveable { mutableStateOf("") }
  var category by rememberSaveable { mutableStateOf("") }
  var date by rememberSaveable { mutableStateOf("18 Jun 2026") }
  var representative by rememberSaveable { mutableStateOf("Field team") }
  var kind by rememberSaveable { mutableStateOf(TransactionKind.Outlay) }

  AlertDialog(
    onDismissRequest = onDismiss,
    confirmButton = {
      Button(
        onClick = {
          onSave(
            TransactionDraft(
              title = title,
              note = note,
              amountPkr = amount,
              category = category,
              date = date,
              representative = representative,
              kind = kind,
            )
          )
        }
      ) {
        Text("Save")
      }
    },
    dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    title = { Text("New local entry") },
    text = {
      Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
          FilterChip(selected = kind == TransactionKind.Intake, onClick = { kind = TransactionKind.Intake }, label = { Text("Intake") })
          FilterChip(selected = kind == TransactionKind.Outlay, onClick = { kind = TransactionKind.Outlay }, label = { Text("Outlay") })
        }
        OutlinedTextField(value = title, onValueChange = { title = it }, label = { Text("Title") }, singleLine = true)
        OutlinedTextField(value = note, onValueChange = { note = it }, label = { Text("Note") })
        OutlinedTextField(value = amount, onValueChange = { amount = it }, label = { Text("Amount PKR") }, singleLine = true)
        OutlinedTextField(value = category, onValueChange = { category = it }, label = { Text("Category") }, singleLine = true)
        OutlinedTextField(value = date, onValueChange = { date = it }, label = { Text("Date") }, singleLine = true)
        OutlinedTextField(
          value = representative,
          onValueChange = { representative = it },
          label = { Text("Representative") },
          singleLine = true,
        )
      }
    },
  )
}

private data class DashboardStats(
  val balanceLabel: String,
  val intakeLabel: String,
  val outlayLabel: String,
  val maxMonthlyOutlay: Float,
  val categorySummary: List<Pair<String, Long>>,
) {
  companion object {
    fun from(transactions: List<TrustTransaction>): DashboardStats {
      val intake = transactions.filter { it.kind == TransactionKind.Intake }.sumOf { it.amountPkr }
      val outlay = transactions.filter { it.kind == TransactionKind.Outlay }.sumOf { it.amountPkr }
      val monthlyMax =
        monthlyBreakdown(transactions).maxOfOrNull { it.outlay }?.toFloat()?.coerceAtLeast(1f) ?: 1f
      val categories =
        transactions
          .groupBy { it.category }
          .mapValues { (_, items) -> items.sumOf { it.amountPkr } }
          .toList()
          .sortedByDescending { it.second }
          .take(4)

      return DashboardStats(
        balanceLabel = formatCurrency(intake - outlay),
        intakeLabel = formatCurrency(intake),
        outlayLabel = formatCurrency(outlay),
        maxMonthlyOutlay = monthlyMax,
        categorySummary = categories,
      )
    }
  }
}

private data class MonthlySummary(val label: String, val outlay: Long)

private fun monthlyBreakdown(transactions: List<TrustTransaction>): List<MonthlySummary> =
  transactions
    .groupBy { it.date.takeLast(4) + " " + it.date.take(3) }
    .map { (label, items) ->
      MonthlySummary(
        label = label,
        outlay = items.filter { it.kind == TransactionKind.Outlay }.sumOf { it.amountPkr },
      )
    }
    .takeLast(4)

private fun formatCurrency(amount: Long): String =
  NumberFormat.getNumberInstance(Locale.US).format(amount).let { "PKR $it" }

@Preview(showBackground = true, widthDp = 390, heightDp = 844)
@Composable
private fun MainScreenPreview() {
  AlWahabTrustTheme {
    MainScreenContent(
      state = MainScreenUiState(appState = TrustAppState.sample(isAdminUnlocked = true)),
      onUnlockAdmin = {},
      onLockAdmin = {},
      onToggleLanguage = {},
      onAddTransaction = {},
    )
  }
}
