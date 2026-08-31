export const colors = {
  background: {
    primary: '#0E0F16',
    surface: '#1A1C29',
    elevated: '#242739',
  },
  accent: {
    primary: '#7C5CFF',
    secondary: '#00E5A0',
    warning: '#FFB020',
    danger: '#FF5C6C',
  },
  text: {
    primary: '#F5F6FA',
    secondary: '#9A9DB3',
  },
  border: {
    subtle: '#2E3145',
  },
} as const;

export const typography = {
  fontFamily: {
    heading: 'Sora',
    body: 'Inter',
  },
  fontSize: {
    xl: 28,
    lg: 20,
    md: 16,
    sm: 13,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
} as const;
