package com.example.alwahabtrust.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme =
  lightColorScheme(
    primary = EmeraldDeep,
    onPrimary = SandSurface,
    primaryContainer = MintMist,
    onPrimaryContainer = Ink,
    secondary = EmeraldSoft,
    onSecondary = SandSurface,
    secondaryContainer = Color(0xFFE9F4EF),
    onSecondaryContainer = Ink,
    tertiary = BronzeWarm,
    onTertiary = SandSurface,
    tertiaryContainer = Color(0xFFF4E6D8),
    onTertiaryContainer = Ink,
    background = Color(0xFFF4F0E8),
    onBackground = Ink,
    surface = Color(0xFFFFFBF5),
    onSurface = Ink,
    surfaceVariant = Color(0xFFE6E0D6),
    onSurfaceVariant = Stone,
    error = CoralAccent,
  )

private val DarkColorScheme =
  darkColorScheme(
    primary = MintMist,
    onPrimary = NightEmerald,
    primaryContainer = EmeraldDeep,
    onPrimaryContainer = MintMist,
    secondary = Color(0xFF9DD3C0),
    onSecondary = NightEmerald,
    secondaryContainer = EmeraldSoft,
    onSecondaryContainer = MintMist,
    tertiary = Color(0xFFE8C49C),
    onTertiary = NightEmerald,
    tertiaryContainer = BronzeWarm,
    onTertiaryContainer = SandSurface,
    background = NightEmerald,
    onBackground = SandSurface,
    surface = NightSurface,
    onSurface = SandSurface,
    surfaceVariant = Color(0xFF244139),
    onSurfaceVariant = Color(0xFFBCD2C7),
    error = Color(0xFFFFB4A2),
  )

@Composable
fun AlWahabTrustTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  content: @Composable () -> Unit,
) {
  MaterialTheme(
    colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme,
    typography = Typography,
    content = content,
  )
}
