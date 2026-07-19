"use client";

import React, { useMemo } from "react";
import styles from "./InterventionStats.module.css";
import { AtRiskStudent } from "./data";
import { UsersFlaggedIcon, AlertTriangleIcon, CalendarClockIcon, TrendDownIcon } from "./Icons";

interface Props {
  students: AtRiskStudent[];
}

export function InterventionStats({ students }: Props) {
  const stats = useMemo(() => {
    const total = students.length;
    const high = students.filter((s) => s.risk === "high").length;
    const medium = total - high;
    const noIntervention = students.filter((s) => !s.lastIntervention).length;
    const avgGpa = total ? Math.round(students.reduce((a, s) => a + s.gpa, 0) / total) : 0;
    return { total, high, medium, noIntervention, avgGpa };
  }, [students]);

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.label}>Total Flagged</span>
          <div className={styles.iconWrap} style={{ background: "var(--bg-purple-tint, #f5f3ff)", color: "var(--text-purple, #6d28d9)" }}>
            <UsersFlaggedIcon />
          </div>
        </div>
        <div className={styles.value}>{stats.total}</div>
        <div className={styles.sub}>students on watch this term</div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.label}>High Risk</span>
          <div className={styles.iconWrap} style={{ background: "var(--bg-red-tint, #fef2f2)", color: "var(--text-red, #dc2626)" }}>
            <AlertTriangleIcon />
          </div>
        </div>
        <div className={styles.value} style={{ color: "var(--text-red, #dc2626)" }}>{stats.high}</div>
        <div className={styles.sub}>need action this week</div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.label}>Awaiting First Contact</span>
          <div className={styles.iconWrap} style={{ background: "var(--bg-amber-tint, #fffbeb)", color: "var(--text-amber, #d97706)" }}>
            <CalendarClockIcon />
          </div>
        </div>
        <div className={styles.value} style={{ color: "var(--text-amber, #d97706)" }}>{stats.noIntervention}</div>
        <div className={styles.sub}>no logged intervention yet</div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.label}>Avg. GPA (flagged)</span>
          <div className={styles.iconWrap} style={{ background: "var(--bg-green-tint)", color: "var(--brand-primary)" }}>
            <TrendDownIcon />
          </div>
        </div>
        <div className={styles.value}>{stats.avgGpa}</div>
        <div className={styles.sub}>vs. 85 school-wide average</div>
      </div>
    </div>
  );
}
