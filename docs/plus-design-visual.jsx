import { useState } from "react";
import { C, R, S, T, E, badgeStyle, STATUS_TONE } from "./plus-design-tokens";

/*
 * 体験ゴール定義（3軸）
 * - 信頼: 情報階層・ラベル・状態表示を一貫させ、判断に必要な情報を迷わず読めること。
 *   UIで見せる: 見出し/本文/補足/状態バッジの優先度を固定し、同じ意味には同じ見た目を使う。
 * - 前向きさ: 操作後に「できた」と感じられる、過度に騒がしくないポジティブ体験をつくること。
 *   UIで見せる: 成功状態を肯定的な文言と穏やかな色（成功アイコン+補助説明）で即時に示す。
 * - 進捗実感: いま何が完了し、何が未完了かを短時間で把握できること。
 *   UIで見せる: 提出済/未提出などのステータスを一覧で比較しやすい位置とコントラストで表示する。
 *
 * 既存コンポーネント改修優先度
 * - P0: Nav（信頼の起点。情報階層と現在地表示を全画面で統一）
 * - P0: DD（信頼の運用ルール。Do/Don'tの判断基準を3軸で再定義）
 * - P1: Header（前向きさと信頼の両立。トーンと言語の一貫化）
 * - P1: InputC（前向きさと進捗実感。入力→提出導線の手応えを強化）
 * - P2: VerificationChecklist（進捗実感の補助。運用確認項目を3軸に対応）
 */

const ff = "'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif";

function bs(v) {
  const b = {
    fontFamily: ff,
    ...T.body,
    fontWeight: 600,
    border: "none",
    borderRadius: R.btn,
    padding: `${S[8]}px 20px`,
    cursor: "pointer",
  };
  return v === "primary"
    ? { ...b, background: C.brand, color: C.white }
    : { ...b, background: "transparent", color: C.textSub, border: `1px solid ${C.border}` };
}

export default function App() {
  const [tab, setTab] = useState("principles");
  const tabs = [{ id: "principles", label: "原則" }, { id: "screen", label: "実画面" }, { id: "dodont", label: "Do / Don't" }];

  return (
    <div style={{ fontFamily: ff, background: C.bg, minHeight: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .page-shell {
          width: min(100%, 1080px);
          margin: 0 auto;
          padding: ${S[32]}px clamp(${S[16]}px, 3vw, ${S[24]}px) 0;
        }
        .content-shell {
          width: min(100%, 1080px);
          margin: 0 auto;
          padding: 28px clamp(${S[16]}px, 3vw, ${S[24]}px) 60px;
        }
        .top-tabs {
          display: flex;
          gap: 0;
          position: relative;
          bottom: -1px;
          overflow-x: auto;
          scrollbar-width: thin;
          -webkit-overflow-scrolling: touch;
        }
        .top-tabs button {
          flex: 0 0 auto;
        }
        .two-col-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(260px, 1fr));
          gap: 20px;
        }
        .three-col-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(180px, 1fr));
          gap: 14px;
        }
        .dd-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(260px, 1fr));
        }
        @media (max-width: 1024px) {
          .three-col-grid {
            grid-template-columns: repeat(2, minmax(220px, 1fr));
          }
        }
        @media (max-width: 768px) {
          .two-col-grid,
          .three-col-grid,
          .dd-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div className="page-shell">
          <p style={{ fontSize: 12, fontWeight: 600, color: C.brand, margin: "0 0 8px", letterSpacing: "0.04em" }}>PLUS DESIGN GUIDELINE</p>
          <h1 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.5, letterSpacing: "-0.01em" }}>PLUSデザインガイドライン</h1>
          <p style={{ fontSize: 13, color: C.textSub, margin: "0 0 24px", lineHeight: 1.6 }}>開発時に参照する、デザイン判断の視覚的リファレンス</p>
          <nav className="top-tabs">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                fontFamily: ff, padding: "10px 20px", fontSize: 13,
                fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? C.brand : C.textSub,
                background: tab === t.id ? C.bg : "transparent",
                border: tab === t.id ? `1px solid ${C.border}` : "1px solid transparent",
                borderBottom: tab === t.id ? `1px solid ${C.bg}` : `1px solid ${C.border}`,
                borderRadius: `${R.btn} ${R.btn} 0 0`, cursor: "pointer",
              }}>{t.label}</button>
            ))}
            <div style={{ flex: 1, borderBottom: `1px solid ${C.border}` }} />
          </nav>
        </div>
      </div>

      <div className="content-shell">
        {tab === "principles" && <Principles />}
        {tab === "screen" && <Screens />}
        {tab === "dodont" && <DoDonts />}
      </div>
    </div>
  );
}

