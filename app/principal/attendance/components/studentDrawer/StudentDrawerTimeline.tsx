"use client";

import { useState } from "react";
import { AttendanceDay, AttendanceBar } from "./studentDrawer.types";
import styles from "./StudentDrawerTimeline.module.css";

interface StudentDrawerTimelineProps {
  days: AttendanceDay[];
  studentName?: string;
  studentLRN?: string;
  studentGrade?: string;
}

function getBarClass(type: AttendanceBar["type"], css: CSSModuleClasses): string {
  if (type === "present") return css.barPresent;
  if (type === "late")    return css.barLate;
  if (type === "absent")  return css.barAbsent;
  if (type === "break")   return css.barBreak;
  return css.barPresent;
}

type CSSModuleClasses = Record<string, string>;

function getBarColor(type: AttendanceBar["type"]): string {
  if (type === "present") return "#6366f1";
  if (type === "late")    return "#f59e0b";
  if (type === "absent")  return "#ef4444";
  if (type === "break")   return "#d1d5db";
  return "#6366f1";
}

function generatePDFHTML(
  days: AttendanceDay[],
  studentName: string,
  studentLRN: string,
  studentGrade: string
): string {
  const generatedDate = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalDays = days.length;
  const presentDays = days.filter(d =>
    d.bars.some(b => b.type === "present") && d.clockIn !== "-"
  ).length;
  const absentDays = days.filter(d => d.clockIn === "-").length;
  const lateDays = days.filter(d => d.late).length;

  const dayRows = days.map((day) => {
    const getShortLabel = (type: AttendanceBar["type"], label: string): string => {
      if (type === "break") return "Break";
      if (type === "absent") return label.includes("AM") ? "AM" : "PM";
      if (label.includes("AM")) return "AM";
      if (label.includes("PM")) return "PM";
      return label;
    };

    const barSegments = day.bars
      .map((bar) => {
        const color = getBarColor(bar.type);
        const shortLabel = getShortLabel(bar.type, bar.label);
        return `<div style="flex:${bar.flex};background:${color};-webkit-print-color-adjust:exact;print-color-adjust:exact;border-radius:3px;display:flex;align-items:center;justify-content:center;padding:0 6px;min-width:0;overflow:hidden;">
          <span style="font-size:9px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${shortLabel}</span>
        </div>`;
      })
      .join('<div style="width:2px;flex-shrink:0;background:#fff;"></div>');

    const statusBadge = day.clockIn === "-"
      ? `<span style="background:#fef2f2;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:#dc2626;border:1px solid #fee2e2;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;">Absent</span>`
      : day.late
        ? `<span style="background:#fffbeb;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:#b45309;border:1px solid #fde68a;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;">Late</span>`
        : day.approved
          ? `<span style="background:#f0fdf4;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:#16a34a;border:1px solid #bbf7d0;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;">&#10003; Approved</span>`
          : `<span style="background:#eff6ff;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:#2563eb;border:1px solid #bfdbfe;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;">Present</span>`;

    return `
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:12px 16px 12px 48px;font-size:12px;font-weight:700;color:#111827;white-space:nowrap;">${day.label}</td>
        <td style="padding:12px 16px;">${statusBadge}</td>
        <td style="padding:12px 16px;font-size:12px;color:#374151;font-weight:600;white-space:nowrap;">${day.clockIn}</td>
        <td style="padding:12px 16px;font-size:12px;color:#374151;font-weight:600;white-space:nowrap;">${day.clockOut}</td>
        <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#111827;white-space:nowrap;">${day.duration}</td>
        <td style="padding:12px 48px 12px 16px;">
          <div style="display:flex;height:24px;border-radius:4px;overflow:hidden;background:#f4f4f5;width:100%;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
            ${barSegments}
          </div>
        </td>
      </tr>`;
  }).join("");

  const initials = studentName.split(" ").map((n: string) => n[0]).slice(0, 2).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Attendance Report — ${studentName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700;800&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: #f8f8fb;
      color: #111827;
      min-height: 100vh;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      max-width: 860px;
      margin: 0 auto;
      background: #fff;
      min-height: 100vh;
      box-shadow: 0 0 40px rgba(0,0,0,0.08);
    }

    .report-header {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      padding: 40px 48px 32px;
      color: #fff;
      position: relative;
      overflow: hidden;
    }
    .report-header::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 220px; height: 220px;
      background: rgba(255,255,255,0.06);
      border-radius: 50%;
    }
    .report-header::after {
      content: '';
      position: absolute;
      bottom: -40px; left: 40%;
      width: 140px; height: 140px;
      background: rgba(255,255,255,0.04);
      border-radius: 50%;
    }

    .school-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.75;
      margin-bottom: 6px;
    }

    .report-title {
      font-family: 'DM Serif Display', serif;
      font-size: 2rem;
      font-weight: 400;
      line-height: 1.15;
      margin-bottom: 20px;
    }

    .report-title em {
      font-style: italic;
      opacity: 0.85;
    }

    .student-meta-band {
      display: flex;
      gap: 32px;
      align-items: center;
      flex-wrap: wrap;
    }

    .student-avatar {
      width: 52px; height: 52px;
      background: rgba(255,255,255,0.2);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      border: 2px solid rgba(255,255,255,0.4);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; font-weight: 700;
      flex-shrink: 0;
    }

    .meta-grid {
      display: flex; gap: 24px; flex-wrap: wrap;
    }
    .meta-item { display: flex; flex-direction: column; gap: 2px; }
    .meta-key { font-size: 10px; font-weight: 600; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.08em; }
    .meta-val { font-size: 13px; font-weight: 700; }

    .header-actions {
      margin-left: auto;
      display: flex; gap: 10px; align-items: center;
    }

    .btn-print {
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      color: #6366f1;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      display: flex; align-items: center; gap: 7px;
      transition: opacity 0.15s;
    }
    .btn-print:hover { opacity: 0.88; }

    .summary-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-bottom: 1px solid #f0f0f4;
    }

    .summary-card {
      padding: 20px 24px;
      border-right: 1px solid #f0f0f4;
      display: flex; flex-direction: column; gap: 4px;
    }
    .summary-card:last-child { border-right: none; }
    .s-label { font-size: 10px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; }
    .s-value { font-size: 1.8rem; font-weight: 800; line-height: 1; }
    .s-sub { font-size: 11px; color: #9ca3af; }

    .legend-bar {
      display: flex; gap: 20px; align-items: center;
      padding: 14px 48px;
      background: #fafafa;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      border-bottom: 1px solid #f0f0f4;
      flex-wrap: wrap;
    }
    .legend-label { font-size: 10px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em; margin-right: 4px; }
    .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #374151; font-weight: 500; }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      flex-shrink: 0;
      display: inline-block;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .table-wrap { padding: 0 0 40px; }

    .section-heading {
      padding: 24px 48px 12px;
      font-size: 11px;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    col.col-date     { width: 130px; }
    col.col-status   { width: 100px; }
    col.col-clockin  { width: 100px; }
    col.col-clockout { width: 100px; }
    col.col-duration { width: 90px; }
    col.col-timeline { width: auto; }

    thead tr {
      background: #fafafa;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      border-top: 1px solid #f0f0f4;
      border-bottom: 1px solid #e5e7eb;
    }
    thead th {
      padding: 10px 16px;
      font-size: 10px;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      text-align: left;
    }
    thead th:first-child { padding-left: 48px; }
    thead th:last-child  { padding-right: 48px; }
    tbody tr:hover { background: #fafafa; }

    .report-footer {
      border-top: 1px dashed #e5e7eb;
      padding: 20px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-note { font-size: 10px; color: #9ca3af; }
    .footer-brand { font-size: 10px; color: #c4b5fd; font-weight: 700; letter-spacing: 0.06em; }

    @media print {
      body {
        background: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .page {
        box-shadow: none;
        max-width: 100%;
      }
      .btn-print,
      .btn-download,
      .header-actions {
        display: none !important;
      }
      .report-header {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .legend-dot {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .summary-strip,
      .summary-card,
      .legend-bar {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      table {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      thead tr {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      tr, td, th {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
<div class="page">

  <div class="report-header">
    <div class="school-label">Official Attendance Report</div>
    <div class="report-title">Student <em>Attendance</em><br>Timeline Record</div>

    <div class="student-meta-band">
      <div class="student-avatar">${initials}</div>
      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-key">Full Name</span>
          <span class="meta-val">${studentName}</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">LRN</span>
          <span class="meta-val">${studentLRN}</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Grade / Section</span>
          <span class="meta-val">${studentGrade}</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Report Date</span>
          <span class="meta-val">${generatedDate}</span>
        </div>
      </div>

      <div class="header-actions">
        <button class="btn-print" onclick="window.print()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print / Save PDF
        </button>
      </div>
    </div>
  </div>

  <div class="summary-strip">
    <div class="summary-card">
      <span class="s-label">Total Days</span>
      <span class="s-value" style="color:#6366f1;">${totalDays}</span>
      <span class="s-sub">in this report</span>
    </div>
    <div class="summary-card">
      <span class="s-label">Present</span>
      <span class="s-value" style="color:#2563eb;">${presentDays}</span>
      <span class="s-sub">days attended</span>
    </div>
    <div class="summary-card">
      <span class="s-label">Absent</span>
      <span class="s-value" style="color:#dc2626;">${absentDays}</span>
      <span class="s-sub">days missed</span>
    </div>
    <div class="summary-card">
      <span class="s-label">Late</span>
      <span class="s-value" style="color:#d97706;">${lateDays}</span>
      <span class="s-sub">late arrivals</span>
    </div>
  </div>

  <div class="legend-bar">
    <span class="legend-label">Legend:</span>
    <div class="legend-item">
      <div class="legend-dot" style="background:#6366f1;"></div> Present
    </div>
    <div class="legend-item">
      <div class="legend-dot" style="background:#f59e0b;"></div> Late
    </div>
    <div class="legend-item">
      <div class="legend-dot" style="background:#ef4444;"></div> Absent
    </div>
    <div class="legend-item">
      <div class="legend-dot" style="background:#d1d5db;"></div> Break
    </div>
  </div>

  <div class="table-wrap">
    <div class="section-heading">Daily Attendance Breakdown</div>
    <table>
      <colgroup>
        <col class="col-date" />
        <col class="col-status" />
        <col class="col-clockin" />
        <col class="col-clockout" />
        <col class="col-duration" />
        <col class="col-timeline" />
      </colgroup>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
          <th>Clock-in</th>
          <th>Clock-out</th>
          <th>Duration</th>
          <th style="padding-right:48px;">Timeline</th>
        </tr>
      </thead>
      <tbody>
        ${dayRows}
      </tbody>
    </table>
  </div>

  <div class="report-footer">
    <span class="footer-note">Generated on ${generatedDate} · This document is for official school use only.</span>
    <span class="footer-brand">SCHOOL ATTENDANCE SYSTEM</span>
  </div>

</div>
</body>
</html>`;
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
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const tab = window.open(url, "_blank");
    if (tab) {
      tab.addEventListener("load", () => URL.revokeObjectURL(url), { once: true });
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