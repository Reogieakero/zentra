"use client";

import { useState } from "react";
import { AttendanceDay, AttendanceBar } from "./studentDrawer.types";
import { generatePDFHTML } from "../../../../utils/studentDrawerPdf.generator";
import styles from "./StudentDrawerTimeline.module.css";

interface StudentDrawerTimelineProps {
  days: AttendanceDay[];
  studentName?: string;
  studentLRN?: string;
  studentGrade?: string;
}

type CSSModuleClasses = Record<string, string>;

function getBarClass(type: AttendanceBar["type"], css: CSSModuleClasses): string {
  if (type === "present") return css.barPresent;
  if (type === "late")    return css.barLate;
  if (type === "absent")  return css.barAbsent;
  if (type === "break")   return css.barBreak;
  return css.barPresent;
}

export function StudentDrawerTimeline({
  days,
  studentName = "Student",
  studentLRN = "N/A",
  studentGrade = "N/A",
}: StudentDrawerTimelineProps) {
  const [hoveredBar, setHoveredBar] = useState<{ dayIdx: number; barIdx: number } | null>(null);

  const recentDays = days.slice(-7);

  function handleViewAll() {
    const html = generatePDFHTML(days, studentName, studentLRN, studentGrade);
    const tab = window.open("", "_blank");
    if (tab) {
      tab.document.open();
      tab.document.write(html);
      tab.document.close();
      tab.history.replaceState(null, "", " ");
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.timelineHeaderRow}>
        <h3 className={styles.timelineTitle}>Attendance Records</h3>
        <div className={styles.headerMetaGroup}>
          <span className={styles.rangeIndicator}>Showing last 7 days of attendance</span>
          <button
            type="button"
            className={styles.viewAllBtn}
            onClick={handleViewAll}
          >
            View All
          </button>
        </div>
      </div>

      <div className={styles.timelineList}>
        {recentDays.map((day, dayIdx) => (
          <div key={dayIdx} className={styles.daySection}>
            <div className={styles.dayHeader}>
              <span className={styles.dayLabel}>{day.label}</span>
              {day.approved && (
                <span className={styles.approvedBadge}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Approved
                </span>
              )}
            </div>

            <div className={styles.clockRow}>
              <span className={styles.clockLabel}>Clock-in</span>
              <div className={styles.timelineTicks}>
                <span>7:30</span>
                <span>9:45</span>
                <span>12:00</span>
                <span style={{ textAlign: "right" }}>1:00 – 4:30</span>
              </div>
              <span className={styles.clockLabel}>Clock-out</span>
              <span className={styles.clockLabel}>Duration</span>
            </div>

            <div className={styles.barRow}>
              <span className={styles.clockValue}>
                {day.late && <span className={styles.lateTag}>Late</span>}
                {day.clockIn}
              </span>
              <div className={`${styles.visualBar} ${styles.barWrap}`}>
                {day.bars.map((bar, barIdx) => (
                  <div
                    key={barIdx}
                    className={getBarClass(bar.type, styles as CSSModuleClasses)}
                    style={{ flex: bar.flex, minWidth: 0, position: "relative" }}
                    onMouseEnter={() => setHoveredBar({ dayIdx, barIdx })}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <span className={styles.barLabel}>{bar.label}</span>
                    {hoveredBar?.dayIdx === dayIdx && hoveredBar?.barIdx === barIdx && (
                      <div className={styles.tooltip}>{bar.label}</div>
                    )}
                  </div>
                ))}
              </div>
              <span className={styles.clockValue}>{day.clockOut}</span>
              <span className={styles.durationValue}>{day.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}