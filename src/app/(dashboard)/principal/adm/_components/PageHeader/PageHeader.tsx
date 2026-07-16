"use client";

import React from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <Button className={styles.btnOutline} variant="outline" size="sm">
          Import Track
        </Button>
        <Button className={styles.btnPrimary} variant="primary" size="sm">
          New ADM Entry
        </Button>
      </div>
    </div>
  );
}
