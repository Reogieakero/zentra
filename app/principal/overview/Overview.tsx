"use client";

import React from "react";
import styles from "./Overview.module.css";
import { MetricCard } from "./components/MetricCard";
import { DatePicker } from "./components/DatePicker";
import { AttendanceOverview } from "./components/AttendanceOverview";
import { ActivityFeed } from "./components/ActivityFeed";
import { QuickActions } from "./components/QuickActions";
import { AtRiskStudents } from "./components/AtRiskStudents";
import { useDashboardDate } from "../../hooks/useDashboardDate";
import * as Icons from "./components/Icons";

export function Overview() {
  const { selectedDate, setSelectedDate, displayDate } = useDashboardDate();

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Good Morning, Principal</h1>
          <p className={styles.pageSubtitle}>{displayDate}</p>
        </div>
        <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
      </header>

      <div className={styles.metricsGrid}>
        <MetricCard label="Total Students" value="1,240" color="var(--accent-violet)" icon={<Icons.UserGroupIcon />} />
        <MetricCard label="Present Today" value="92%" color="var(--accent-emerald)" icon={<Icons.CheckCircleIcon />} />
        <MetricCard label="Absent Today" value="8%" color="var(--accent-amber)" icon={<Icons.AlertCircleIcon />} />
        <MetricCard label="Pending ADM" value="14" color="var(--accent-sky)" icon={<Icons.ClipboardIcon />} />

        <MetricCard label="SF10 Records" value="892" color="var(--accent-indigo)" icon={<Icons.FileTextIcon />} />
        <MetricCard label="Applications" value="45" color="var(--accent-teal)" icon={<Icons.BriefcaseIcon />} />
        <MetricCard label="Anecdotal" value="12" color="var(--accent-pink)" icon={<Icons.ShieldIcon />} />
        <MetricCard label="Announcements" value="3" color="var(--accent-orange)" icon={<Icons.BellIcon />} />
      </div>

      <div className={styles.mainGrid}>
        {/* Left: Attendance chart */}
        <div className={styles.leftColumn}>
          <AttendanceOverview />
          <div className={styles.mt6}>
            <ActivityFeed />
          </div>
        </div>

        {/* Right: At-Risk + Quick Actions side by side */}
        <div className={styles.rightColumn}>
          <AtRiskStudents />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}