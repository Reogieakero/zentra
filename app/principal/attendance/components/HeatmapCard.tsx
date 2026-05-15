"use client";

import styles from "./HeatmapCard.module.css";

type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

interface HeatRow {
  time: string;
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
}

const heatmapData: HeatRow[] = [
  { time: "07:00", Mon: 3, Tue: 2, Wed: 1, Thu: 2, Fri: 1 },
  { time: "07:30", Mon: 7, Tue: 6, Wed: 8, Thu: 5, Fri: 4 },
  { time: "08:00", Mon: 9, Tue: 9, Wed: 9, Thu: 8, Fri: 7 },
  { time: "08:30", Mon: 5, Tue: 6, Wed: 4, Thu: 7, Fri: 6 },
  { time: "09:00", Mon: 2, Tue: 3, Wed: 2, Thu: 3, Fri: 5 },
];

const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function intensityColor(v: number): string {
  if (v >= 8) return "#7c3aed";
  if (v >= 6) return "#a78bfa";
  if (v >= 4) return "#c4b5fd";
  if (v >= 2) return "#ede9fe";
  return "#f5f3ff";
}

export function HeatmapCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Arrival Heatmap</div>
          <div className={styles.cardSub}>Real-time student arrival density</div>
        </div>
        <button className={styles.moreBtn}>···</button>
      </div>
      <div className={styles.heatmap}>
        <div className={styles.heatDays}>
          <span />
          {days.map((d) => (
            <span key={d} className={styles.heatDayLabel}>{d}</span>
          ))}
        </div>
        {heatmapData.map((row) => (
          <div key={row.time} className={styles.heatRow}>
            <span className={styles.heatTimeLabel}>{row.time}</span>
            {days.map((d) => {
              const val = row[d];
              return (
                <div
                  key={d}
                  className={styles.heatCell}
                  style={{ background: intensityColor(val) }}
                  title={`${row.time} ${d}: ${val} arrivals`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}