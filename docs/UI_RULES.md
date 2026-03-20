# PLUS UI Rules (Do / Don't)

## 角丸ルール
- **Do:** Button は `8px` を使う（`radius.button`）。
- **Do:** Tag は `99rem` の full-rounded を使う（`radius.tag`）。
- **Do:** Badge は `3px` を使う（`radius.badge`）。
- **Don't:** Button に full-rounded を使わない。
- **Don't:** Badge に大きな角丸を使わない。

## シャドウルール
- **Do:** Card は原則 `border + 背景コントラスト` で分離し、`elevation="flat"` を使う。
- **Do:** 本当に浮かせる必要があるときだけ `elevation="floating"` を使う。
- **Don't:** 常時シャドウを使わない。

## 色のルール
- **Do:** ブランドカラーは CTA / Link / 選択状態に限定する。
- **Don't:** 大面積の背景装飾にブランドカラーを使いすぎない。

## 実装ルール
- 画面コンポーネントでは、UIの見た目を直接 `style` で記述せず、`variant` / `elevation` などの props で表現する。
- 共通UIは `src/components/ui` に集約し、画面側での重複スタイル定義を避ける。
