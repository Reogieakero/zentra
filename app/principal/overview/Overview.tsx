"use client";

import React from "react";
import styles from "./Overview.module.css";
import { MetricCard } from "./components/MetricCard";
import { DatePicker } from "./components/DatePicker";
import { AttendanceOverview } from "./components/AttendanceOverview";
import { ActivityFeed } from "./components/ActivityFeed";
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
        <div className={styles.statsColumn}>
          <AttendanceOverview />
          <div className={styles.mt6}>
            <ActivityFeed />
          </div>
        </div>

        <aside className={styles.noticeColumn}>
          <section className={`${styles.glassCard} ${styles.heroCard}`}>
            <h2 className={styles.sectionTitle} style={{ color: "var(--text-white)" }}>Notice Board</h2>
            <div className={styles.notice}>
              <strong>Faculty Convocation</strong>
              <p>Main Hall • 3:00 PM Today</p>
            </div>
            <div className={styles.cardDivider} />
            <div className={styles.notice}>
              <strong>Term Finals</strong>
              <p>Schedule released in SF10</p>
            </div>
            <div className={styles.cardDivider} />
            <div className={styles.notice}>
              <strong>Maintenance</strong>
              <p>System backup at 12:00 AM</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}