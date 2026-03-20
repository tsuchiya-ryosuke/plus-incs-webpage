import { FormEvent, useState } from "react";
import { colors, interaction, radius, spacing, typography } from "../../design/tokens";
import { Button } from "./Button";

interface InputBarProps {
  placeholder?: string;
  shareLabel?: string;
  highlightShare?: boolean;
  onSubmit?: (message: string) => void;
}

export function InputBar({ placeholder = "メッセージを入力...", shareLabel = "共有シートを作成", highlightShare = false, onSubmit }: InputBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    onSubmit?.(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: colors.white, borderTop: `1px solid ${colors.border}`, padding: spacing.sm }}>
      <div style={{ display: "flex", gap: spacing.xs }}>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: `${spacing.xs} ${spacing.md}`,
            minHeight: interaction.tapMinHeight,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.input,
            fontFamily: typography.fontFamily,
            fontSize: typography.size.md,
            lineHeight: interaction.textLineHeight,
            background: colors.bg,
          }}
        />
        <Button type="submit" variant="primary" aria-label="send">
          送信
        </Button>
      </div>
      <div
        style={{
          marginTop: spacing.xs,
          minHeight: interaction.tapMinHeight,
          padding: highlightShare ? `${spacing.xs} ${spacing.sm}` : `0 ${spacing.xxs}`,
          borderLeft: highlightShare ? `4px solid ${colors.brand}` : "4px solid transparent",
          background: highlightShare ? colors.brandPale : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.xs,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            border: `1.5px solid ${highlightShare ? colors.white : colors.brand}`,
            background: highlightShare ? colors.brand : "transparent",
            color: highlightShare ? colors.white : colors.brand,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ↗
        </span>
        <button
          type="button"
          style={{
            border: "none",
            background: "transparent",
            color: colors.brand,
            fontFamily: typography.fontFamily,
            fontSize: typography.size.sm,
            lineHeight: interaction.textLineHeight,
            fontWeight: interaction.textWeight,
            cursor: "pointer",
            minHeight: interaction.tapMinHeight,
            maxWidth: interaction.labelMaxWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: 0,
          }}
        >
          {shareLabel}
        </button>
      </div>
    </form>
  );
}
