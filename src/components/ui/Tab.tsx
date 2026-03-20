import { CSSProperties, ButtonHTMLAttributes } from "react";
import { colors, radius, spacing, typography } from "../../design/tokens";

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const baseStyle: CSSProperties = {
  fontFamily: typography.fontFamily,
  fontSize: typography.size.md,
  padding: `${spacing.sm} ${spacing.lg}`,
  borderRadius: `${radius.button} ${radius.button} 0 0`,
  border: "1px solid transparent",
  cursor: "pointer",
  background: "transparent",
};

export function Tab({ active = false, style, ...props }: TabProps) {
  return (
    <button
      {...props}
      style={{
        ...baseStyle,
        fontWeight: active ? typography.weight.bold : typography.weight.regular,
        color: active ? colors.brand : colors.textSub,
        background: active ? colors.bg : "transparent",
        borderColor: active ? colors.border : "transparent",
        ...style,
      }}
    />
  );
}
