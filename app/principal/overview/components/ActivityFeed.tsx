"use client";

import React, { useState } from "react";
import styles from "./ActivityFeed.module.css";
import * as Icons from "./Icons";

interface Activity {
  id: number;
  icon: React.ReactNode;
  color: string;
  tag: string;
  detail: string;
  time: string;
}

const ACTIVITIES: Activity[] = [
  { id: 1, icon: <Icons.PlusIcon />,  color: "var(--accent-emerald)", tag: "ENROLLMENT", detail: "Maria Santos enrolled in Grade 10 — Section Rizal",        time: "09:42:11" },
  { id: 2, icon: <Icons.EditIcon />,  color: "var(--accent-indigo)",  tag: "SF10",       detail: "Academic records updated — Section A, Grade 10",           time: "09:27:04" },
  { id: 3, icon: <Icons.CheckIcon />, color: "var(--accent-violet)",  tag: "ADM",        detail: "ID #2024-001 approved and verified by registrar",           time: "08:55:38" },
  { id: 4, icon: <Icons.EditIcon />,  color: "var(--accent-sky)",     tag: "SF10",       detail: "Juan Dela Cruz records updated — Grade 8, Section Mabini",  time: "08:31:20" },
  { id: 5, icon: <Icons.PlusIcon />,  color: "var(--accent-teal)",    tag: "ENROLLMENT", detail: "Ana Reyes enrolled in Grade 7 — Section Bonifacio",         time: "07:58:47" },
  { id: 6, icon: <Icons.CheckIcon />, color: "var(--accent-pink)",    tag: "ADM",        detail: "ID #2024-002 approved and verified by registrar",           time: "07:14:02" },
];

const TAG_COLORS: Record<string, string> = {
  ENROLLMENT: "var(--accent-emerald)",
  SF10:       "var(--accent-indigo)",
  ADM:        "var(--accent-violet)",
};

export function ActivityFeed() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Activity Logs</h2>
        <span className={styles.count}>{ACTIVITIES.length} events today</span>
      </div>

      <div className={styles.logList}>
        <div className={styles.logHeader}>
          <span className={styles.colTime}>time</span>
          <span className={styles.colTag}>event</span>
          <span className={styles.colMsg}>message</span>
        </div>

        {ACTIVITIES.map((a) => (
          <div
            key={a.id}
            className={`${styles.logRow} ${hovered === a.id ? styles.logRowHovered : ""}`}
            onMouseEnter={() => setHovered(a.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={styles.colTime}>{a.time}</span>
            <span className={styles.colTag}>
              <span className={styles.tag} style={{ color: TAG_COLORS[a.tag] ?? "var(--text-secondary)", borderColor: TAG_COLORS[a.tag] ?? "var(--border-subtle)" }}>
                {a.tag}
              </span>
            </span>
            <span className={styles.colMsg}>{a.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}