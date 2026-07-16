import React from "react";
import styles from "./ActivityItem.module.css";

interface ActivityProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
  time: string;
}

export function ActivityItem({ icon, title, detail, time }: ActivityProps) {
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityIcon}>{icon}</div>
      <div className={styles.activityContent}>
        <p className={styles.activityTitle}><strong>{title}</strong></p>
        <p className={styles.activityDetail}>{detail}</p>
        <span className={styles.activityTime}>{time}</span>
      </div>
    </div>
  );
}