"use client";

import React, { useMemo } from "react";
import styles from "./AnnouncementSidebar.module.css";
import { AUDIENCE_LIST, type Announcement } from "./announcementTypes";

interface AnnouncementSidebarProps {
  announcements: Announcement[];
}

export function AnnouncementSidebar({ announcements }: AnnouncementSidebarProps) {
  const publishedCount = announcements.filter((a) => a.status === "published").length;
  const scheduledCount = announcements.filter((a) => a.status === "scheduled").length;
  const draftCount = announcements.filter((a) => a.status === "draft").length;

  const audienceBreakdown = useMemo(() => {
    const totalPublished = announcements.filter((a) => a.status === "published").length || 1;
    return AUDIENCE_LIST.map((meta) => {
      const count = announcements.filter(
        (a) => a.audience === meta.id && a.status === "published"
      ).length;
      return { ...meta, count, pct: Math.round((count / totalPublished) * 100) };
    }).sort((a, b) => b.count - a.count);
  }, [announcements]);

  return (
    <>
      <section className={styles.card}>
        <h2 className={styles.title}>Overview</h2>
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{publishedCount}</span>
            <span className={styles.statLabel}>Published</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{scheduledCount}</span>
            <span className={styles.statLabel}>Scheduled</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{draftCount}</span>
            <span className={styles.statLabel}>Drafts</span>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.title}>Audience Reach</h2>
        <ul className={styles.list}>
          {audienceBreakdown.map((a) => (
            <li key={a.id} className={styles.row}>
              <div className={styles.rowTop}>
                <span className={styles.rowLabel}>
                  <span className={styles.dot} style={{ background: a.color }} />
                  {a.label}
                </span>
                <span className={styles.rowCount}>{a.count}</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${a.pct}%`, background: a.color }} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
