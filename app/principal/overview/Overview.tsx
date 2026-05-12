import React from "react";
import styles from "./Overview.module.css";
import { MetricCard } from "./components/MetricCard";
import { ActivityItem } from "./components/ActivityItem";
import * as Icons from "./components/Icons";

export function Overview() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Good Morning, Principal</h1>
          <p className={styles.pageSubtitle}>{currentDate} </p>
        </div>
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
          <section className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.sectionTitle}>Attendance Overview</h2>
              <span className={styles.badge}>Live</span>
            </div>
            <div className={styles.chartPlaceholder}>
              <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none">
                <path d="M0,60 Q50,10 100,40 T200,20 T300,50 T400,10" fill="none" stroke="var(--brand-primary)" strokeWidth="3" />
              </svg>
            </div>
          </section>

          <section className={`${styles.glassCard} ${styles.mt6}`}>
            <h2 className={styles.sectionTitle}>Recent Activities</h2>
            <div className={styles.activityFeed}>
              <ActivityItem icon={<Icons.PlusIcon />} title="Enrollment" detail="Maria Santos • Grade 10" time="2m ago" />
              <ActivityItem icon={<Icons.EditIcon />} title="SF10 Updated" detail="Academic records • Section A" time="15m ago" />
              <ActivityItem icon={<Icons.CheckIcon />} title="ADM Approved" detail="ID #2024-001 Verified" time="1h ago" />
            </div>
          </section>
        </div>

        <aside className={styles.noticeColumn}>
          <section className={`${styles.glassCard} ${styles.heroCard}`}>
            <h2 className={styles.sectionTitle} style={{color: 'var(--text-white)'}}>Notice Board</h2>
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