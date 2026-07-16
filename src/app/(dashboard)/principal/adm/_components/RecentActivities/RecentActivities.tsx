"use client";

import React from "react";
import styles from "./RecentActivities.module.css";
import { recentActivities } from "../../_data/mockData";

export default function RecentActivities() {
  return (
    <div className={`${styles.cardContainer} ${styles.fadeInUp}`} style={{ animationDelay: "0.4s" }}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Recent ADM Activities</h2>
      </div>
      <div className={styles.rowList}>
        {recentActivities.map((act, i) => (
          <div key={i} className={styles.rowItem}>
            <div className={styles.rowItemLeft}>
              <div className={styles.activityMarkerNode} />
              <div>
                <div className={styles.rowItemTitle}>{act.text}</div>
                <div className={styles.rowItemSub}>{act.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
