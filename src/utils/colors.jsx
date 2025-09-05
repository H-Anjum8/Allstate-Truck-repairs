// Base colors
const BASE_COLORS = {
  // Brand Primary Colors
  PRIMARY: '#000654',
  PRIMARY_DARK: '',
  PRIMARY_LIGHT: '#00043D',
  SECONDARY: '#EC1C24',
  SECONDARY_DARK: '',
  SECONDARY_LIGHT: ' #EC1C2433',
  PRIMARY_SEMI: '#0006541A',
  CHAT: '#E9E9EB',
  BADGE_BG: '#F2F2F2',
  ORANGE: '#E86B1C',
  ORANGE_LIGHT: '#ED851E1A',
  YELLOW: '#FBC02D',

  // Neutrals
  BLUE_BG: '#EAEAFD',
  LIGHT_GREEN: '#D4EAD6',
  LIGHT_BLACK: '#0000001A',
  BLACKISH: '#00000080',
  WHITE: '#FFFFFF',
  LIGHT_RED: '#f8b7b9',
  BLACK: '#000000',
  DARK_GRAY: '#333333',
  BLUE: '#7A3FF2',
  SKY: '#D4E7FF',
  GRAY: '#777777',
  LIGHT_GRAY: '#CCCCCC',
  GRAYIESH: '#e5e6ee',
  EXTRA_LIGHT_GRAY: 'rgba(255, 255, 255, 0.10)',
  BORDER_COLOR: '#EEEEEE',
  TABLE_BACKGROUND: '#FAFAFA',
  LIGHT_BLUE: '#e5e8f9',
  GREEN: '#359814',
  STAR: '#D9D9D9',
  PINK: '#fef4f4',
  RED_BG: '#FFECEC',
  PRIMARY_BG: '#0006541A',
  // Common UI colors
  TEXT_LIGHTGRAY: '#ADAAAA',
  TEXT_PRIMARY: '#000654',
  TEXT_SECONDARY: '#2F2F2F',
  TEXT_TERNARY: '#333333',
  TEXT_LIGHT: '#6C6C6C',
  TEXT_INPUT_FIELD: '#858585',
  TEXT_GRAY: '#B8B8B8',
  TEXT_WHITE: '#FFFFFF',
  TEXT_BLACK: '#000000',
  TEXT_RED: '#EC1C24',
  TEXT_GREEN: '#359814',
  DISABLED: '#CCCCCC',
  TRANSPARENT: 'transparent',
  TEXT_INVERSE: '#FFFFFF',

  // Status colors
  SUCCESS_DARK: '#388E3C',
  SUCCESS_LIGHT: '#C8E6C9',
  WARNING_DARK: '#F57C00',
  WARNING_LIGHT: '#FFE0B2',
  ERROR_DARK: '#D32F2F',
  ERROR_LIGHT: '#FFCDD2',
  INFO_DARK: '#1976D2',
  INFO_LIGHT: '#BBDEFB',
  // Status Colors
  STATUS: {
    SUCCESS: '#4CAF50',
    SUCCESS_BACKGROUND: 'rgba(76, 175, 80, 0.1)',
    WARNING: '#FF9800',
    WARNING_BACKGROUND: 'rgba(255, 152, 0, 0.1)',
    ERROR: '#F44336',
    ERROR_BACKGROUND: 'rgba(244, 67, 54, 0.1)',
    INFO: '#2196F3',
    INFO_BACKGROUND: 'rgba(33, 150, 243, 0.1)',
    PRIMARY: '#000654', // Purple/pink status
    PRIMARY_BACKGROUND: 'rgba(215, 61, 209, 0.1)',
    SECONDARY: '#EC1C24', // Light purple status
    SECONDARY_BACKGROUND: '#EC1C2433',
  },
};

// Color utility functions
export const hexToRgba = (hex, alpha = 1) => {
  // Remove # if present
  hex = hex.replace('#', '');

  // Handle 3-character hex codes
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('');
  }

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getColorWithOpacity = (color, opacity = 1) => {
  if (typeof color !== 'string') return color;

  // If it's already rgba, return as is
  if (color.startsWith('rgba')) return color;

  // If it's hex, convert to rgba
  if (color.startsWith('#')) {
    return hexToRgba(color, opacity);
  }

  // If it's a color key, try to get from BASE_COLORS
  const colorValue = BASE_COLORS[color] || color;
  return colorValue.startsWith('#')
    ? hexToRgba(colorValue, opacity)
    : colorValue;
};

// export default BASE_COLORS;
export default BASE_COLORS;
