"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./earlyintervention.module.css";
import { InterventionStats } from "./_components/InterventionStats";
import { StudentRiskTable } from "./_components/StudentRiskTable";
import { StudentDetailPanel } from "./_components/StudentDetailPanel";
import { ArrowLeftIcon } from "./_components/Icons";
import { AT_RISK_STUDENTS, AtRiskStudent } from "./_components/data";

export default function EarlyIntervention() {
  const [selected, setSelected] = useState<AtRiskStudent | null>(null);

  return (
    <div className={styles.container}>
      <header className={styles.headerArea}>
        <div>
          <Link href="/overview" className={styles.backLink}>
            <ArrowLeftIcon />
            Back to Overview
          </Link>
          <div className={styles.titleRow}>
            <span className={styles.pulseRing} />
            <h1 className={styles.pageTitle}>Early Intervention</h1>
          </div>
          <p className={styles.pageSubtitle}>
            Students flagged for attendance, academic, or behavioral support
          </p>
        </div>
      </header>

      <InterventionStats students={AT_RISK_STUDENTS} />

      <StudentRiskTable students={AT_RISK_STUDENTS} onSelect={setSelected} />

      {selected && <StudentDetailPanel student={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
