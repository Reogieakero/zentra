import type { GradeRow, Grade } from "@/types/attendance";

export const grades: Grade[] = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

export const GRADE_COLORS: Record<Grade, string> = {
  "Grade 7": "#15803d",
  "Grade 8": "#0891b2",
  "Grade 9": "#d97706",
  "Grade 10": "#059669",
  "Grade 11": "#e11d48",
  "Grade 12": "#4f46e5",
};

export const GRADE_SHORT: Record<Grade, string> = {
  "Grade 7": "G7", "Grade 8": "G8", "Grade 9": "G9",
  "Grade 10": "G10", "Grade 11": "G11", "Grade 12": "G12",
};

const dataByDate: Record<string, GradeRow[]> = {
  "2025-05-16": [
    { day: "Mon", "Grade 7": 112, "Grade 8": 98,  "Grade 9": 105, "Grade 10": 89,  "Grade 11": 76,  "Grade 12": 68 },
    { day: "Tue", "Grade 7": 118, "Grade 8": 104, "Grade 9": 99,  "Grade 10": 95,  "Grade 11": 80,  "Grade 12": 72 },
    { day: "Wed", "Grade 7": 105, "Grade 8": 91,  "Grade 9": 110, "Grade 10": 88,  "Grade 11": 74,  "Grade 12": 65 },
    { day: "Thu", "Grade 7": 120, "Grade 8": 107, "Grade 9": 102, "Grade 10": 93,  "Grade 11": 82,  "Grade 12": 70 },
    { day: "Fri", "Grade 7": 95,  "Grade 8": 85,  "Grade 9": 90,  "Grade 10": 78,  "Grade 11": 65,  "Grade 12": 58 },
  ],
  "2025-05-15": [
    { day: "Mon", "Grade 7": 108, "Grade 8": 95,  "Grade 9": 101, "Grade 10": 86,  "Grade 11": 73,  "Grade 12": 65 },
    { day: "Tue", "Grade 7": 115, "Grade 8": 100, "Grade 9": 97,  "Grade 10": 91,  "Grade 11": 78,  "Grade 12": 69 },
    { day: "Wed", "Grade 7": 100, "Grade 8": 88,  "Grade 9": 106, "Grade 10": 84,  "Grade 11": 71,  "Grade 12": 62 },
    { day: "Thu", "Grade 7": 117, "Grade 8": 103, "Grade 9": 99,  "Grade 10": 90,  "Grade 11": 79,  "Grade 12": 67 },
    { day: "Fri", "Grade 7": 90,  "Grade 8": 81,  "Grade 9": 87,  "Grade 10": 74,  "Grade 11": 62,  "Grade 12": 55 },
  ],
};

export const fallback: GradeRow[] = dataByDate["2025-05-16"];

export function getAttendanceData(dateStr: string | null): GradeRow[] {
  if (!dateStr) return fallback;
  return dataByDate[dateStr] ?? fallback;
}
