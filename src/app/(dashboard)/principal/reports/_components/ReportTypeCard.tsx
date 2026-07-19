"use client";

import React from "react";
import styles from "./ReportTypeCard.module.css";

interface ReportTypeCardProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  selected: boolean;
  onSelect: () => void;
}

export function ReportTypeCard({
  label,
  description,
  icon,
  color,
  count,
  selected,
  onSelect,
}: ReportTypeCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.cardSelected : ""}`}
      style={selected ? ({ "--card-accent": color } as React.CSSProperties) : undefined}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className={styles.iconWrap} style={{ color }}>
        {icon}
      </div>
      <div className={styles.textWrap}>
        <span className={styles.label}>{label}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <span className={styles.count}>{count}</span>
    </button>
  );
}
