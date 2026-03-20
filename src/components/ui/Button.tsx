import { CSSProperties, ButtonHTMLAttributes } from "react";
import { colors, radius, spacing, typography } from "../../design/tokens";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const baseStyle: CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: typography.size.md,
  fontWeight: typography.weight.semibold,
  borderRadius: radius.button,
  padding: `${spacing.xs} ${spacing.lg}`,
  cursor: "pointer",
  border: "none",
};

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: colors.brand,
    color: colors.white,
  },
  secondary: {
    background: colors.white,
    color: colors.textSub,
    border: `1px solid ${colors.border}`,
  },
  ghost: {
    background: "transparent",
    color: colors.textSub,
  },
};

export function Button({ variant = "primary", fullWidth = false, style, ...props }: ButtonProps) {
  return <button {...props} style={{ ...baseStyle, ...variantStyles[variant], width: fullWidth ? "100%" : undefined, ...style }} />;
}
