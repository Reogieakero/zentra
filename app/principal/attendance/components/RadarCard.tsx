"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./RadarCard.module.css";

interface RadarRow {
  subject: string;
  value: number;
}

const radarData: RadarRow[] = [
  { subject: "Grade 7", value: 92 },
  { subject: "Grade 8", value: 87 },
  { subject: "Grade 9", value: 95 },
  { subject: "Grade 10", value: 78 },
  { subject: "Grade 11", value: 88 },
  { subject: "Grade 12", value: 91 },
];

export function RadarCard() {
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
        <RadarChart data={radarData} outerRadius={80}>
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