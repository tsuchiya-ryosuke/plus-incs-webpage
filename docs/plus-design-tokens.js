export const C = {
  brand: "#3ea8ff",
  brandPale: "#edf6ff",
  text: "#333333",
  textSub: "#6e7b85",
  textMeta: "#5f6b76",
  border: "#e4edf4",
  borderFaint: "#f0f4f8",
  bg: "#f5f8fa",
  white: "#ffffff",
  semantic: {
    success: { text: "#1b7f46", bg: "#edfaf3", border: "#bde9cf" },
    info: { text: "#1f6fb2", bg: "#edf6ff", border: "#bfdcf7" },
    warning: { text: "#9a6500", bg: "#fef8ec", border: "#f5dcad" },
    error: { text: "#c33a31", bg: "#fef0ef", border: "#f8cbc6" },
  },
};

export const R = { btn: "8px", card: "12px", badge: "3px", tag: "99rem" };
export const E = { "shadow-0": "none", "shadow-1": "0 4px 16px rgba(0,0,0,.1)" };
export const S = { 4: 4, 8: 8, 12: 12, 16: 16, 24: 24, 32: 32 };
export const T = {
  caption: { fontSize: 12, lineHeight: 1.6, fontWeight: 500 },
  body: { fontSize: 13, lineHeight: 1.7, fontWeight: 400 },
  title: { fontSize: 15, lineHeight: 1.5, fontWeight: 700 },
};

export const STATUS_TONE = {
  submitted: { label: "提出済み", tone: "success" },
  unsubmitted: { label: "未提出", tone: "warning" },
  new: { label: "新着", tone: "info" },
};

export function badgeStyle(state) {
  const meta = STATUS_TONE[state];
  const tone = C.semantic[meta?.tone ?? "info"];
  return {
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 9px",
    borderRadius: R.badge,
    color: tone.text,
    background: tone.bg,
    border: `1px solid ${tone.border}`,
  };
}
