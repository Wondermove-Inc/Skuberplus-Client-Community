/**
 * Copyright (c) Wondermove Inc.. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import type { LensTheme } from "./lens-theme";

/**
 * 🎯 PHASE 4: Stub Themes - Minimal metadata for Preference UI
 *
 * Purpose: Provide theme metadata for preference selection UI
 *
 * Background:
 * - Theme colors have been migrated to global.css
 * - Actual theming is done via HTML classes (theme-default-dark/light)
 * - active.injectable.ts returns ThemeType only
 * - LensTheme interface simplified (no color definitions)
 *
 * Current Usage:
 * - Preference UI may need theme names for display
 * - Terminal theme UI may need theme list
 *
 * Migration Complete:
 * - ✅ PHASE 1: Removed all theme injectable files
 * - ✅ PHASE 2: active.injectable.ts returns ThemeType only
 * - ✅ PHASE 3: All components migrated to CSS variables
 * - ✅ PHASE 4: Type definitions simplified (current)
 *
 * Future: Consider removing this file entirely and using ThemeType directly
 *
 * @see src/features/preferences/renderer/preference-items/application/theme/theme.tsx
 * @see src/features/preferences/renderer/preference-items/terminal/terminal-theme/terminal-theme.tsx
 */

/**
 * Dark theme stub (metadata only)
 */
export const darkThemeStub: LensTheme = {
  name: "KLens Default Dark",
  type: "dark",
  description: "CSS-based dark theme",
  author: "KLens",
  isDefault: true,
  colors: {}, // Empty - all colors in global.css
  monacoTheme: "vs-dark",
};

/**
 * Light theme stub (metadata only)
 */
export const lightThemeStub: LensTheme = {
  name: "KLens Default Light",
  type: "light",
  description: "CSS-based light theme",
  author: "KLens",
  isDefault: false,
  colors: {}, // Empty - all colors in global.css
  monacoTheme: "vs",
};

/**
 * All available themes (for preference UI)
 */
export const availableThemes: LensTheme[] = [darkThemeStub, lightThemeStub];
