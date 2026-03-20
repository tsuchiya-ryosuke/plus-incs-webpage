import { useState } from "react";

const C = {
  brand: "#3ea8ff", brandPale: "#edf6ff",
  text: "#333", textSub: "#6e7b85", textMeta: "#a0aab4",
  border: "#e4edf4", borderFaint: "#f0f4f8",
  bg: "#f5f8fa", white: "#fff",
  green: "#1cb955", greenPale: "#edfaf3",
  amber: "#e09200", amberPale: "#fef8ec",
};
const R = { btn: "8px", card: "12px", badge: "3px" };
const ff = "'Noto Sans JP', -apple-system, sans-serif";

function bs(v) {
  const b = { fontFamily: ff, fontSize: 13, fontWeight: 600, border: "none", borderRadius: R.btn, padding: "8px 20px", cursor: "pointer" };
  return v === "primary" ? { ...b, background: C.brand, color: "#fff" } : { ...b, background: "transparent", color: C.textSub, border: `1px solid ${C.border}` };
}

export default function App() {
  const [tab, setTab] = useState("flow");
  const tabs = [
    { id: "flow", label: "生徒フロー" },
    { id: "teacher", label: "先生画面" },
    { id: "details", label: "入力欄の設計" },
  ];

  return (
    <div style={{ fontFamily: ff, background: C.bg, minHeight: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.brand, margin: "0 0 8px", letterSpacing: "0.04em" }}>PLUS DESIGN</p>
          <h1 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.5 }}>チャット画面 確定デザイン</h1>
          <p style={{ fontSize: 13, color: C.textSub, margin: "0 0 24px", lineHeight: 1.6 }}>共有シートボタン = 入力欄統合型 / ナビ = ヘッダー内セグメント</p>
          <nav style={{ display: "flex", gap: 0, position: "relative", bottom: -1 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                fontFamily: ff, padding: "10px 18px", fontSize: 13,
                fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? C.brand : C.textSub,
                background: tab === t.id ? C.bg : "transparent",
                border: tab === t.id ? `1px solid ${C.border}` : "1px solid transparent",
                borderBottom: tab === t.id ? `1px solid ${C.bg}` : `1px solid ${C.border}`,
                borderRadius: "8px 8px 0 0", cursor: "pointer",
              }}>{t.label}</button>
            ))}
            <div style={{ flex: 1, borderBottom: `1px solid ${C.border}` }} />
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        {tab === "flow" && <StudentFlow />}
        {tab === "teacher" && <TeacherScreens />}
        {tab === "details" && <InputDetails />}
      </div>
    </div>
  );
}

