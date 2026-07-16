import { useMemo } from "react";
import type { GradeRow, GradeStat, DayTotal } from "@/app/(dashboard)/principal/attendance/_components/attendanceline/types";
import { grades } from "@/app/(dashboard)/principal/attendance/_components/attendanceline/constants";

interface AnalyticsProps {
  data: GradeRow[];
  gradeStats: GradeStat[];
  dayTotals: DayTotal[];
}

export function useAttendanceAnalytics({ data, gradeStats, dayTotals }: AnalyticsProps) {
  return useMemo(() => {
    // Identify top metrics
    const highestDay = dayTotals.reduce((best, d) => (d.total > best.total ? d : best));
    const lowestDay = dayTotals.reduce((best, d) => (d.total < best.total ? d : best));
    const leadingGrade = gradeStats.reduce((best, g) => (g.avg > best.avg ? g : best));

    // Calculate dynamic graph range limits
    const allVals = grades.flatMap((g) => data.map((r) => r[g]));
    const minVal = Math.floor(Math.min(...allVals) / 10) * 10 - 8;
    const maxVal = Math.ceil(Math.max(...allVals) / 10) * 10 + 4;
    const chartMin = Math.min(...allVals) - 5;
    const chartMax = Math.max(...allVals) + 5;

    const days = dayTotals.map((d) => d.day);

    return {
      highestDay,
      lowestDay,
      leadingGrade,
      minVal,
      maxVal,
      chartMin,
      chartMax,
      days,
    };
  }, [data, gradeStats, dayTotals]);
}