"use client";

import React from "react";
import styles from "./StudentStats.module.css";

interface Stats {
  total: number;
  enrolled: number;
  atRisk: number;
  avgGpa: string;
}

interface StudentStatsProps {
  stats: Stats;
  visible: boolean;
  statusFilter: string;
  riskFilter: boolean;
  onShowAll: () => void;
  onShowEnrolled: () => void;
  onShowAtRisk: () => void;
}

export function StudentStats({
  stats,
  visible,
  statusFilter,
  riskFilter,
  onShowAll,
  onShowEnrolled,
  onShowAtRisk,
}: StudentStatsProps) {
  return (
    <div className={`${styles.statsWrapper} ${visible ? styles.statsWrapperVisible : ""}`}>
      <div className={styles.statsGrid}>
        <div
          className={`${styles.statCard} ${statusFilter === "All Status" && !riskFilter ? styles.statCardActive : ""}`}
          onClick={onShowAll}
        >
          <ChromeDots active={statusFilter === "All Status" && !riskFilter} />
          <span className={styles.statLbl}>Total Students</span>
          <span className={styles.statVal}>{stats.total}</span>
        </div>

        <div
          className={`${styles.statCard} ${statusFilter === "Enrolled" ? styles.statCardActive : ""}`}
          onClick={onShowEnrolled}
        >
          <ChromeDots active={statusFilter === "Enrolled"} />
          <span className={styles.statLbl}>Enrolled</span>
          <span className={`${styles.statVal} ${styles.statValGreen}`}>{stats.enrolled}</span>
        </div>

        <div
          className={`${styles.statCard} ${riskFilter ? styles.statCardActive : ""}`}
          onClick={onShowAtRisk}
        >
          <ChromeDots active={riskFilter} />
          <span className={styles.statLbl}>Students At Risk</span>
          <span className={`${styles.statVal} ${styles.statValRed}`}>{stats.atRisk}</span>
        </div>

        <div className={`${styles.statCard} ${styles.statCardStatic}`}>
          <ChromeDots active={false} />
          <span className={styles.statLbl}>Average GPA</span>
          <span className={`${styles.statVal} ${styles.statValBrand}`}>{stats.avgGpa}</span>
        </div>
      </div>
    </div>
  );
}

function ChromeDots({ active }: { active: boolean }) {
  return (
    <div className={styles.chromeDots}>
      <div className={`${styles.dot} ${active ? styles.dotRed : ""}`} />
      <div className={`${styles.dot} ${active ? styles.dotYellow : ""}`} />
      <div className={`${styles.dot} ${active ? styles.dotGreen : ""}`} />
    </div>
  );
}