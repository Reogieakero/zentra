"use client";

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import styles from "./RadarCard.module.css";

interface RadarRow { subject: string; value: number; }

const dataByDate: Record<string, RadarRow[]> = {
  "2025-05-16": [
    { subject: "Grade 7",  value: 92 },
    { subject: "Grade 8",  value: 87 },
    { subject: "Grade 9",  value: 95 },
    { subject: "Grade 10", value: 78 },
    { subject: "Grade 11", value: 88 },
    { subject: "Grade 12", value: 91 },
  ],
  "2025-05-15": [
    { subject: "Grade 7",  value: 89 },
    { subject: "Grade 8",  value: 82 },
    { subject: "Grade 9",  value: 91 },
    { subject: "Grade 10", value: 74 },
    { subject: "Grade 11", value: 85 },
    { subject: "Grade 12", value: 88 },
  ],
  "2025-05-14": [
    { subject: "Grade 7",  value: 94 },
    { subject: "Grade 8",  value: 90 },
    { subject: "Grade 9",  value: 88 },
    { subject: "Grade 10", value: 81 },
    { subject: "Grade 11", value: 92 },
    { subject: "Grade 12", value: 86 },
  ],
};

const fallback: RadarRow[] = [
  { subject: "Grade 7",  value: 90 },
  { subject: "Grade 8",  value: 85 },
  { subject: "Grade 9",  value: 93 },
  { subject: "Grade 10", value: 79 },
  { subject: "Grade 11", value: 87 },
  { subject: "Grade 12", value: 90 },
];

const toDateStr = (date: Date | null) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface RadarCardProps {
  selectedDate: Date | null;
}

export function RadarCard({ selectedDate }: RadarCardProps) {
  const key = toDateStr(selectedDate);
  const data = (key && dataByDate[key]) ? dataByDate[key] : fallback;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>School Attendance Overview</div>
          <div className={styles.cardSub}>Monthly rate by grade level</div>
        </div>
        <button className={styles.moreBtn}>···</button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={data} outerRadius={80}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#9ca3af" }} />
          <Radar
            dataKey="value"
            stroke="#7c3aed"
            fill="#7c3aed"
            fillOpacity={0.18}
            strokeWidth={2}
            dot={{ r: 4, fill: "#7c3aed" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}