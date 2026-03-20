export const colors = {
  brand: "#3ea8ff",
  brandPale: "#edf6ff",
  text: "#333333",
  textSub: "#6e7b85",
  textMeta: "#a0aab4",
  border: "#e4edf4",
  borderFaint: "#f0f4f8",
  bg: "#f5f8fa",
  white: "#ffffff",
  green: "#1cb955",
  greenPale: "#edfaf3",
  amber: "#e09200",
  amberPale: "#fef8ec",
  red: "#f44336",
  redPale: "#fef0ef",
} as const;

export const radius = {
  button: "8px",
  tag: "99rem",
  card: "12px",
  badge: "3px",
  input: "20px",
} as const;

export const spacing = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "24px",
} as const;

export const typography = {
  fontFamily: "'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif",
  size: {
    xs: 11,
    sm: 12,
    md: 13,
    lg: 14,
    xl: 15,
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const shadow = {
  none: "none",
  floatingOnly: "0 6px 18px rgba(0,0,0,0.12)",
} as const;
