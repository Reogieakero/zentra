"use client";

import { useState, useMemo } from "react";

type View = "daily" | "monthly";

const DAILY_DATA = [
  { label: "Mon", attendance: 94 }, { label: "Tue", attendance: 91 },
  { label: "Wed", attendance: 96 }, { label: "Thu", attendance: 88 },
  { label: "Fri", attendance: 92 }, { label: "Mon", attendance: 95 },
  { label: "Tue", attendance: 90 }, { label: "Wed", attendance: 93 },
  { label: "Thu", attendance: 87 }, { label: "Fri", attendance: 94 },
];

const MONTHLY_DATA = [
  { label: "Jun", attendance: 91 }, { label: "Jul", attendance: 88 },
  { label: "Aug", attendance: 93 }, { label: "Sep", attendance: 95 },
  { label: "Oct", attendance: 90 }, { label: "Nov", attendance: 87 },
  { label: "Dec", attendance: 78 }, { label: "Jan", attendance: 92 },
  { label: "Feb", attendance: 94 }, { label: "Mar", attendance: 96 },
  { label: "Apr", attendance: 91 }, { label: "May", attendance: 93 },
];

export function useAttendanceOverview() {
  const [view, setView] = useState<View>("daily");
  const data = view === "daily" ? DAILY_DATA : MONTHLY_DATA;

  const summary = useMemo(() => {
    const values = data.map((d) => d.attendance);
    return {
      avg: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
      peak: Math.max(...values),
      low: Math.min(...values),
    };
  }, [data]);

  return { view, setView, data, summary };
}
