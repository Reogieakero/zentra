"use client";

import React from "react";
import { FileText, ChevronRight } from "lucide-react";
import styles from "./QuickReports.module.css";
import { quickReports } from "../../_data/mockData";

export default function QuickReports() {
  return (
    <div className={`${styles.cardContainer} ${styles.fadeInUp}`} style={{ animationDelay: "0.5s" }}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Quick Reports</h2>
      </div>
      <div className={styles.rowList}>
        {quickReports.map((rep, i) => (
          <div key={i} className={`${styles.rowItem} ${styles.clickableRow}`}>
            <div className={styles.rowItemLeft}>
              <FileText size={15} className={styles.rowIconColor} />
              <div className={styles.rowItemTitle}>{rep.name}</div>
            </div>
            <div className={styles.reportRightTrigger}>
              <span className={styles.rowItemSub} style={{ fontWeight: 500 }}>{rep.count}</span>
              <ChevronRight size={14} className={styles.chevronIcon} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
