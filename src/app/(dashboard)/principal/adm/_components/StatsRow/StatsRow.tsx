"use client";

import React from "react";
import styles from "./StatsRow.module.css";
import { summaryCards } from "../../_data/mockData";

export default function StatsRow() {
  return (
    <section className={styles.statsRow}>
      {summaryCards.map((card, idx) => (
        <div
          key={idx}
          className={styles.statItem}
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          <div className={styles.statLabel}>{card.label}</div>
          <div className={styles.statValueGroup}>
            <span className={styles.statValue}>{card.value}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
