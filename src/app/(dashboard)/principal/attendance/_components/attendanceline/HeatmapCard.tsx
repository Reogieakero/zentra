"use client";

import { grades, dataByDate, fallback, GRADE_COLORS } from "./constants";
import { toDateStr, buildDayDateMap, buildGradeStats, buildDayTotals } from "./utils";
import { ChartCard } from "./ChartCard";
import { AttendanceReport } from "./AttendanceReport";

interface HeatmapCardProps {
  selectedDate: Date | null;
  onOpenReport?: () => void;
  isReportActive?: boolean;
}

export function HeatmapCard({
  selectedDate,
  onOpenReport,
  isReportActive,
}: HeatmapCardProps) {
  const key  = toDateStr(selectedDate);
  const data = key && dataByDate[key] ? dataByDate[key] : fallback;

  const dayDateMap  = buildDayDateMap(selectedDate);
  const gradeStats  = buildGradeStats(data);
  const dayTotals   = buildDayTotals(data, dayDateMap);
  const grandTotal  = dayTotals.reduce((s, d) => s + d.total, 0);

  const highGrade = grades.reduce((best, g) => {
    const avg     = data.reduce((s, r) => s + r[g], 0) / data.length;
    const bestAvg = data.reduce((s, r) => s + r[best], 0) / data.length;
    return avg > bestAvg ? g : best;
  }, grades[0]);

  const weekLabel = selectedDate
    ? `Week of ${new Date(selectedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`
    : "Current Week";

  if (isReportActive) {
    return (
      <AttendanceReport
        data={data}
        dayDateMap={dayDateMap}
        gradeStats={gradeStats}
        dayTotals={dayTotals}
        grandTotal={grandTotal}
        weekLabel={weekLabel}
        onBack={() => onOpenReport?.()}
      />
    );
  }

  return (
    <ChartCard
      data={data}
      dayDateMap={dayDateMap}
      highGrade={highGrade}
      onOpenReport={onOpenReport}
    />
  );
}