/* ═══ 原則 ═══ */
function Principles() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <P n="01" t="引き算で設計する" d="要素を足す前に「これがなくても成り立つか？」と問う。装飾を削ってもコンテンツが際立つなら、削ったほうがいい。">
        <div className="two-col-grid">
          <Lbl text="足し算（避ける）">
            <div style={{ background: "#eef4ff", borderRadius: 10, padding: 16, boxShadow: E["shadow-1"], border: "1px solid #c5d8f8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>📘</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1e40af" }}>進路希望調査</span>
                <span style={{ fontSize: 10, background: "#dbeafe", color: "#1e40af", padding: "2px 7px", borderRadius: 99, fontWeight: 700 }}>NEW</span>
              </div>
              <p style={{ fontSize: 12, color: "#475569", margin: "0 0 10px" }}>3年1組の生徒全員が対象です。</p>
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ fontSize: 10, background: "#fee2e2", color: "#b91c1c", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>重要!</span>
                <span style={{ fontSize: 10, background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>期限間近</span>
              </div>
            </div>
          </Lbl>
          <Lbl text="引き算（採用）">
            <div style={{ background: C.white, borderRadius: R.card, padding: 16, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>進路希望調査</div>
              <p style={{ fontSize: 13, color: C.textSub, margin: 0, lineHeight: 1.7 }}>3年1組 · 提出期限 1月15日</p>
            </div>
          </Lbl>
        </div>
      </P>

      <P n="02" t="角丸に意味を持たせる" d="ボタンは sm角丸（8px）。クリック可能なタグは full-rounded。表示のみのバッジは控えめ（3px）。形状で操作可能性を伝える。">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
          <Led l="ボタン（8px角丸）"><button style={bs("primary")}>提出する</button></Led>
          <Led l="タグ（full-rounded）"><span style={{ background: C.brandPale, color: C.brand, borderRadius: R.tag, padding: "5px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>進路指導</span></Led>
          <Led l="バッジ（3px角丸）"><span style={{ ...badgeStyle("submitted"), padding: "4px 10px", fontSize: 12 }}>提出済み</span></Led>
          <Led l="バッジ（3px角丸）"><span style={{ ...badgeStyle("unsubmitted"), padding: "4px 10px", fontSize: 12 }}>未提出</span></Led>
        </div>
      </P>

      <P n="03" t="画面の8割はグレーの階調" d="ブランドカラーの面積はごくわずか。テキストの濃淡だけで情報階層を作る。だからCTAの青が効く。">
        <div style={{ background: C.bg, borderRadius: R.card, padding: 16 }}>
          <div style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: "16px 20px" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 6 }}>2年3組 ホームルーム連絡</div>
            <p style={{ fontSize: 13, color: C.textSub, margin: "0 0 12px", lineHeight: 1.8 }}>明日の時間割変更について。3限の英語が体育に変更になります。</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: C.textMeta }}>田中先生 · 3時間前</span>
              <span style={{ fontSize: 13, color: C.brand, fontWeight: 500, cursor: "pointer" }}>詳細を見る →</span>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: C.textMeta, margin: "12px 0 0", lineHeight: 1.6 }}>↑ ブランドカラーは「詳細を見る →」のリンクテキストだけ。それ以外はすべてグレーの階調。</p>
      </P>

      <P n="04" t="影は「浮いている」場合だけ" d="カード装飾にシャドウを使わない。背景色の差とボーダーで十分にレイヤーが分かれる。">
        <div className="two-col-grid">
          <Lbl text="ボーダーで分離（採用）">
            <div style={{ background: C.bg, borderRadius: R.card, padding: 14 }}>
              <div style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>模試の結果</div>
                <div style={{ fontSize: 12, color: C.textMeta, marginTop: 4 }}>背景色の差で自然に分離</div>
              </div>
            </div>
          </Lbl>
          <Lbl text="シャドウで浮かす（避ける）">
            <div style={{ borderRadius: R.card, padding: 14 }}>
              <div style={{ background: C.white, borderRadius: R.card, boxShadow: E["shadow-1"], padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>模試の結果</div>
                <div style={{ fontSize: 12, color: C.textMeta, marginTop: 4 }}>装飾的な影は認知ノイズ</div>
              </div>
            </div>
          </Lbl>
        </div>
      </P>

      <P n="05" t="清潔で、冷たくない" d="教育系のポップさも、業務ツールの冷たさも避ける。PLUSのトーンは「やわらかいけど軽く見せない」。">
        <div className="three-col-grid">
          <Lbl text="❌ ポップすぎ"><div style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", borderRadius: 14, padding: 16, color: "#fff", textAlign: "center" }}><div style={{ fontSize: 20, marginBottom: 4 }}>🎉</div><div style={{ fontSize: 13, fontWeight: 700 }}>がんばったね！</div></div></Lbl>
          <Lbl text="❌ 冷たすぎ"><div style={{ background: "#f8f8f8", border: "1px solid #ccc", borderRadius: 2, padding: 16 }}><div style={{ fontSize: 10, fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>STATUS</div><div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>Report generated.</div></div></Lbl>
          <Lbl text="✅ ちょうどいい"><div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: 16 }}><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>提出状況</div><div style={{ fontSize: 12, color: C.textSub, marginTop: 6, lineHeight: 1.6 }}>32名中 28名が提出済み</div></div></Lbl>
        </div>
      </P>
    </div>
  );
}

