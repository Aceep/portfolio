/**
 * Theme constants for color scheme and design tokens
 */
export const THEME = {
  colors: {
    yellow: '#E0B14D',
    yellowDark: '#A77A22',
    bg: '#171715',
    surface: '#20201E',
    surface2: '#2A2A27',
    text: '#F8F4EA',
    muted: '#B8B4AA',
    border: '#4C4B46',
    success: '#4AE54A',
  },
  fonts: {
    primary: "'Syne', sans-serif",
    mono: "'Space Mono', monospace",
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '5rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
} as const;
