export type LogSeverity = "info" | "warning" | "error";

export type LogCategory =
  | "attendance"
  | "sf10"
  | "enrollment"
  | "adm"
  | "anecdotal"
  | "announcement"
  | "auth"
  | "system";

export interface CategoryMeta {
  id: LogCategory;
  label: string;
  color: string;
}

export const CATEGORY_LIST: CategoryMeta[] = [
  { id: "attendance", label: "Attendance", color: "var(--accent-emerald)" },
  { id: "sf10", label: "SF10", color: "var(--accent-indigo)" },
  { id: "enrollment", label: "Enrollment", color: "var(--accent-teal)" },
  { id: "adm", label: "ADM", color: "var(--accent-sky)" },
  { id: "anecdotal", label: "Anecdotal", color: "var(--accent-pink)" },
  { id: "announcement", label: "Announcement", color: "var(--accent-orange)" },
  { id: "auth", label: "Auth", color: "var(--accent-violet)" },
  { id: "system", label: "System", color: "var(--accent-amber)" },
];

export const CATEGORY_META = Object.fromEntries(
  CATEGORY_LIST.map((c) => [c.id, c])
) as Record<LogCategory, CategoryMeta>;

export interface LogEntry {
  id: string;
  timestamp: string;
  severity: LogSeverity;
  category: LogCategory;
  actor: string;
  action: string;
  details: string;
  ip: string;
}
