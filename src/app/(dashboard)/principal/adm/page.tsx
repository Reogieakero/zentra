"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import PageHeader from "./_components/PageHeader/PageHeader";
import TabsNav from "./_components/TabsNav/TabsNav";
import StatsRow from "./_components/StatsRow/StatsRow";
import OverviewCharts from "./_components/OverviewCharts/OverviewCharts";
import NotificationsCard from "./_components/NotificationsCard/NotificationsCard";
import PendingActionsTable from "./_components/PendingActionsTable/PendingActionsTable";
import RecentActivities from "./_components/RecentActivities/RecentActivities";
import QuickReports from "./_components/QuickReports/QuickReports";
import EndorsementsView from "./_components/Endorsements/EndorsementsView";
import ActiveADMView from "./_components/ActiveADM/ActiveADMView";
import ReintegrationView from "./_components/Reintegration/ReintegrationView";
import ReportsView from "./_components/Reports/ReportsView";

function ADMContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "dashboard";

  const setActiveTab = (tab: string) => {
    router.push(`/principal/adm?tab=${tab}`);
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader />
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles.mainContentLayout}>
        {activeTab === "dashboard" ? (
          <>
            <StatsRow />

            <div className={styles.mainSplitGrid}>
              <OverviewCharts />
              <NotificationsCard />
            </div>

            <div className={styles.mainSplitGrid}>
              <PendingActionsTable />

              <div className={styles.sectionGroup}>
                <RecentActivities />
                <QuickReports />
              </div>
            </div>
          </>
        ) : activeTab === "endorsements" ? (
          <EndorsementsView />
        ) : activeTab === "approvals" ? (
          <ActiveADMView />
        ) : activeTab === "reintegration" ? (
          <ReintegrationView />
        ) : activeTab === "reports" ? (
          <ReportsView />
        ) : (
          <div className={styles.placeholder}>
            <h3>Module Segment Content</h3>
            <p>Data tables and configurations will expand flush within this grid viewport.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ADMPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ADMContent />
    </Suspense>
  );
}