/* ═══ 実画面 ═══ */
function Screens() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <SH>生徒向け — ホーム画面</SH>
      <SF>
        <Nav active="ホーム" items={["ホーム", "進路", "お知らせ"]} />
        <div style={{ padding: "20px 24px 24px" }}>
          <StateColorTable />
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px" }}>やること</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[{ t: "進路希望調査", s: "提出期限 1月15日", d: false }, { t: "模試結果の確認", s: "12月実施分", d: false }, { t: "冬休み課題レポート", s: "提出期限 1月8日", d: true }].map((x, i) => (
              <div key={i} style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <div><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{x.t}</div><div style={{ fontSize: 12, color: C.textMeta }}>{x.s}</div></div>
                <span style={{ ...badgeStyle(x.d ? "submitted" : "unsubmitted"), padding: "3px 10px" }}>{x.d ? "提出済" : "未提出"}</span>
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: "24px 0 14px" }}>お知らせ</h2>
          <div style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: "14px 18px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>時間割変更のお知らせ</div>
            <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7, marginBottom: 8 }}>1月10日（金）の3限が英語→体育に変更になります。</div>
            <div style={{ fontSize: 12, color: C.textMeta }}>田中先生 · 2時間前</div>
          </div>
        </div>
      </SF>
      <p style={{ fontSize: 12, color: C.textMeta, margin: 0, lineHeight: 1.7 }}>
        ブランドカラーはロゴとナビの選択状態のみ。バッジは badge角丸（3px）で操作不可を示す。カードはシャドウなし。
      </p>

      <SH>先生向け — 提出管理画面</SH>
      <SF>
        <Nav active="提出管理" items={["提出管理", "生徒一覧", "設定"]} teacher />
        <div style={{ padding: "20px 24px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div><div style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>進路希望調査</div><div style={{ fontSize: 12, color: C.textMeta }}>3年1組 · 提出期限 1月15日</div></div>
            <button style={bs("primary")}>リマインド送信</button>
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: "14px 18px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 600 }}>提出率</span><span style={{ fontSize: 13, fontWeight: 600 }}>28 / 35</span></div>
            <div style={{ height: 5, background: C.borderFaint, borderRadius: 3 }}><div style={{ height: 5, background: C.brand, borderRadius: 3, width: "80%" }} /></div>
          </div>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 80px", padding: "10px 18px", borderBottom: `1px solid ${C.border}`, fontSize: 12, fontWeight: 600, color: C.textMeta }}><span>No.</span><span>氏名</span><span style={{ textAlign: "right" }}>状況</span></div>
            {[{ n: 1, nm: "青木 太郎", d: true }, { n: 2, nm: "石川 花子", d: true }, { n: 3, nm: "上田 健一", d: false }, { n: 4, nm: "遠藤 美咲", d: false }, { n: 5, nm: "大野 翔太", d: true }].map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr 80px", padding: "11px 18px", borderBottom: i < 4 ? `1px solid ${C.borderFaint}` : "none", fontSize: 13, alignItems: "center" }}>
                <span style={{ color: C.textMeta }}>{s.n}</span><span style={{ fontWeight: 500 }}>{s.nm}</span>
                <span style={{ textAlign: "right" }}><span style={badgeStyle(s.d ? "submitted" : "unsubmitted")}>{s.d ? "提出済" : "未提出"}</span></span>
              </div>
            ))}
          </div>
        </div>
      </SF>
      <p style={{ fontSize: 12, color: C.textMeta, margin: 0, lineHeight: 1.7 }}>
        プライマリボタンは画面に1つ。角丸は8px（sm）。テーブルはボーダー極薄、zebra-stripeなし。
      </p>
    </div>
  );
}

