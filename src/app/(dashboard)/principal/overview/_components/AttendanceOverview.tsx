"use client";

import React, { useState, useMemo } from "react";
import styles from "./AttendanceOverview.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type View = "daily" | "monthly";

const DAILY_DATA = [
  { label: "Mon", attendance: 94 },
  { label: "Tue", attendance: 91 },
  { label: "Wed", attendance: 96 },
  { label: "Thu", attendance: 88 },
  { label: "Fri", attendance: 92 },
  { label: "Mon", attendance: 95 },
  { label: "Tue", attendance: 90 },
  { label: "Wed", attendance: 93 },
  { label: "Thu", attendance: 87 },
  { label: "Fri", attendance: 94 },
];

const MONTHLY_DATA = [
  { label: "Jun", attendance: 91 },
  { label: "Jul", attendance: 88 },
  { label: "Aug", attendance: 93 },
  { label: "Sep", attendance: 95 },
  { label: "Oct", attendance: 90 },
  { label: "Nov", attendance: 87 },
  { label: "Dec", attendance: 78 },
  { label: "Jan", attendance: 92 },
  { label: "Feb", attendance: 94 },
  { label: "Mar", attendance: 96 },
  { label: "Apr", attendance: 91 },
  { label: "May", attendance: 93 },
];

export function AttendanceOverview() {
  const [view, setView] = useState<View>("daily");

  const data = view === "daily" ? DAILY_DATA : MONTHLY_DATA;

  const summary = useMemo(() => {
    const values = data.map((d) => d.attendance);
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    const peak = Math.max(...values);
    const low = Math.min(...values);
    return { avg, peak, low };
  }, [data]);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Attendance Overview</h2>
          <p className={styles.subtitle}>
            Avg <strong>{summary.avg}%</strong> &nbsp;·&nbsp;
            Peak <strong>{summary.peak}%</strong> &nbsp;·&nbsp;
            Low <strong>{summary.low}%</strong>
          </p>
        </div>
        <div className={styles.toggleGroup}>
          <button
            className={`${styles.toggleBtn} ${view === "daily" ? styles.toggleActive : ""}`}
            onClick={() => setView("daily")}
          >
            Daily
          </button>
          <button
            className={`${styles.toggleBtn} ${view === "monthly" ? styles.toggleActive : ""}`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[70, 100]}
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid var(--border-base)",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [`${value}%`, "Attendance"] as [string, string]}
            />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="var(--brand-primary)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "var(--brand-primary)", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "var(--brand-primary)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}