/* ═══════════════════════════ */
/*     生徒フロー（4画面）     */
/* ═══════════════════════════ */
function StudentFlow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.8 }}>
        チャット → 共有シート作成 → プレビュー → 送信完了の一連の流れ。共有シートのリンクは入力欄の直下に常駐し、チャット体験の一部として溶け込む。
      </div>

      <SH>1. チャット → 2. 共有シート生成</SH>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
        <Phone label="1. 通常のチャット">
          <Header active="チャット" />
          <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            <AiB>進路について一緒に考えましょう。どんな分野に興味がありますか？</AiB>
            <UserB>情報系の学部に行きたいです</UserB>
            <AiB>いいですね。数学と英語の成績を教えてもらえますか？</AiB>
            <UserB>数学は偏差値58、英語は52です</UserB>
            <AiB>数学が強みですね。情報系では有利です。英語は今から対策すれば間に合いますよ。</AiB>
          </div>
          <InputC />
        </Phone>

        <Phone label="2. 会話が深まったタイミング">
          <Header active="チャット" />
          <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            <UserB>国公立と私立、どっちがいいですかね</UserB>
            <AiB>数学が強いので、国公立の二次試験で有利になる可能性が高いです。一方、私立なら科目を絞れるメリットがあります。</AiB>
            <UserB>なるほど…先生にも相談したいです</UserB>
            <AiB>いい考えですね。ここまでの内容を共有シートにまとめて先生に送れますよ。入力欄の下にあるリンクから作れます。</AiB>
          </div>
          <InputC highlight />
        </Phone>
      </div>
      <p style={{ fontSize: 12, color: C.textMeta, margin: 0, lineHeight: 1.7, textAlign: "center" }}>
        共有シートリンクは常に入力欄の下にある。AIが共有を提案したタイミングで生徒の目に自然に入る。
      </p>

      <SH>3. プレビュー → 4. 送信完了</SH>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
        <Phone label="3. プレビュー確認">
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16, color: C.textSub, cursor: "pointer" }}>←</span>
            <span style={{ fontSize: 15, fontWeight: 700 }}>共有シート</span>
          </div>
          <div style={{ padding: 16, flex: 1 }}>
            <div style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: 16, marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: C.textMeta, marginBottom: 12 }}>2026年1月10日 作成</div>
              {[
                ["希望分野", "情報系学部（国公立 or 私立で検討中）"],
                ["現在の学力", "数学 偏差値58 / 英語 偏差値52"],
                ["相談したいこと", "国公立を目指すか私立に絞るかの判断軸。英語の対策時期。"],
                ["AIからの所見", "数学が強みで情報系は適性あり。英語は早期対策を推奨。"],
              ].map(([label, val], i) => (
                <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.textMeta, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7 }}>{val}</div>
                </div>
              ))}
            </div>
            <button style={{ ...bs("primary"), width: "100%", padding: "12px 20px", fontSize: 14, marginBottom: 8 }}>先生に送信する</button>
            <button style={{ ...bs("secondary"), width: "100%", padding: "10px 20px", fontSize: 13 }}>編集する</button>
          </div>
        </Phone>

        <Phone label="4. 送信完了">
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16, color: C.textSub, cursor: "pointer" }}>←</span>
            <span style={{ fontSize: 15, fontWeight: 700 }}>共有シート</span>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>✓</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>送信しました</div>
            <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7, marginBottom: 24 }}>田中先生に共有シートが届きました。</div>
            <button style={{ ...bs("secondary"), padding: "10px 28px" }}>チャットに戻る</button>
          </div>
        </Phone>
      </div>
    </div>
  );
}

/* ═══════════════════════════ */
/*     先生画面                */
/* ═══════════════════════════ */
function TeacherScreens() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.8 }}>
        先生は生徒ごとの一覧で共有シートを確認する。シートの構造は生徒が見たプレビューと同一。
      </div>

      <SH>一覧 → 詳細</SH>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
        <Phone label="生徒一覧">
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.brand }}>PLUS</span>
            <span style={{ fontSize: 10, color: C.textMeta, background: C.borderFaint, padding: "2px 7px", borderRadius: R.badge }}>先生</span>
          </div>
          <div style={{ padding: 16, flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>3年1組</div>
            <div style={{ fontSize: 12, color: C.textMeta, marginBottom: 14 }}>共有シート 8件（新着 3件）</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { nm: "青木 太郎", topic: "情報系学部の志望校選び", time: "2時間前", isNew: true },
                { nm: "石川 花子", topic: "推薦か一般かの相談", time: "5時間前", isNew: true },
                { nm: "上田 健一", topic: "文理選択について", time: "昨日", isNew: true },
                { nm: "遠藤 美咲", topic: "模試の結果振り返り", time: "3日前", isNew: false },
                { nm: "大野 翔太", topic: "併願パターンの相談", time: "1週間前", isNew: false },
              ].map((s, i) => (
                <div key={i} style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: "12px 14px", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{s.nm}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {s.isNew && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.brand, flexShrink: 0 }} />}
                      <span style={{ fontSize: 11, color: C.textMeta }}>{s.time}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{s.topic}</div>
                </div>
              ))}
            </div>
          </div>
        </Phone>

        <Phone label="シート詳細">
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16, color: C.textSub, cursor: "pointer" }}>←</span>
            <span style={{ fontSize: 15, fontWeight: 700 }}>青木 太郎</span>
          </div>
          <div style={{ padding: 16, flex: 1 }}>
            <div style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: 16, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: C.textMeta }}>2026年1月10日</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: C.brand, background: C.brandPale, padding: "2px 8px", borderRadius: R.badge }}>新着</span>
              </div>
              {[
                ["希望分野", "情報系学部（国公立 or 私立）"],
                ["現在の学力", "数学 偏差値58 / 英語 偏差値52"],
                ["相談したいこと", "国公立か私立かの判断軸。英語の対策時期。"],
                ["AIからの所見", "数学が強みで情報系は適性あり。英語は早期対策を推奨。"],
              ].map(([label, val], i) => (
                <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.textMeta, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7 }}>{val}</div>
                </div>
              ))}
            </div>
            <button style={{ ...bs("primary"), width: "100%", padding: "11px 20px", fontSize: 13 }}>コメントを返す</button>
          </div>
        </Phone>
      </div>
    </div>
  );
}

