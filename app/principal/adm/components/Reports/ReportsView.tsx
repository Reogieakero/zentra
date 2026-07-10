"use client";

import React from "react";
import styles from "./ReportsView.module.css";
import ReportsStats from "./ReportsStats";
import ReportsList from "./ReportsList";

export default function ReportsView() {
  return (
    <div className={styles.wrapper}>
      <ReportsStats />
      <ReportsList />
    </div>
  );
}
