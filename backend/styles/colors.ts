// Primary Colors - Main interactive elements
export const primary = {
  50: '#f0f9ff',   // Lightest - Hover backgrounds
  100: '#e0f2fe',  // Light - Disabled states
  200: '#bae6fd',  // Input borders
  300: '#7dd3fc',  // Hover states
  400: '#38bdf8',  // Default state
  500: '#0ea5e9',  // Main buttons/links
  600: '#0284c7',  // Hover on main
  700: '#0369a1',  // Active/Pressed
  800: '#075985',  // Dark variant
  900: '#0c4a6e',  // Darkest variant
} as const

// Secondary Colors - Complementary actions
export const secondary = {
  50: '#f8fafc',   // Lightest
  100: '#f1f5f9',  // Light backgrounds
  200: '#e2e8f0',  // Borders
  300: '#cbd5e1',  // Disabled text
  400: '#94a3b8',  // Placeholder text
  500: '#64748b',  // Muted text
  600: '#475569',  // Body text
  700: '#334155',  // Headings
  800: '#1e293b',  // Dark backgrounds
  900: '#0f172a',  // Darkest backgrounds
} as const

// Accent Colors - Highlights and states
export const accent = {
  info: {
    light: '#60a5fa',   // #60a5fa - Light blue
    main: '#2563eb',    // #2563eb - Blue
    dark: '#1d4ed8',    // #1d4ed8 - Dark blue
  },
  success: {
    light: '#4ade80',   // #4ade80 - Light green
    main: '#16a34a',    // #16a34a - Green
    dark: '#15803d',    // #15803d - Dark green
  },
  warning: {
    light: '#fbbf24',   // #fbbf24 - Light yellow
    main: '#d97706',    // #d97706 - Orange
    dark: '#b45309',    // #b45309 - Dark orange
  },
  error: {
    light: '#f87171',   // #f87171 - Light red
    main: '#dc2626',    // #dc2626 - Red
    dark: '#b91c1c',    // #b91c1c - Dark red
  }
} as const

// Text Colors - Typography hierarchy
export const text = {
  primary: '#1e293b',    // Main text color
  secondary: '#475569',  // Secondary text
  muted: '#64748b',      // Muted text
  disabled: '#94a3b8',   // Disabled state
  inverse: '#f8fafc',    // Text on dark backgrounds
} as const

// Background Colors - Layout structure
export const background = {
  paper: '#ffffff',      // Cards, modals, popups
  default: '#f8fafc',    // Main background
  dark: '#0f172a',       // Dark sections
  darker: '#020617',     // Darkest sections
  overlay: 'rgba(15, 23, 42, 0.3)', // Modal overlays
} as const

// Border Colors - Separators and boundaries
export const border = {
  light: '#e2e8f0',     // Light borders
  main: '#cbd5e1',      // Main borders
  dark: '#94a3b8',      // Dark borders
} as const

// Status Colors - System states
export const status = {
  online: '#16a34a',    // Online/Active
  offline: '#dc2626',   // Offline/Inactive
  away: '#d97706',      // Away/Pending
  busy: '#7c3aed',      // Busy/Do not disturb
} as const

// Semantic Colors - Contextual meaning
export const semantic = {
  new: '#2563eb',       // New items
  updated: '#7c3aed',   // Updated items
  archived: '#64748b',  // Archived items
  deleted: '#dc2626',   // Deleted items
  draft: '#d97706',     // Draft items
} as const

// Shadow Colors - Elevation and depth
export const shadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const
