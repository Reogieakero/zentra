"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./BarCard.module.css";

interface BarRow {
  grade: string;
  present: number;
  absent: number;
}

const barData: BarRow[] = [
  { grade: "G7",  present: 210, absent: 18 },
  { grade: "G8",  present: 195, absent: 27 },
  { grade: "G9",  present: 228, absent: 12 },
  { grade: "G10", present: 178, absent: 48 },
  { grade: "G11", present: 202, absent: 30 },
  { grade: "G12", present: 215, absent: 21 },
];

export function BarCard() {
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
        <span className={styles.totalCount}>1,228</span>
        <span className={styles.totalLabel}>Total enrolled students</span>
      </div>
      <div className={styles.legend}>
        <span className={styles.legendDot} style={{ background: "#7c3aed" }} />
        Present
        <span className={styles.legendDot} style={{ background: "#c4b5fd", marginLeft: "1rem" }} />
        Absent
      </div>
      <ResponsiveContainer width="100%" height={110}>
        <BarChart data={barData} barGap={2}>
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
  );
}