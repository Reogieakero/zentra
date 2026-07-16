"use client";

import styles from "./AttendanceOverlay.module.css";
import { StatusBadge } from "./StatusBadge";
import { DatePicker } from "@/components/ui/date-picker";
import {
  type Student,
  GRADE_ORDER,
  STATUS_TABS,
  formatShortDate,
} from "./types";

interface OverlayStats {
  total: number;
  present: number;
  late: number;
  absent: number;
}

interface GradeGroup {
  grade: string;
  rows: Student[];
}

interface AttendanceOverlayProps {
  fsTab: string;
  fsGrade: string;
  fsSection: string;
  fsDate: Date | null;
  availableSections: string[];
  onFsTabChange: (tab: string) => void;
  onFsGradeChange: (grade: string) => void;
  onFsSectionChange: (section: string) => void;
  onFsDateChange: (date: Date | null) => void;
  fsGrouped: GradeGroup[];
  fsStats: OverlayStats;
  onClose: () => void;
  onRowClick: (student: Student) => void;
}

export function AttendanceOverlay({
  fsTab,
  fsGrade,
  fsSection,
  fsDate,
  availableSections,
  onFsTabChange,
  onFsGradeChange,
  onFsSectionChange,
  onFsDateChange,
  fsGrouped,
  fsStats,
  onClose,
  onRowClick,
}: AttendanceOverlayProps) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>

        {/* ── Header with Title Left, Stats Right + URL Address Bar ── */}
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.title}>Attendance Overview</div>
            <div className={styles.sub}>All students grouped by grade level</div>
          </div>

          {/* Stats section aligned to the right side with miniature browser chrome layout */}
          <div className={styles.miniStatsGrid}>
            
            {/* Total Card */}
            <div className={`${styles.miniCard} ${styles.cardTotal}`}>
              <div className={styles.chromeHeader}>
                <span className={`${styles.chromeDot} ${styles.chromeDotRed}`} />
                <span className={`${styles.chromeDot} ${styles.chromeDotYellow}`} />
                <span className={`${styles.chromeDot} ${styles.chromeDotGreen}`} />
                <div className={styles.chromeAddressBar}>
                  <span className={styles.chromeAddressText}>zentra.app/total</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.statLabel}>Total Students</span>
                <span className={`${styles.statValue} ${styles.statIndigo}`}>{fsStats.total}</span>
              </div>
            </div>

            {/* Present Card */}
            <div className={`${styles.miniCard} ${styles.cardPresent}`}>
              <div className={styles.chromeHeader}>
                <span className={`${styles.chromeDot} ${styles.chromeDotRed}`} />
                <span className={`${styles.chromeDot} ${styles.chromeDotYellow}`} />
                <span className={`${styles.chromeDot} ${styles.chromeDotGreen}`} />
                <div className={styles.chromeAddressBar}>
                  <span className={styles.chromeAddressText}>zentra.app/present</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.statLabel}>Present</span>
                <span className={`${styles.statValue} ${styles.statGreen}`}>{fsStats.present}</span>
              </div>
            </div>

            {/* Late Card */}
            <div className={`${styles.miniCard} ${styles.cardLate}`}>
              <div className={styles.chromeHeader}>
                <span className={`${styles.chromeDot} ${styles.chromeDotRed}`} />
                <span className={`${styles.chromeDot} ${styles.chromeDotYellow}`} />
                <span className={`${styles.chromeDot} ${styles.chromeDotGreen}`} />
                <div className={styles.chromeAddressBar}>
                  <span className={styles.chromeAddressText}>zentra.app/late</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.statLabel}>Late</span>
                <span className={`${styles.statValue} ${styles.statAmber}`}>{fsStats.late}</span>
              </div>
            </div>

            {/* Absent Card */}
            <div className={`${styles.miniCard} ${styles.cardAbsent}`}>
              <div className={styles.chromeHeader}>
                <span className={`${styles.chromeDot} ${styles.chromeDotRed}`} />
                <span className={`${styles.chromeDot} ${styles.chromeDotYellow}`} />
                <span className={`${styles.chromeDot} ${styles.chromeDotGreen}`} />
                <div className={styles.chromeAddressBar}>
                  <span className={styles.chromeAddressText}>zentra.app/absent</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.statLabel}>Absent</span>
                <span className={`${styles.statValue} ${styles.statRed}`}>{fsStats.absent}</span>
              </div>
            </div>

          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close fullscreen"
          >
            &times;
          </button>
        </div>

        {/* ── Filters Bar ── */}
        <div className={styles.filterRow}>
          <span className={styles.filterLabel}>Grade</span>
          <div className={styles.tabGroup}>
            {GRADE_ORDER.map((g) => (
              <button
                key={g}
                type="button"
                className={`${styles.tab} ${fsGrade === g ? styles.tabActive : ""}`}
                onClick={() => onFsGradeChange(g)}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Right actions container pushing everything following it to the right */}
          <div className={styles.rightActionsWrap}>
            <div className={styles.tabGroup}>
              {STATUS_TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`${styles.tab} ${fsTab === t ? styles.tabActive : ""}`}
                  onClick={() => onFsTabChange(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className={styles.datePickerWrap}>
              <DatePicker selectedDate={fsDate} onChange={onFsDateChange} />
            </div>
          </div>
        </div>

        {/* ── Section Filters Row ── */}
        {availableSections.length > 0 && (
          <div className={styles.sectionRow}>
            <span className={styles.sectionLabel}>Section</span>
            <div className={styles.tabGroup}>
              {availableSections.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  className={`${styles.tab} ${styles.tabSection} ${fsSection === sec ? styles.tabSectionActive : ""}`}
                  onClick={() => onFsSectionChange(sec)}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Data Body Container ── */}
        <div className={styles.body}>
          {fsGrouped.length === 0 ? (
            <div className={styles.empty}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>No records match the current filter.</span>
            </div>
          ) : (
            fsGrouped.map(({ grade, rows }) => (
              <div key={grade}>
                <div className={styles.gradeLabel}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {grade}
                  <span className={styles.gradeCount}>
                    — {rows.length} student{rows.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <table className={styles.table}>
                  <colgroup>
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "26%" }} />
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "18%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>LRN</th>
                      <th>Full Name</th>
                      <th>Section</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((s) => (
                      <tr
                        key={s.lrn}
                        onClick={() => onRowClick(s)}
                        className={styles.clickableRow}
                      >
                        <td className={styles.lrnCell}>{s.lrn}</td>
                        <td className={styles.nameCell}>{s.name}</td>
                        <td>{s.section}</td>
                        <td>{formatShortDate(s.date)}</td>
                        <td>
                          <StatusBadge status={s.status} />
                        </td>
                        <td>
                          <button
                            type="button"
                            className={styles.seeMoreBtn}
                            aria-label="See more"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRowClick(s);
                            }}
                          >
                            See More
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}