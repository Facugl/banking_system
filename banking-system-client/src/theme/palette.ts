import type { PaletteOptions } from '@mui/material/styles';

/**
 * Single dark cobalt theme for the whole app (no light mode), inspired by
 * modern fintech mobile-app UI: near-black surfaces, one saturated accent
 * color, and soft glow shadows instead of flat elevation.
 *
 * Text on every colored surface (primary/secondary/error/success/warning/info)
 * uses this dark ink, not white: white text on these brightened accent tones
 * fails WCAG AA (e.g. white-on-primary measures ~3.15:1), while dark-ink-on-
 * accent measures 6.25:1+ across the board (verified for every color below).
 *
 * `secondary` is intentionally identical to `primary` - this is a
 * single-accent-color design (matching the reference), not an oversight.
 */
const ink = '#070B14';

const accent = {
  main: '#6C8EE8',
  light: '#93AEF0',
  dark: '#4A6BC4',
  contrastText: ink,
};

export const palette: PaletteOptions = {
  mode: 'dark',
  primary: accent,
  secondary: accent,
  error: {
    main: '#F56565',
    light: '#FEB2B2',
    dark: '#E53E3E',
    contrastText: ink,
  },
  success: {
    main: '#68D391',
    light: '#9AE6B4',
    dark: '#48BB78',
    contrastText: ink,
  },
  warning: {
    main: '#F6AD55',
    light: '#FBD38D',
    dark: '#ED8936',
    contrastText: ink,
  },
  info: {
    main: '#63B3ED',
    light: '#90CDF4',
    dark: '#4299E1',
    contrastText: ink,
  },
  background: {
    default: '#070B14',
    paper: '#0F1729',
    sidebar: '#0A121F',
  },
  text: {
    primary: '#F5F7FA',
    secondary: '#9AA5C0',
    disabled: '#5A6478',
  },
  divider: 'rgba(255, 255, 255, 0.08)',
};
