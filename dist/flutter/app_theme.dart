// GENERATED — do not edit by hand
import 'dart:ui';
import 'package:flutter/material.dart';
import 'app_tokens.dart';

// ═══════════════════════════════════════════════════════
//  Theme extensions — spacing & radius
// ═══════════════════════════════════════════════════════

class AppSpacing extends ThemeExtension<AppSpacing> {
  final double small;
  final double medium;
  final double large;
  final double xlarge;

  const AppSpacing({
    this.small = 8,
    this.medium = 12,
    this.large = 16,
    this.xlarge = 20,
  });

  @override
  AppSpacing copyWith({
    double? small,
    double? medium,
    double? large,
    double? xlarge,
  }) {
    return AppSpacing(
      small: small ?? this.small,
      medium: medium ?? this.medium,
      large: large ?? this.large,
      xlarge: xlarge ?? this.xlarge,
    );
  }

  @override
  AppSpacing lerp(ThemeExtension<AppSpacing>? other, double t) {
    if (other is! AppSpacing) return this;
    return AppSpacing(
      small: lerpDouble(small, other.small, t)!,
      medium: lerpDouble(medium, other.medium, t)!,
      large: lerpDouble(large, other.large, t)!,
      xlarge: lerpDouble(xlarge, other.xlarge, t)!,
    );
  }
}

class AppRadius extends ThemeExtension<AppRadius> {
  final double xlarge2;
  final double action;

  const AppRadius({
    this.xlarge2 = 16,
    this.action = 200,
  });

  @override
  AppRadius copyWith({
    double? xlarge2,
    double? action,
  }) {
    return AppRadius(
      xlarge2: xlarge2 ?? this.xlarge2,
      action: action ?? this.action,
    );
  }

  @override
  AppRadius lerp(ThemeExtension<AppRadius>? other, double t) {
    if (other is! AppRadius) return this;
    return AppRadius(
      xlarge2: lerpDouble(xlarge2, other.xlarge2, t)!,
      action: lerpDouble(action, other.action, t)!,
    );
  }
}

// ═══════════════════════════════════════════════════════
//  AppTheme — builds light & dark ThemeData
// ═══════════════════════════════════════════════════════

class AppTheme {
  AppTheme._();

  // ── Shared spacing & radius extensions ────────────────

  static const _spacing = AppSpacing(
    small: AppTokens.spacingSmall,
    medium: AppTokens.spacingMedium,
    large: AppTokens.spacingLarge,
    xlarge: AppTokens.spacingXlarge,
  );

  static const _radius = AppRadius(
    xlarge2: AppTokens.borderRadius2xlarge,
    action: AppTokens.borderRadiusAction,
  );

  // ── Shared text theme ─────────────────────────────────

  static const _textTheme = TextTheme(
    displayLarge: AppTokens.typographyH1700,
    displayMedium: AppTokens.typographyH2700,
    displaySmall: AppTokens.typographyH3700,
    headlineLarge: AppTokens.typographyH4700,
    headlineMedium: AppTokens.typographyH5700,
    titleLarge: AppTokens.typographyParagraph700,
    titleMedium: AppTokens.typographyParagraph600,
    bodyLarge: AppTokens.typographyParagraph500,
    bodyMedium: AppTokens.typographyParagraph400,
    bodySmall: AppTokens.typographySecondary400,
    labelLarge: AppTokens.typographySecondary600,
    labelMedium: AppTokens.typographyCaption600,
    labelSmall: AppTokens.typographyTag600,
  );

  // ── Light theme ───────────────────────────────────────

  static ThemeData light() {
    return ThemeData(
      brightness: Brightness.light,
      colorScheme: ColorScheme.light(
        primary: AppTokens.colorBrandPrimary,
        onPrimary: AppTokens.colorTextContained,
        secondary: AppTokens.colorInteractionSecondary,
        surface: AppTokens.colorBaseFlat,
        onSurface: AppTokens.colorTextPrimary,
        error: AppTokens.colorMessagingError,
        onError: AppTokens.colorTextContained,
      ),
      textTheme: _textTheme,
      extensions: const [_spacing, _radius],
    );
  }

  // ── Dark theme ────────────────────────────────────────

  static ThemeData dark() {
    return ThemeData(
      brightness: Brightness.dark,
      colorScheme: ColorScheme.dark(
        primary: AppTokens.colorBrandPrimary,
        onPrimary: AppTokens.colorTextContained,
        secondary: AppTokens.colorInteractionSecondary,
        surface: AppTokens.colorBaseFlatDark,
        onSurface: AppTokens.colorTextPrimaryDark,
        error: AppTokens.colorMessagingErrorDark,
        onError: AppTokens.colorTextContained,
      ),
      textTheme: _textTheme,
      extensions: const [_spacing, _radius],
    );
  }
}
