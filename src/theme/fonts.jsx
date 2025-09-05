export const FONTS = {
  // Black variants
  BLACK: 'Inter_18pt-Black',

  // Bold variants
  BOLD: 'Inter_18pt-Bold',

  // Extra Bold variants
  EXTRA_BOLD: 'Inter_18pt-ExtraBold',

  // Extra Light variants
  EXTRA_LIGHT: 'Inter_18pt-ExtraLight',

  // Light variants
  LIGHT: 'Inter_18pt-Light',

  // Medium variants
  MEDIUM: 'Inter_18pt-Medium',

  // Regular variants
  REGULAR: 'Inter_18pt-Regular',

  // Semi Bold variants
  SEMI_BOLD: 'Inter_18pt-SemiBold',

  // Thin variants
  THIN: 'Inter_18pt-Thin',
};

// Font style generator function
export const createFontStyle = (fontFamily, fontSize = 14) => ({
  fontFamily,
  fontSize,
});

// Common text styles
export const TextStyles = {
  heading1: createFontStyle(FONTS.MEDIUM, 28),
  heading2: createFontStyle(FONTS.MEDIUM, 20),
  heading3: createFontStyle(FONTS.MEDIUM, 18),
  body: createFontStyle(FONTS.REGULAR, 16),
  bodySmall: createFontStyle(FONTS.REGULAR, 14),
  caption: createFontStyle(FONTS.LIGHT, 12),
  button: createFontStyle(FONTS.MEDIUM, 16),
};

export default {
  // FONTS,
  TextStyles,
  createFontStyle,
};