/* ═══════════════════════════ */
/*     入力欄の設計詳細        */
/* ═══════════════════════════ */
function InputDetails() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.8 }}>
        C案（入力欄統合型）の詳細仕様。共有シートリンクは入力欄の直下に小さく常駐し、チャットの付属機能として存在する。
      </div>

      <SH>構造の分解</SH>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: 24 }}>
        {/* Actual size input area mockup */}
        <div style={{ maxWidth: 340, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMeta, marginBottom: 8 }}>入力エリア全体</div>
          <div style={{ background: C.white, border: `1px solid ${C.brand}33`, borderRadius: R.card, padding: 2 }}>
            {/* Input row */}
            <div style={{ padding: "10px 14px", borderBottom: `1px dashed ${C.borderFaint}` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.brand, marginBottom: 6 }}>① 入力欄</div>
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: C.textMeta, flex: 1 }}>メッセージを入力...</span>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, flexShrink: 0 }}>↑</div>
              </div>
            </div>
            {/* Sheet link row */}
            <div style={{ padding: "8px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.brand, marginBottom: 6 }}>② 共有シートリンク</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${C.brand}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: C.brand }}>↗</div>
                <span style={{ fontSize: 12, color: C.brand, fontWeight: 500 }}>共有シートを作成</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SH>通常時 vs 強調時</SH>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
        <Phone label="通常時">
          <Header active="チャット" />
          <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            <AiB>どんな分野に興味がありますか？</AiB>
            <UserB>情報系に行きたいです</UserB>
            <AiB>いいですね。もう少し詳しく教えてください。</AiB>
          </div>
          <InputC />
        </Phone>

        <Phone label="AIが共有を提案した直後">
          <Header active="チャット" />
          <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            <UserB>先生にも相談したいです</UserB>
            <AiB>いいですね。ここまでの内容を共有シートにまとめて先生に送れますよ。</AiB>
          </div>
          <InputC highlight />
        </Phone>
      </div>
      <p style={{ fontSize: 12, color: C.textMeta, margin: 0, lineHeight: 1.7, textAlign: "center" }}>
        通常時はリンクテキストだけで控えめに。AIが共有を提案したタイミングで背景色をつけてさりげなく強調。アニメーションや点滅は使わない。
      </p>

      <SH>現状との比較</SH>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
        <Phone label="Before（現状）">
          {/* Mimicking current VisionWell+ */}
          <div style={{ background: "#4a9e5c", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16, color: C.white, cursor: "pointer" }}>☰</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.white }}>VisionWell+</span>
            </div>
            <span style={{ fontSize: 12, color: C.white, border: "1px solid rgba(255,255,255,.5)", borderRadius: 4, padding: "3px 8px" }}>設定</span>
          </div>
          <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 13, fontWeight: 600, color: "#4a9e5c", borderBottom: "2px solid #4a9e5c" }}>相談チャット</div>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 13, color: C.textMeta }}>学期レポート</div>
          </div>
          <div style={{ padding: "12px 12px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
            <div style={{ alignSelf: "flex-start", background: C.white, border: `1px solid ${C.border}`, borderRadius: "14px 14px 14px 4px", padding: "8px 12px", fontSize: 12, maxWidth: "80%", lineHeight: 1.7 }}>進路について一緒に考えましょう。</div>
            <div style={{ alignSelf: "flex-end", background: "#dcf8c6", borderRadius: "14px 14px 4px 14px", padding: "8px 12px", fontSize: 12, maxWidth: "80%" }}>情報系に行きたいです</div>
          </div>
          {/* Current yellow button */}
          <div style={{ padding: "6px 12px", background: "#fff9db", borderTop: "1px solid #f0e68c" }}>
            <div style={{ textAlign: "center", padding: "8px 0", fontSize: 13, fontWeight: 600, color: "#8b6914" }}>📝 この会話を元に共有シートを生成</div>
          </div>
          <div style={{ padding: "10px 12px", background: C.white, borderTop: `1px solid ${C.border}` }}>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: C.textMeta }}>メッセージを入力してください...</span>
              <span style={{ fontSize: 13, color: C.textMeta, background: C.bg, borderRadius: 4, padding: "4px 12px" }}>送信</span>
            </div>
          </div>
        </Phone>

        <Phone label="After（C案適用）">
          <Header active="チャット" />
          <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            <AiB>進路について一緒に考えましょう。</AiB>
            <UserB>情報系に行きたいです</UserB>
            <AiB>いいですね。数学と英語の成績を教えてもらえますか？</AiB>
            <UserB>数学は偏差値58です</UserB>
            <AiB>数学が強みですね。情報系には有利です。</AiB>
          </div>
          <InputC />
        </Phone>
      </div>
      <p style={{ fontSize: 12, color: C.textMeta, margin: 0, lineHeight: 1.7, textAlign: "center" }}>
        ヘッダーが1段に。タブは消えてセグメントに。黄色ボタンが消えてリンクテキストに。吹き出しもトーン統一。全体として情報密度が下がり、チャットに集中できる。
      </p>
    </div>
  );
}

