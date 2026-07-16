"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { AnecdotalHeader } from "./_components/AnecdotalHeader/AnecdotalHeader";
import { AnecdotalTabs } from "./_components/AnecdotalTabs/AnecdotalTabs";
import { DashboardView } from "./_components/DashboardView/DashboardView";
import { BehaviorReports } from "./_components/BehaviorReports/BehaviorReports";
import { GuidanceNotes } from "./_components/GuidanceNotes/GuidanceNotes";
import { IncidentReports } from "./_components/IncidentReports/IncidentReports";
import { StudentObservations } from "./_components/StudentObservations/StudentObservations";
import { Archives } from "./_components/Archives/Archives";

function AnecdotalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "dashboard";

  const setActiveTab = (tab: string) => {
    router.push(`/principal/anecdotal?tab=${tab}`);
  };

  return (
    <div className={styles.pageContainer}>
      <AnecdotalHeader activeTab={activeTab} />
      <AnecdotalTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.content}>
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "behavior" && <BehaviorReports />}
        {activeTab === "guidance" && <GuidanceNotes />}
        {activeTab === "incidents" && <IncidentReports />}
        {activeTab === "observations" && <StudentObservations />}
        {activeTab === "archives" && <Archives />}
      </div>
    </div>
  );
}

export default function AnecdotalPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <AnecdotalContent />
    </Suspense>
  );
}
