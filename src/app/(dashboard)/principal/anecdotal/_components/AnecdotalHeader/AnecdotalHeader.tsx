"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import styles from "./AnecdotalHeader.module.css";

interface AnecdotalHeaderProps {
  activeTab: string;
}

export function AnecdotalHeader({ activeTab }: AnecdotalHeaderProps) {
  const primaryLabel =
    activeTab === "behavior" ? "New Behavior Report" :
    activeTab === "guidance" ? "Add Guidance Note" :
    activeTab === "incidents" ? "Report Incident" :
    activeTab === "observations" ? "New Observation" :
    null;

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.pageTitle}>Anecdotal Records</h1>
        <p className={styles.pageSubtitle}>
          Manage behavior reports, guidance notes, incident records, and student observations.
        </p>
      </div>
      <div className={styles.headerActions}>
        {primaryLabel && (
          <Button variant="primary" size="sm">
            {primaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
