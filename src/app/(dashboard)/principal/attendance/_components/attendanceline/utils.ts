import type { Day, Grade, GradeRow, GradeStat, DayTotal } from "./types";
import { grades } from "./constants";

export const toDateStr = (date: Date | null): string | null => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const DAY_OFFSET: Record<Day, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4 };

export function buildDayDateMap(selectedDate: Date | null): Record<Day, string> {
  const base = selectedDate ? new Date(selectedDate) : new Date();
  const jsDay = base.getDay();
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(base);
  monday.setDate(base.getDate() + diffToMonday);

  return (["Mon", "Tue", "Wed", "Thu", "Fri"] as Day[]).reduce((acc, day) => {
    const target = new Date(monday);
    target.setDate(monday.getDate() + DAY_OFFSET[day]);
    acc[day] = target.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return acc;
  }, {} as Record<Day, string>);
}

export function buildGradeStats(data: GradeRow[]): GradeStat[] {
  return grades.map((g: Grade) => {
    const vals = data.map((r) => r[g]);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const peak = Math.max(...vals);
    const peakDay = data[vals.indexOf(peak)].day;
    const low = Math.min(...vals);
    const lowDay = data[vals.indexOf(low)].day;
    const trend = vals[vals.length - 1] - vals[0];
    return { grade: g, avg, peak, peakDay, low, lowDay, trend, vals };
  });
}

export function buildDayTotals(
  data: GradeRow[],
  dayDateMap: Record<Day, string>
): DayTotal[] {
  const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return days.map((day) => {
    const row = data.find((r) => r.day === day)!;
    const total = grades.reduce((s, g) => s + row[g], 0);
    return { day, total, date: dayDateMap[day] };
  });
}

export function sparkPoints(
  vals: number[],
  chartMin: number,
  chartMax: number
): string {
  return vals
    .map((v, i) => {
      const x = (i / (vals.length - 1)) * 120;
      const y = 36 - ((v - chartMin) / (chartMax - chartMin)) * 36;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}