export type Audience = "everyone" | "teachers" | "students" | "parents";
export type AnnouncementStatus = "draft" | "scheduled" | "published";

export interface AudienceMeta {
  id: Audience;
  label: string;
  color: string;
}

export const AUDIENCE_LIST: AudienceMeta[] = [
  { id: "everyone", label: "Everyone", color: "var(--accent-indigo)" },
  { id: "teachers", label: "Teachers", color: "var(--accent-sky)" },
  { id: "students", label: "Students", color: "var(--accent-emerald)" },
  { id: "parents", label: "Parents", color: "var(--accent-amber)" },
];

export const AUDIENCE_META = Object.fromEntries(
  AUDIENCE_LIST.map((a) => [a.id, a])
) as Record<Audience, AudienceMeta>;

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: Audience;
  status: AnnouncementStatus;
  pinned: boolean;
  author: string;
  date: string;
  scheduleFor?: string;
  views: number;
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => /[a-zA-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
