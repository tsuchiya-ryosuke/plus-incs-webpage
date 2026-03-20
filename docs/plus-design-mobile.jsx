import { useMemo, useState } from "react";
import ja from "../locales/ja/plus-design-mobile.json";

const C = {
  brand: "#3ea8ff", brandPale: "#edf6ff",
  text: "#333", textSub: "#6e7b85", textMeta: "#5f6b76",
  border: "#e4edf4", borderFaint: "#f0f4f8",
  bg: "#f5f8fa", white: "#fff",
  green: "#1cb955", greenPale: "#edfaf3",
};
const R = { btn: "8px", card: "12px", badge: "3px" };
const ff = "'Noto Sans JP', -apple-system, sans-serif";

const DEMO_NOW = new Date("2026-01-12T12:00:00+09:00");

function formatAbsoluteDate(dateString, includeSuffix = false) {
  const text = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(dateString));
  return includeSuffix ? `${text} ${ja.common.created}` : text;
}

function formatRelativeTime(dateString, now = DEMO_NOW) {
  const date = new Date(dateString);
  const diffMs = date.getTime() - now.getTime();
  const absMs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat("ja-JP", { numeric: "auto" });
  const hourMs = 1000 * 60 * 60;
  const dayMs = hourMs * 24;
  const weekMs = dayMs * 7;

  if (absMs < dayMs) {
    return rtf.format(Math.round(diffMs / hourMs), "hour");
  }
  if (absMs < weekMs * 2) {
    return rtf.format(Math.round(diffMs / dayMs), "day");
  }
  return rtf.format(Math.round(diffMs / weekMs), "week");
}

function bs(v) {
  const b = { fontFamily: ff, fontSize: 13, fontWeight: 600, border: "none", borderRadius: R.btn, padding: "8px 20px", cursor: "pointer" };
  return v === "primary" ? { ...b, background: C.brand, color: "#fff" } : { ...b, background: "transparent", color: C.textSub, border: `1px solid ${C.border}` };
}

