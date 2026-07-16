export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
export type Grade = "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12";

export interface GradeRow {
  day: Day;
  "Grade 7": number;
  "Grade 8": number;
  "Grade 9": number;
  "Grade 10": number;
  "Grade 11": number;
  "Grade 12": number;
}

export interface GradeStat {
  grade: Grade;
  avg: number;
  peak: number;
  peakDay: Day;
  low: number;
  lowDay: Day;
  trend: number;
  vals: number[];
}

export interface DayTotal {
  day: Day;
  total: number;
  date: string;
}

export interface AttendanceBar {
  type: "present" | "late" | "absent" | "break";
  flex: number;
  label: string;
}

export interface AttendanceDay {
  label: string;
  clockIn: string;
  clockOut: string;
  duration: string;
  approved?: boolean;
  late?: boolean;
  bars: AttendanceBar[];
}
