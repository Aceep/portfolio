import { THEME } from '../constants/theme';

/**
 * Global styles as a template literal
 * Can be injected or used with styled-components
 */
export const globalStyles = `
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --yellow: ${THEME.colors.yellow};
    --yellow-dark: ${THEME.colors.yellowDark};
    --bg: ${THEME.colors.bg};
    --surface: ${THEME.colors.surface};
    --surface2: ${THEME.colors.surface2};
    --text: ${THEME.colors.text};
    --muted: ${THEME.colors.muted};
    --border: ${THEME.colors.border};
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: ${THEME.fonts.primary};
    overflow-x: hidden;
    cursor: none;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @media (max-width: ${THEME.breakpoints.mobile}) {
    body {
      font-size: 14px;
    }
  }
`;
