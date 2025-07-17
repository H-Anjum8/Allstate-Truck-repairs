export const FONTS = {
  // Italic variants
  BLACKITALIC: 'SFPRODISPLAYBLACKITALIC',

  // Bold variants
  BOLD: 'SFPRODISPLAYBOLD',
  // Heavy Italic variants
  HEAVYITALIC: 'SFPRODISPLAYHEAVYITALIC',

  // Light variants
  LIGHT_ITALIC: 'RadikalTrial-SFPRODISPLAYLIGHTITALIC',

  // Medium variants
  MEDIUM: 'SFPRODISPLAYMEDIUM',

  // Regular variants
  REGULAR: 'SFPRODISPLAYREGULAR',

  // Semi Italic variants
  SEMI_ITALIC: 'SFPRODISPLAYSEMIBOLDITALIC',

  // Thin variants
  THIN_ITALIC: 'SFPRODISPLAYTHINITALIC',

  // Ultra thin variants
  ULTRA_THIN_ITALIC: 'SFPRODISPLAYULTRALIGHTITALIC',
};

// Font style generator function
export const createFontStyle = (fontFamily, fontSize = 14) => ({
  fontFamily,
  fontSize,
});

// Common text styles
export const TextStyles = {
  heading1: createFontStyle(FONTS.BOLD, 24),
  heading2: createFontStyle(FONTS.BOLD, 20),
  heading3: createFontStyle(FONTS.MEDIUM, 18),
  body: createFontStyle(FONTS.REGULAR, 16),
  bodySmall: createFontStyle(FONTS.REGULAR, 14),
  caption: createFontStyle(FONTS.LIGHT, 12),
  button: createFontStyle(FONTS.MEDIUM, 16),
};

export default {
  FONTS,
  TextStyles,
  createFontStyle,
};
