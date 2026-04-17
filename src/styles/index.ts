import { THEME } from '../constants/theme';

export const styles = {
  // Common component styles
  common: {
    nav: `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: ${THEME.spacing.md} ${THEME.spacing.xl};
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      background: rgba(22, 22, 22, 0.92);
      backdrop-filter: blur(14px);
    `,
    section: `
      border-bottom: 1px solid var(--border);
    `,
    sectionLabel: `
      font-family: ${THEME.fonts.mono};
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--yellow);
      margin-bottom: 2.5rem;
      display: flex;
      align-items: center;
      gap: 14px;

      &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--border);
        max-width: 80px;
      }
    `,
  },

  // Button styles
  buttons: {
    primary: `
      padding: 14px 30px;
      background: var(--yellow);
      color: #111;
      font-family: ${THEME.fonts.mono};
      font-size: 10px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      border: none;
      cursor: none;
      font-weight: 700;
      transition: transform 0.15s, background 0.15s;
      text-decoration: none;
      display: inline-block;

      &:hover {
        background: #fff;
        transform: translate(-3px, -3px);
      }
    `,
    secondary: `
      padding: 14px 30px;
      background: transparent;
      color: var(--text);
      font-family: ${THEME.fonts.mono};
      font-size: 10px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      border: 1px solid var(--border);
      cursor: none;
      transition: border-color 0.2s, color 0.2s;
      text-decoration: none;
      display: inline-block;

      &:hover {
        border-color: var(--yellow);
        color: var(--yellow);
      }
    `,
  },

  // Cursor styles
  cursor: `
    position: fixed;
    width: 12px;
    height: 12px;
    background: var(--yellow);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.12s ease, background 0.12s ease;

    &.big {
      transform: translate(-50%, -50%) scale(3.5);
      background: rgba(210, 161, 58, 0.2);
      border: 1px solid var(--yellow);
    }
  `,
};
