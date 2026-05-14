"use client";

import React, { useState } from "react";
import styles from "./ActivityFeed.module.css";

interface Activity {
  id: number;
  color: string;
  tag: string;
  detail: string;
  time: string;
}

const ACTIVITIES: Activity[] = [
  { id: 1, color: "var(--accent-emerald)", tag: "ENROLLMENT", detail: "Maria Santos enrolled in Grade 10 — Section Rizal",        time: "09:42:11" },
  { id: 2, color: "var(--accent-indigo)",  tag: "SF10",       detail: "Academic records updated — Section A, Grade 10",           time: "09:27:04" },
  { id: 3, color: "var(--accent-violet)",  tag: "ADM",        detail: "ID #2024-001 approved and verified by registrar",           time: "08:55:38" },
  { id: 4, color: "var(--accent-sky)",     tag: "SF10",       detail: "Juan Dela Cruz records updated — Grade 8, Section Mabini",  time: "08:31:20" },
  { id: 5, color: "var(--accent-teal)",    tag: "ENROLLMENT", detail: "Ana Reyes enrolled in Grade 7 — Section Bonifacio",         time: "07:58:47" },
  { id: 6, color: "var(--accent-pink)",    tag: "ADM",        detail: "ID #2024-002 approved and verified by registrar",           time: "07:14:02" },
  { id: 7, color: "var(--accent-amber)",   tag: "SF10",       detail: "Bulk document request export processed for Senior High",   time: "06:45:12" },
  { id: 8, color: "var(--accent-emerald)", tag: "ENROLLMENT", detail: "Pedro Penduko verified transfer requirements documents",       time: "06:12:00" },
];

const TAG_COLORS: Record<string, string> = {
  ENROLLMENT: "var(--accent-emerald)",
  SF10:       "var(--accent-indigo)",
  ADM:        "var(--accent-violet)",
};

export function ActivityFeed() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Activity Logs</h2>
        <span className={styles.count}>{ACTIVITIES.length} events today</span>
      </div>

      {/* Outer scroll manager wrapper */}
      <div className={styles.tableContainer}>
        <table className={styles.logTable}>
          <thead>
            <tr>
              <th className={`${styles.logHeaderCell} ${styles.colTime}`}>time</th>
              <th className={`${styles.logHeaderCell} ${styles.colTag}`}>event</th>
              <th className={`${styles.logHeaderCell} ${styles.colMsg}`}>message</th>
            </tr>
          </thead>
          <tbody>
            {ACTIVITIES.map((a) => (
              <tr
                key={a.id}
                className={`${styles.logRow} ${hovered === a.id ? styles.logRowHovered : ""}`}
                onMouseEnter={() => setHovered(a.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <td className={`${styles.logCell} ${styles.colTime}`}>{a.time}</td>
                <td className={`${styles.logCell} ${styles.colTag}`}>
                  <span 
                    className={styles.tag} 
                    style={{ 
                      color: TAG_COLORS[a.tag] ?? "var(--text-secondary)", 
                      borderColor: TAG_COLORS[a.tag] ?? "var(--border-subtle)" 
                    }}
                  >
                    {a.tag}
                  </span>
                </td>
                <td className={`${styles.logCell} ${styles.colMsg}`}>{a.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}