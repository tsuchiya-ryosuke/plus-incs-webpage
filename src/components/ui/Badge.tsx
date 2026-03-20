import { CSSProperties, HTMLAttributes } from "react";
import { colors, radius, spacing, typography } from "../../design/tokens";

type BadgeVariant = "success" | "warning" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const baseStyle: CSSProperties = {
  borderRadius: radius.badge,
  fontFamily: typography.fontFamily,
  fontSize: typography.size.sm,
  fontWeight: typography.weight.semibold,
  padding: `${spacing.xxs} ${spacing.sm}`,
  display: "inline-block",
};

const variantStyles: Record<BadgeVariant, CSSProperties> = {
  success: { background: colors.greenPale, color: colors.green },
  warning: { background: colors.amberPale, color: colors.amber },
  neutral: { background: colors.borderFaint, color: colors.textSub },
};

export function Badge({ variant = "neutral", style, ...props }: BadgeProps) {
  return <span {...props} style={{ ...baseStyle, ...variantStyles[variant], ...style }} />;
}
