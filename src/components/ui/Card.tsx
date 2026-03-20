import { CSSProperties, HTMLAttributes } from "react";
import { colors, radius, shadow, spacing } from "../../design/tokens";

type CardElevation = "flat" | "floating";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: CardElevation;
}

const baseStyle: CSSProperties = {
  background: colors.white,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.card,
  padding: spacing.md,
};

export function Card({ elevation = "flat", style, ...props }: CardProps) {
  return <div {...props} style={{ ...baseStyle, boxShadow: elevation === "floating" ? shadow.floatingOnly : shadow.none, ...style }} />;
}
