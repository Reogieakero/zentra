"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import PageHeader from "./components/PageHeader/PageHeader";
import TabsNav from "./components/TabsNav/TabsNav";
import StatsRow from "./components/StatsRow/StatsRow";
import OverviewCharts from "./components/OverviewCharts/OverviewCharts";
import NotificationsCard from "./components/NotificationsCard/NotificationsCard";
import PendingActionsTable from "./components/PendingActionsTable/PendingActionsTable";
import RecentActivities from "./components/RecentActivities/RecentActivities";
import QuickReports from "./components/QuickReports/QuickReports";
import EndorsementsView from "./components/Endorsements/EndorsementsView";
import ActiveADMView from "./components/ActiveADM/ActiveADMView";
import ReintegrationView from "./components/Reintegration/ReintegrationView";
import ReportsView from "./components/Reports/ReportsView";

export default function ADMPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

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
