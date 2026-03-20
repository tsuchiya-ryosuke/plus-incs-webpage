/**
 * StudentFlow / TeacherScreens で使用する共有シート関連型。
 * docs/CHAT_SHEET_FLOW_SPEC.md の仕様を実装側に同期するための定義。
 */

export type ChatFlowState =
  | "chat_idle"
  | "chat_suggested"
  | "sheet_preview"
  | "sheet_submitting"
  | "sheet_submitted";

export type TeacherFlowState =
  | "teacher_list"
  | "teacher_detail_unread"
  | "teacher_detail_read";

export type SheetStatus = "draft" | "preview" | "submitted" | "read";

export type SubmissionStatus =
  | "idle"
  | "ready"
  | "submitting"
  | "succeeded"
  | "failed";

export type Highlight = "normal" | "emphasized";

/** Teacher list item の新着フラグ。 */
export type IsNew = boolean;

export interface Student {
  id: string;
  name: string;
  className: string;
}

export interface Message {
  id: string;
  role: "student" | "assistant" | "teacher" | "system";
  text: string;
  createdAt: string; // ISO8601
}

export interface SheetSummary {
  targetField: string;
  currentScore: string;
  concern: string;
  aiInsight: string;
}

export interface Sheet {
  id: string;
  studentId: string;
  title: string;
  summary: SheetSummary;
  sheetStatus: SheetStatus;
  submissionStatus: SubmissionStatus;
  isNew: IsNew;
  submittedAt?: string; // ISO8601
  readAt?: string; // ISO8601
  sourceMessageIds: string[];
}

export interface ChatSheetResponse {
  student: Student;
  sheet: Sheet;
  messages: Message[];
}

export const TEACHER_LIST_SORT_RULE = {
  primary: "isNew desc",
  secondary: "submittedAt desc",
  tieBreaker: "studentId asc",
} as const;
