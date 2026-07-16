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
  
  const cardData = [
    {
      label: "Total Students",
      value: stats.total,
      path: "stats/all-students",
      color: "#16a34a", // Green
      active: statusFilter === "All Status" && !riskFilter,
      onClick: onShowAll,
    },
    {
      label: "Enrolled",
      value: stats.enrolled,
      path: "stats/enrolled",
      color: "#10b981", // Green
      active: statusFilter === "Enrolled",
      onClick: onShowEnrolled,
    },
    {
      label: "Students At Risk",
      value: stats.atRisk,
      path: "stats/at-risk",
      color: "#ef4444", // Red
      active: riskFilter,
      onClick: onShowAtRisk,
    },
    {
      label: "Average GPA",
      value: stats.avgGpa,
      path: "stats/academic-performance",
      color: "#0ea5e9", // Blue
      active: false,
      isStatic: true,
      onClick: () => {},
    }
  ];

  return (
    <div className={`${styles.statsWrapper} ${visible ? styles.statsWrapperVisible : ""}`}>
      <div className={styles.statsGrid}>
        {cardData.map((card) => (
          <div
            key={card.label}
            className={`${styles.statCard} ${card.active ? styles.statCardActive : ""} ${card.isStatic ? styles.statCardStatic : ""}`}
            onClick={card.onClick}
            style={{
              boxShadow: card.active 
                ? `0 12px 48px ${card.color}25, 0 2px 12px rgba(0,0,0,0.08)`
                : `0 8px 32px rgba(0,0,0,0.04)`,
              border: `1px solid ${card.active ? `${card.color}44` : 'var(--border-subtle)'}`,
            }}
          >
            {/* Browser Chrome Header */}
            <div
              className={styles.chromeHeader}
              style={{
                background: `${card.color}08`,
                borderBottom: `1px solid ${card.color}15`,
              }}
            >
              <span className={`${styles.chromeDot} ${styles.dotRed}`} />
              <span className={`${styles.chromeDot} ${styles.dotYellow}`} />
              <span className={`${styles.chromeDot} ${styles.dotGreen}`} />
              <div
                className={styles.chromeAddressBar}
                style={{ background: `${card.color}10` }}
              >
                <span
                  className={styles.chromeAddressText}
                  style={{ color: `${card.color}99` }}
                >
                  zentra.app / {card.path}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className={styles.cardBody}>
              <span className={styles.statLbl} style={{ color: card.active ? card.color : 'var(--text-muted)' }}>
                {card.label}
              </span>
              <span className={styles.statVal} style={{ color: card.active ? card.color : 'var(--text-primary)' }}>
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}