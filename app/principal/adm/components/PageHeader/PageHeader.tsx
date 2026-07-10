"use client";

import React from "react";
import { Download, Plus } from "lucide-react";
import styles from "./PageHeader.module.css";

export default function PageHeader() {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerLeft}>
        <h1 className={styles.pageTitle}>Principal – ADM Dashboard</h1>
        <p className={styles.pageSubtitle}>
          Monitor Alternative Delivery Mode pipelines, process entry paths, and view track statuses.
        </p>
      </div>
      <div className={styles.headerActions}>
        <button className={styles.btnOutline}>
          <Download size={16} />
          Import Track
        </button>
        <button className={styles.btnPrimary}>
          <Plus size={16} />
          New ADM Entry
        </button>
      </div>
    </div>
  );
}
