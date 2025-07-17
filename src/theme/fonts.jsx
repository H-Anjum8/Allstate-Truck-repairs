
export const FONTS = {
    // Black variants
    BLACK: 'RadikalTrial-Black',
    BLACK_ITALIC: 'RadikalTrial-BlackItalic',
  
    // Bold variants
    BOLD: 'RadikalTrial-Bold',
    BOLD_ITALIC: 'RadikalTrial-BoldItalic',
  
    // Light variants
    LIGHT: 'RadikalTrial-Light',
    LIGHT_ITALIC: 'RadikalTrial-LightItalic',
  
    // Medium variants
    MEDIUM: 'RadikalTrial-Medium',
    MEDIUM_ITALIC: 'RadikalTrial-MediumItalic',
  
    // Regular variants
    REGULAR: 'RadikalTrial-Regular',
    REGULAR_ITALIC: 'RadikalTrial-RegularItalic',
  
    // Thin variants
    THIN: 'RadikalTrial-Thin',
    THIN_ITALIC: 'RadikalTrial-ThinItalic',
  
    // Ultra thin variants
    ULTRA_THIN: 'RadikalTrial-UltraThin',
    ULTRA_THIN_ITALIC: 'RadikalTrial-UltraThinItalic',
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