/* ── shared ── */
function Phone({ children, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ width: 280, background: "#1a1a1a", borderRadius: 28, padding: "10px 7px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}><div style={{ width: 68, height: 18, background: "#1a1a1a", borderRadius: 9 }} /></div>
        <div style={{ background: C.bg, borderRadius: 16, overflow: "hidden", height: 510, display: "flex", flexDirection: "column" }}>{children}</div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}><div style={{ width: 80, height: 4, background: "#555", borderRadius: 2 }} /></div>
      </div>
      {label && <p style={{ fontSize: 11, fontWeight: 600, color: C.textSub, margin: 0, textAlign: "center", maxWidth: 200 }}>{label}</p>}
    </div>
  );
}

function Header({ active }) {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "10px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: C.brand }}>PLUS</span>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }} />
      </div>
      <div style={{ display: "flex", background: C.bg, borderRadius: R.btn, padding: 3 }}>
        {["チャット", "レポート"].map(x => (
          <div key={x} style={{
            flex: 1, textAlign: "center", padding: "6px 0", fontSize: 12,
            fontWeight: x === active ? 600 : 400,
            color: x === active ? C.brand : C.textMeta,
            background: x === active ? C.white : "transparent",
            borderRadius: 6,
            boxShadow: x === active ? "0 1px 3px rgba(0,0,0,.06)" : "none",
          }}>{x}</div>
        ))}
      </div>
    </div>
  );
}

function InputC({ highlight } = {}) {
  return (
    <div style={{ padding: "10px 14px", background: C.white, borderTop: `1px solid ${C.border}` }}>
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20, padding: "9px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13, color: C.textMeta, flex: 1 }}>メッセージを入力...</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, flexShrink: 0 }}>↑</div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6, paddingTop: 8,
        ...(highlight ? { background: C.brandPale, margin: "8px -14px -10px", padding: "10px 14px", borderRadius: "0 0 0 0" } : {}),
      }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${C.brand}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: C.brand }}>↗</div>
        <span style={{ fontSize: 12, color: C.brand, fontWeight: 500, cursor: "pointer" }}>共有シートを作成</span>
      </div>
    </div>
  );
}

function AiB({ children }) {
  return (<div style={{ alignSelf: "flex-start", background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: "9px 12px", fontSize: 12, color: C.text, lineHeight: 1.7, maxWidth: "82%" }}>{children}</div>);
}
function UserB({ children }) {
  return (<div style={{ alignSelf: "flex-end", background: C.brandPale, borderRadius: R.card, padding: "9px 12px", fontSize: 12, color: C.text, lineHeight: 1.7, maxWidth: "82%" }}>{children}</div>);
}
function SH({ children }) { return <div style={{ fontSize: 12, fontWeight: 600, color: C.textMeta, letterSpacing: "0.03em", paddingBottom: 6, borderBottom: `1px solid ${C.borderFaint}` }}>{children}</div>; }
