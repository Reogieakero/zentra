"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./BarCard.module.css";

interface BarRow { grade: string; present: number; absent: number; }

const dataByDate: Record<string, BarRow[]> = {
  "2025-05-16": [
    { grade: "G7",  present: 210, absent: 18 },
    { grade: "G8",  present: 195, absent: 27 },
    { grade: "G9",  present: 228, absent: 12 },
    { grade: "G10", present: 178, absent: 48 },
    { grade: "G11", present: 202, absent: 30 },
    { grade: "G12", present: 215, absent: 21 },
  ],
  "2025-05-15": [
    { grade: "G7",  present: 205, absent: 23 },
    { grade: "G8",  present: 188, absent: 34 },
    { grade: "G9",  present: 220, absent: 20 },
    { grade: "G10", present: 170, absent: 56 },
    { grade: "G11", present: 198, absent: 34 },
    { grade: "G12", present: 210, absent: 26 },
  ],
  "2025-05-14": [
    { grade: "G7",  present: 218, absent: 10 },
    { grade: "G8",  present: 200, absent: 22 },
    { grade: "G9",  present: 232, absent: 8  },
    { grade: "G10", present: 185, absent: 41 },
    { grade: "G11", present: 208, absent: 24 },
    { grade: "G12", present: 219, absent: 17 },
  ],
};

const fallback: BarRow[] = [
  { grade: "G7",  present: 210, absent: 18 },
  { grade: "G8",  present: 195, absent: 27 },
  { grade: "G9",  present: 228, absent: 12 },
  { grade: "G10", present: 178, absent: 48 },
  { grade: "G11", present: 202, absent: 30 },
  { grade: "G12", present: 215, absent: 21 },
];

const toDateStr = (date: Date | null) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface BarCardProps {
  selectedDate: Date | null;
}

export function BarCard({ selectedDate }: BarCardProps) {
  const key = toDateStr(selectedDate);
  const data = (key && dataByDate[key]) ? dataByDate[key] : fallback;
  const total = data.reduce((s, r) => s + r.present + r.absent, 0);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Grade Attendance Distribution</div>
          <div className={styles.cardSub}>Present vs absent per grade</div>
        </div>
        <button className={styles.moreBtn}>···</button>
      </div>
      <div className={styles.totalRow}>
        <span className={styles.totalCount}>{total.toLocaleString()}</span>
        <span className={styles.totalLabel}>Total enrolled students</span>
      </div>
      <div className={styles.legend}>
        <span className={styles.legendDot} style={{ background: "#7c3aed" }} />
        Present
        <span className={styles.legendDot} style={{ background: "#c4b5fd", marginLeft: "1rem" }} />
        Absent
      </div>
      {/* Wrapped in a responsive layout container with height updated to 100% */}
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2}>
            <XAxis dataKey="grade" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(124,58,237,0.06)" }}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
            />
            <Bar dataKey="present" radius={[4, 4, 0, 0]} fill="#7c3aed" />
            <Bar dataKey="absent"  radius={[4, 4, 0, 0]} fill="#c4b5fd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}