/* ═══ Do/Don't ═══ */
function DoDonts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <DD rule="ブランドカラーの範囲" doD="CTA・リンク・選択状態だけに限定" dontD="背景や装飾に多用すると意味が薄れる"
        doE={<div style={{ display: "flex", flexDirection: "column", gap: 10 }}><span style={{ color: C.brand, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>進路希望調査を見る →</span><button style={{ ...bs("primary"), alignSelf: "flex-start" }}>提出する</button></div>}
        dontE={<div style={{ background: C.brandPale, borderRadius: R.card, padding: 14, border: `2px solid ${C.brand}` }}><div style={{ fontSize: 13, fontWeight: 700, color: C.brand }}>📢 お知らせ</div><div style={{ fontSize: 12, color: C.brand, marginTop: 4 }}>青で塗ったエリア</div></div>}
      />
      <DD rule="ボタンの角丸" doD="ボタンはsm角丸（8px）。タグはfull-rounded" dontD="ボタンにfull-roundedを使うとカジュアルすぎる"
        doE={<div style={{ display: "flex", gap: 10, alignItems: "center" }}><button style={bs("primary")}>保存</button><span style={{ background: C.brandPale, color: C.brand, borderRadius: R.tag, padding: "5px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>タグ</span></div>}
        dontE={<div style={{ display: "flex", gap: 10, alignItems: "center" }}><button style={{ ...bs("primary"), borderRadius: "99rem" }}>保存</button><span style={{ background: C.brandPale, color: C.brand, borderRadius: 4, padding: "5px 14px", fontSize: 12, fontWeight: 500 }}>タグ</span></div>}
      />
      <DD rule="情報量" doD="判断に必要な最小限の情報だけ" dontD="詰め込みすぎると認知ノイズになる"
        doE={<div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: "14px 16px" }}><div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>進路希望調査</div><div style={{ fontSize: 12, color: C.textMeta }}>3年1組 · 提出期限 1/15</div></div>}
        dontE={<div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: "14px 16px" }}><div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 4 }}><span style={{ fontSize: 15 }}>📋</span><span style={{ fontSize: 14, fontWeight: 700 }}>進路希望調査</span><span style={{ fontSize: 9, color: C.semantic.error.text, background: C.semantic.error.bg, border: `1px solid ${C.semantic.error.border}`, padding: "1px 5px", borderRadius: 99, fontWeight: 700 }}>重要!</span><span style={{ ...badgeStyle("unsubmitted"), fontSize: 9, padding: "1px 5px", borderRadius: 99, fontWeight: 600 }}>期限間近</span></div><div style={{ fontSize: 11, color: C.textSub, marginBottom: 4 }}>第一志望から第三志望まで…</div><div style={{ fontSize: 10, color: C.textMeta }}>3年1組 · 田中先生 · 作成12/20 · 期限1/15 · 未提出7名</div></div>}
      />
      <DD rule="ボタンの数" doD="プライマリは1つ。優先度を絞る" dontD="並列に置くと何を押すべきか迷う"
        doE={<div style={{ display: "flex", gap: 8 }}><button style={bs("primary")}>保存する</button><button style={bs("secondary")}>やめる</button></div>}
        dontE={<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><button style={bs("primary")}>保存</button><button style={{ ...bs("primary"), background: C.semantic.success.text }}>公開</button><button style={{ ...bs("secondary"), color: C.semantic.warning.text, borderColor: C.semantic.warning.border }}>下書き</button><button style={{ ...bs("secondary"), color: C.semantic.error.text, borderColor: C.semantic.error.border }}>削除</button></div>}
      />
      <DD rule="シャドウの使いどころ" doD="ドロップダウンなど浮遊する要素のみ" dontD="カードを飾る目的では使わない"
        doE={<div><div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.btn, padding: "8px 14px", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, color: C.textSub, marginBottom: 6 }}>クラスを選択 <span style={{ fontSize: 10 }}>▼</span></div><div style={{ background: C.white, borderRadius: R.btn, boxShadow: E["shadow-1"], border: `1px solid ${C.border}`, padding: 4, width: 150 }}>{["3年1組", "3年2組", "3年3組"].map((c, i) => (<div key={i} style={{ padding: "8px 12px", fontSize: 13, borderRadius: 6, color: i === 0 ? C.brand : C.text, background: i === 0 ? C.brandPale : "transparent", cursor: "pointer", fontWeight: i === 0 ? 600 : 400 }}>{c}</div>))}</div></div>}
        dontE={<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{["カードA", "カードB"].map((t, i) => (<div key={i} style={{ background: C.white, borderRadius: R.card, boxShadow: E["shadow-1"], padding: 14 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div><div style={{ fontSize: 11, color: C.textMeta, marginTop: 3 }}>装飾的なシャドウ</div></div>))}</div>}
      />
    </div>
  );
}