export default function App() {
  const [tab, setTab] = useState("flow");
  const tabs = ja.tabs;

  return (
    <div style={{ fontFamily: ff, background: C.bg, minHeight: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        .focusable { outline: none; }
        .focusable:focus-visible {
          outline: 3px solid ${C.brand}; outline-offset: 2px; box-shadow: 0 0 0 2px ${C.white};
        }
        .page-shell { width: min(100%, 1100px); margin: 0 auto; padding: 32px clamp(16px, 3vw, 24px) 0; }
        .content-shell { width: min(100%, 1100px); margin: 0 auto; padding: 28px clamp(16px, 3vw, 24px) 60px; }
        .top-tabs { display: flex; gap: 0; position: relative; bottom: -1px; overflow-x: auto; scrollbar-width: thin; -webkit-overflow-scrolling: touch; }
        .top-tabs button { flex: 0 0 auto; }
        .phone-grid { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; container-type: inline-size; }
        .phone-shell { width: clamp(240px, 38vw, 360px); border: 1px solid ${C.border}; border-radius: 20px; overflow: hidden; background: ${C.bg}; min-height: 510px; display: flex; flex-direction: column; }
        @container (max-width: 760px) { .phone-shell { width: clamp(220px, 92cqw, 380px); } }
      `}</style>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
        <div className="page-shell">
          <p style={{ fontSize: 12, fontWeight: 600, color: C.brand, margin: "0 0 8px", letterSpacing: "0.04em" }}>{ja.header.badge}</p>
          <h1 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.5 }}>{ja.header.title}</h1>
          <p style={{ fontSize: 13, color: C.textSub, margin: "0 0 24px", lineHeight: 1.6 }}>{ja.header.subtitle}</p>
          <nav className="top-tabs">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="focusable" style={{
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

      <div className="content-shell">
        {tab === "flow" && <StudentFlow />}
        {tab === "teacher" && <TeacherScreens />}
        {tab === "details" && <InputDetails />}
        <VerificationChecklist />
      </div>
    </div>
  );
}

function StudentFlow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.8 }}>{ja.studentFlow.lead}</div>

      <SH>{ja.studentFlow.stepTitle1}</SH>
      <div className="phone-grid">
        <Phone label={ja.studentFlow.phone1.label}><Header active={ja.common.chat} /><div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>{ja.studentFlow.phone1.messages.map((m, i) => m.role === "ai" ? <AiB key={i}>{m.text}</AiB> : <UserB key={i}>{m.text}</UserB>)}</div><InputC /></Phone>
        <Phone label={ja.studentFlow.phone2.label}><Header active={ja.common.chat} /><div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>{ja.studentFlow.phone2.messages.map((m, i) => m.role === "ai" ? <AiB key={i}>{m.text}</AiB> : <UserB key={i}>{m.text}</UserB>)}</div><InputC highlight /></Phone>
      </div>
      <p style={{ fontSize: 12, color: C.textMeta, margin: 0, lineHeight: 1.7, textAlign: "center" }}>{ja.studentFlow.note}</p>

      <SH>{ja.studentFlow.stepTitle2}</SH>
      <div className="phone-grid">
        <Phone label={ja.studentFlow.preview.label}>
          <ScreenHeader title={ja.common.shareSheet} backAria={ja.studentFlow.preview.backAria} />
          <div style={{ padding: 16, flex: 1 }}>
            <div style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: 16, marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: C.textMeta, marginBottom: 12 }}>{formatAbsoluteDate(ja.sampleDates.sheetCreatedAt, true)}</div>
              {ja.sampleSheet.items.map(([label, val], i) => (<div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}><div style={{ fontSize: 11, fontWeight: 600, color: C.textMeta, marginBottom: 3 }}>{label}</div><div style={{ fontSize: 13, lineHeight: 1.7 }}>{val}</div></div>))}
            </div>
            <button type="button" className="focusable" style={{ ...bs("primary"), width: "100%", padding: "12px 20px", fontSize: 14, marginBottom: 8 }}>{ja.studentFlow.preview.send}</button>
            <button type="button" className="focusable" style={{ ...bs("secondary"), width: "100%", padding: "10px 20px", fontSize: 13 }}>{ja.studentFlow.preview.edit}</button>
          </div>
        </Phone>

        <Phone label={ja.studentFlow.done.label}>
          <ScreenHeader title={ja.common.shareSheet} backAria={ja.studentFlow.done.backAria} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>✓</div>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{ja.studentFlow.done.title}</div>
            <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7, marginBottom: 24 }}>{ja.studentFlow.done.body}</div>
            <button type="button" className="focusable" style={{ ...bs("secondary"), padding: "10px 28px" }}>{ja.studentFlow.done.back}</button>
          </div>
        </Phone>
      </div>
    </div>
  );
}

function TeacherScreens() {
  const students = useMemo(() => ja.teacher.list.items.map((s) => ({ ...s, time: formatRelativeTime(s.updatedAt) })), []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.8 }}>{ja.teacher.lead}</div>

      <SH>{ja.teacher.section}</SH>
      <div className="phone-grid">
        <Phone label={ja.teacher.list.label}>
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.brand }}>{ja.brand.wordmark}</span>
            <span style={{ fontSize: 10, color: C.textMeta, background: C.borderFaint, padding: "2px 7px", borderRadius: R.badge }}>{ja.teacher.list.badge}</span>
          </div>
          <div style={{ padding: 16, flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{ja.teacher.list.className}</div>
            <div style={{ fontSize: 12, color: C.textMeta, marginBottom: 14 }}>{ja.teacher.list.summary}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {students.map((s, i) => (
                <button type="button" className="focusable" key={i} style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: "12px 14px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{s.nm}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {s.isNew && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.brand, flexShrink: 0 }} />}
                      <span style={{ fontSize: 11, color: C.textMeta }}>{s.time}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{s.topic}</div>
                </button>
              ))}
            </div>
          </div>
        </Phone>

        <Phone label={ja.teacher.detail.label}>
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <button type="button" className="focusable" aria-label={ja.teacher.detail.backAria} style={{ fontSize: 16, color: C.textSub, cursor: "pointer", border: "none", background: "transparent", padding: 0, lineHeight: 1 }}>←</button>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{ja.teacher.detail.studentName}</span>
          </div>
          <div style={{ padding: 16, flex: 1 }}>
            <div style={{ background: C.white, borderRadius: R.card, border: `1px solid ${C.border}`, padding: 16, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: C.textMeta }}>{formatAbsoluteDate(ja.sampleDates.sheetCreatedAt)}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: C.brand, background: C.brandPale, padding: "2px 8px", borderRadius: R.badge }}>{ja.common.newLabel}</span>
              </div>
              {ja.sampleSheet.items.map(([label, val], i) => (<div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}><div style={{ fontSize: 11, fontWeight: 600, color: C.textMeta, marginBottom: 3 }}>{label}</div><div style={{ fontSize: 13, lineHeight: 1.7 }}>{val}</div></div>))}
            </div>
            <button type="button" className="focusable" style={{ ...bs("primary"), width: "100%", padding: "11px 20px", fontSize: 13 }}>{ja.teacher.detail.reply}</button>
          </div>
        </Phone>
      </div>
    </div>
  );
}

function InputDetails() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.8 }}>{ja.inputDetails.lead}</div>
      <SH>{ja.inputDetails.structureTitle}</SH>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: 24 }}>
        <div style={{ maxWidth: 340, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textMeta, marginBottom: 8 }}>{ja.inputDetails.inputArea}</div>
          <div style={{ background: C.white, border: `1px solid ${C.brand}33`, borderRadius: R.card, padding: 2 }}>
            <div style={{ padding: "10px 14px", borderBottom: `1px dashed ${C.borderFaint}` }}><div style={{ fontSize: 11, fontWeight: 600, color: C.brand, marginBottom: 6 }}>{ja.inputDetails.field1}</div><InputRow /></div>
            <div style={{ padding: "8px 14px" }}><div style={{ fontSize: 11, fontWeight: 600, color: C.brand, marginBottom: 6 }}>{ja.inputDetails.field2}</div><ShareLink /></div>
          </div>
        </div>
      </div>

      <SH>{ja.inputDetails.compareTitle}</SH>
      <div className="phone-grid">
        <Phone label={ja.inputDetails.normalLabel}><Header active={ja.common.chat} /><div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>{ja.inputDetails.normalMessages.map((m, i) => m.role === "ai" ? <AiB key={i}>{m.text}</AiB> : <UserB key={i}>{m.text}</UserB>)}</div><InputC /></Phone>
        <Phone label={ja.inputDetails.highlightLabel}><Header active={ja.common.chat} /><div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>{ja.inputDetails.highlightMessages.map((m, i) => m.role === "ai" ? <AiB key={i}>{m.text}</AiB> : <UserB key={i}>{m.text}</UserB>)}</div><InputC highlight /></Phone>
      </div>
      <p style={{ fontSize: 12, color: C.textMeta, margin: 0, lineHeight: 1.7, textAlign: "center" }}>{ja.inputDetails.compareNote}</p>

      <SH>{ja.inputDetails.beforeAfterTitle}</SH>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
        <Phone label={ja.inputDetails.beforeLabel}>
          <div style={{ background: "#4a9e5c", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button type="button" className="focusable" aria-label={ja.inputDetails.menuAria} style={{ fontSize: 16, color: C.white, cursor: "pointer", border: "none", background: "transparent", padding: 0, lineHeight: 1 }}>☰</button>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.white }}>{ja.brand.legacyWordmark}</span>
            </div>
            <span style={{ fontSize: 12, color: C.white, border: "1px solid rgba(255,255,255,.5)", borderRadius: 4, padding: "3px 8px" }}>{ja.common.settings}</span>
          </div>
          <div style={{ display: "flex", background: C.white, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 13, fontWeight: 600, color: "#4a9e5c", borderBottom: "2px solid #4a9e5c" }}>{ja.common.chat}</div>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 13, color: C.textMeta }}>{ja.common.report}</div>
          </div>
          <div style={{ padding: "12px 12px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
            <AiB>{ja.inputDetails.beforeMessages[0]}</AiB>
            <UserB>{ja.inputDetails.beforeMessages[1]}</UserB>
          </div>
          <div style={{ padding: "6px 12px", background: "#fff9db", borderTop: "1px solid #f0e68c" }}><div style={{ textAlign: "center", padding: "8px 0", fontSize: 13, fontWeight: 600, color: "#8b6914" }}>{ja.inputDetails.legacyAction}</div></div>
          <div style={{ padding: "10px 12px", background: C.white, borderTop: `1px solid ${C.border}` }}><div style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: 12, color: C.textMeta }}>{ja.common.messagePlaceholderLong}</span><span style={{ fontSize: 13, color: C.textMeta, background: C.bg, borderRadius: 4, padding: "4px 12px" }}>{ja.common.send}</span></div></div>
        </Phone>

        <Phone label={ja.inputDetails.afterLabel}><Header active={ja.common.chat} /><div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>{ja.inputDetails.afterMessages.map((m, i) => m.role === "ai" ? <AiB key={i}>{m.text}</AiB> : <UserB key={i}>{m.text}</UserB>)}</div><InputC /></Phone>
      </div>
      <p style={{ fontSize: 12, color: C.textMeta, margin: 0, lineHeight: 1.7, textAlign: "center" }}>{ja.inputDetails.beforeAfterNote}</p>
    </div>
  );
}

function Phone({ children, label }) { return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}><div className="phone-shell">{children}</div>{label && <p style={{ fontSize: 11, fontWeight: 600, color: C.textSub, margin: 0, textAlign: "center", maxWidth: 200 }}>{label}</p>}</div>; }
function ScreenHeader({ title, backAria }) { return <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}><button type="button" className="focusable" aria-label={backAria} style={{ fontSize: 16, color: C.textSub, cursor: "pointer", border: "none", background: "transparent", padding: 0, lineHeight: 1 }}>←</button><span style={{ fontSize: 15, fontWeight: 700 }}>{title}</span></div>; }

function Header({ active }) {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "10px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}><span style={{ fontSize: 16, fontWeight: 700, color: C.brand }}>{ja.brand.wordmark}</span><div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }} /></div>
      <div style={{ display: "flex", background: C.bg, borderRadius: R.btn, padding: 3, overflowX: "auto", gap: 4, scrollbarWidth: "thin" }}>
        {[ja.common.chat, ja.common.report].map(x => (
          <button type="button" className="focusable" key={x} style={{ flex: "0 0 auto", minWidth: 84, textAlign: "center", padding: "6px 12px", fontSize: 12, fontWeight: x === active ? 600 : 400, color: x === active ? C.brand : C.textMeta, background: x === active ? C.white : "transparent", borderRadius: 6, border: "none", boxShadow: x === active ? "0 1px 3px rgba(0,0,0,.06)" : "none" }}>{x}</button>
        ))}
      </div>
    </div>
  );
}

function InputRow() {
  return <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 20, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 13, color: C.textMeta, flex: 1 }}>{ja.common.messagePlaceholder}</span><button type="button" className="focusable" aria-label={ja.common.sendAria} style={{ width: 30, height: 30, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, flexShrink: 0, border: "none" }}>↑</button></div>;
}
function ShareLink() {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${C.brand}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: C.brand }}>↗</div><button type="button" className="focusable" style={{ fontSize: 12, color: C.brand, fontWeight: 500, background: "transparent", border: "none", padding: 0 }}>{ja.common.createShareSheet}</button></div>;
}

function InputC({ highlight } = {}) {
  return <div style={{ padding: "10px 14px", background: C.white, borderTop: `1px solid ${C.border}` }}><InputRow /><div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, paddingTop: 8, ...(highlight ? { background: C.brandPale, margin: "8px -14px -10px", padding: "10px 14px", borderRadius: "0 0 0 0" } : {}), }}><div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${C.brand}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: C.brand }}>↗</div><button type="button" className="focusable" style={{ fontSize: 12, color: C.brand, fontWeight: 500, cursor: "pointer", background: "transparent", border: "none", padding: 0 }}>{ja.common.createShareSheet}</button></div></div>;
}

function AiB({ children }) { return (<div style={{ alignSelf: "flex-start", background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: "9px 12px", fontSize: 12, color: C.text, lineHeight: 1.7, maxWidth: "82%" }}>{children}</div>); }
function UserB({ children }) { return (<div style={{ alignSelf: "flex-end", background: C.brandPale, borderRadius: R.card, padding: "9px 12px", fontSize: 12, color: C.text, lineHeight: 1.7, maxWidth: "82%" }}>{children}</div>); }
function SH({ children }) { return <div style={{ fontSize: 12, fontWeight: 600, color: C.textMeta, letterSpacing: "0.03em", paddingBottom: 6, borderBottom: `1px solid ${C.borderFaint}` }}>{children}</div>; }

function VerificationChecklist() {
  return (
    <div style={{ marginTop: 36, background: C.white, border: `1px solid ${C.border}`, borderRadius: R.card, padding: "20px 22px" }}>
      <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>{ja.checklist.title}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        {ja.checklist.breakpoints.map((bp) => (<div key={bp.width} style={{ border: `1px solid ${C.borderFaint}`, borderRadius: 10, padding: "12px 14px" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.brand, marginBottom: 8 }}>{bp.width}</div><ul style={{ margin: 0, paddingLeft: 16, display: "grid", gap: 6 }}>{bp.items.map((item) => (<li key={item} style={{ fontSize: 12, color: C.textSub, lineHeight: 1.6 }}>{item}</li>))}</ul></div>))}
      </div>
    </div>
  );
}
