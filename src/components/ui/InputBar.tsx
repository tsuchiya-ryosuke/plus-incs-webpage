import { FormEvent, useState } from "react";
import { colors, radius, spacing, typography } from "../../design/tokens";
import { Button } from "./Button";

interface InputBarProps {
  placeholder?: string;
  shareLabel?: string;
  onSubmit?: (message: string) => void;
}

export function InputBar({ placeholder = "メッセージを入力...", shareLabel = "共有シートを作成", onSubmit }: InputBarProps) {
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
            border: `1px solid ${colors.border}`,
            borderRadius: radius.input,
            fontFamily: typography.fontFamily,
            fontSize: typography.size.md,
            background: colors.bg,
          }}
        />
        <Button type="submit" variant="primary" aria-label="send">
          送信
        </Button>
      </div>
      <button
        type="button"
        style={{
          marginTop: spacing.xs,
          border: "none",
          background: "transparent",
          color: colors.brand,
          fontFamily: typography.fontFamily,
          fontSize: typography.size.sm,
          cursor: "pointer",
          padding: 0,
        }}
      >
        {shareLabel}
      </button>
    </form>
  );
}