/* ── sub ── */
function P({ n, t, d, children }) {
  return (<div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card }}><div style={{ padding: "20px 24px 0" }}><div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}><span style={{ fontSize: 12, fontWeight: 700, color: C.brand }}>{n}</span><h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{t}</h3></div><p style={{ fontSize: 13, color: C.textSub, margin: "0 0 18px", lineHeight: 1.8 }}>{d}</p></div><div style={{ padding: "0 24px 22px" }}>{children}</div></div>);
}
function Lbl({ text, children }) { return (<div><div style={{ fontSize: 11, fontWeight: 600, color: C.textMeta, marginBottom: 8, textAlign: "center" }}>{text}</div>{children}</div>); }
function Led({ l, children }) { return (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>{children}<span style={{ fontSize: 10, color: C.textMeta }}>{l}</span></div>); }
function SH({ children }) { return <div style={{ fontSize: 12, fontWeight: 600, color: C.textMeta, letterSpacing: "0.03em", paddingBottom: 6, borderBottom: `1px solid ${C.borderFaint}` }}>{children}</div>; }
function SF({ children }) { return <div style={{ background: C.bg, borderRadius: R.card, border: `1px solid ${C.border}`, overflow: "hidden" }}>{children}</div>; }
function Nav({ active, items, teacher }) {
  return (<div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "10px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 16 }}><span style={{ fontSize: 17, fontWeight: 700, color: C.brand, letterSpacing: "-0.02em" }}>PLUS</span>{teacher && <span style={{ fontSize: 11, color: C.textMeta, background: C.borderFaint, padding: "2px 8px", borderRadius: R.badge }}>先生</span>}<div style={{ display: "flex", gap: 6 }}>{items.map(x => (<span key={x} style={{ fontSize: 13, fontWeight: x === active ? 600 : 400, color: x === active ? C.text : C.textMeta, padding: "4px 10px", borderRadius: R.btn, background: x === active ? C.bg : "transparent", cursor: "pointer" }}>{x}</span>))}</div></div><div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }} /></div>);
}
function DD({ rule, doD, dontD, doE, dontE }) {
  return (<div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, overflow: "hidden" }}><div style={{ padding: "12px 22px", borderBottom: `1px solid ${C.borderFaint}` }}><span style={{ fontSize: 14, fontWeight: 600 }}>{rule}</span></div><div className="dd-grid"><div style={{ padding: "18px 22px", borderRight: `1px solid ${C.borderFaint}` }}><div style={{ fontSize: 11, fontWeight: 700, color: C.semantic.success.text, marginBottom: 4 }}>Do</div><div style={{ fontSize: 11, color: C.textSub, marginBottom: 12, lineHeight: 1.5 }}>{doD}</div>{doE}</div><div style={{ padding: "18px 22px" }}><div style={{ fontSize: 11, fontWeight: 700, color: C.semantic.error.text, marginBottom: 4 }}>Don't</div><div style={{ fontSize: 11, color: C.textSub, marginBottom: 12, lineHeight: 1.5 }}>{dontD}</div>{dontE}</div></div></div>);
}

function StateColorTable() {
  const rows = [
    { state: "submitted", usage: "提出済み / 完了" },
    { state: "unsubmitted", usage: "未提出 / 期限接近" },
    { state: "new", usage: "新着 / 未読" },
  ];
  return (
    <div style={{ border: `1px solid ${C.borderFaint}`, borderRadius: R.card, marginBottom: S[16], overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", background: C.bg, ...T.caption, fontWeight: 700, color: C.textMeta }}>
        <div style={{ padding: `${S[8]}px ${S[12]}px` }}>状態</div>
        <div style={{ padding: `${S[8]}px ${S[12]}px` }}>使う場面</div>
      </div>
      {rows.map((row) => (
        <div key={row.state} style={{ display: "grid", gridTemplateColumns: "120px 1fr", borderTop: `1px solid ${C.borderFaint}` }}>
          <div style={{ padding: `${S[8]}px ${S[12]}px` }}><span style={badgeStyle(row.state)}>{STATUS_TONE[row.state].label}</span></div>
          <div style={{ padding: `${S[8]}px ${S[12]}px`, ...T.body, color: C.textSub }}>{row.usage}</div>
        </div>
      ))}
    </div>
  );
}
