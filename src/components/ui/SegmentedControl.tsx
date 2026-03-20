import { CSSProperties } from "react";
import { colors, radius, spacing, typography } from "../../design/tokens";

export interface SegmentItem {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  items: SegmentItem[];
  selected: string;
  onChange: (id: string) => void;
}

const wrapperStyle: CSSProperties = {
  display: "inline-flex",
  border: `1px solid ${colors.border}`,
  borderRadius: radius.button,
  overflow: "hidden",
  background: colors.white,
};

export function SegmentedControl({ items, selected, onChange }: SegmentedControlProps) {
  return (
    <div style={wrapperStyle} role="tablist" aria-label="segmented-control">
      {items.map((item) => {
        const active = item.id === selected;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            style={{
              padding: `${spacing.xs} ${spacing.md}`,
              fontFamily: typography.fontFamily,
              fontSize: typography.size.md,
              fontWeight: active ? typography.weight.semibold : typography.weight.medium,
              border: "none",
              background: active ? colors.brandPale : colors.white,
              color: active ? colors.brand : colors.textSub,
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
