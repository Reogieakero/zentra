import React from "react";
import styles from "./MetricCard.module.css";

interface MetricProps {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}

export function MetricCard({ label, value, color, icon }: MetricProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.metricHeader}>
        <span className={styles.metricLabel}>{label}</span>
        <div style={{ color }}>{icon}</div>
      </div>
      <div className={styles.metricValue} style={{ color }}>{value}</div>
      <div className={styles.metricSub}>+2.4% this month</div>
    </div>
  );
}