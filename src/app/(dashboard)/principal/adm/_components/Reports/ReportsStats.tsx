"use client";

import React from "react";
import styles from "./ReportsStats.module.css";
import { reportsStats } from "../../_data/mockData";

export default function ReportsStats() {
  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.cardTitle}>ADM Implementation Statistics</h2>
      <div className={styles.statsGrid}>
        {reportsStats.map((stat, idx) => (
          <div key={idx} className={styles.statItem}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
