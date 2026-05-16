import { AttendanceDay } from "../principal/attendance/components/studentDrawer/studentDrawer.types";
import { PDF_STYLES } from "../styles/studentDrawerPdf.styles";
import {
  getBarColor,
  getShortLabel,
  computeStats,
  getInitials,
  getGeneratedDate,
} from "./studentDrawerPdf.utils";

function buildBarSegments(day: AttendanceDay): string {
  return day.bars
    .map((bar) => {
      const color = getBarColor(bar.type);
      const label = getShortLabel(bar.type, bar.label);
      return `<div style="flex:${bar.flex};background:${color};-webkit-print-color-adjust:exact;print-color-adjust:exact;border-radius:3px;display:flex;align-items:center;justify-content:center;padding:0 6px;min-width:0;overflow:hidden;">
        <span style="font-size:9px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${label}</span>
      </div>`;
    })
    .join('<div style="width:2px;flex-shrink:0;background:#fff;"></div>');
}

function buildStatusBadge(day: AttendanceDay): string {
  if (day.clockIn === "-")
    return `<span style="background:#fef2f2;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:#dc2626;border:1px solid #fee2e2;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;">Absent</span>`;
  if (day.late)
    return `<span style="background:#fffbeb;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:#b45309;border:1px solid #fde68a;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;">Late</span>`;
  if (day.approved)
    return `<span style="background:#f0fdf4;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:#16a34a;border:1px solid #bbf7d0;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;">&#10003; Approved</span>`;
  return `<span style="background:#eff6ff;-webkit-print-color-adjust:exact;print-color-adjust:exact;color:#2563eb;border:1px solid #bfdbfe;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:700;white-space:nowrap;">Present</span>`;
}

function buildDayRows(days: AttendanceDay[]): string {
  return days.map((day) => `
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:12px 16px 12px 48px;font-size:12px;font-weight:700;color:#111827;white-space:nowrap;">${day.label}</td>
      <td style="padding:12px 16px;">${buildStatusBadge(day)}</td>
      <td style="padding:12px 16px;font-size:12px;color:#374151;font-weight:600;white-space:nowrap;">${day.clockIn}</td>
      <td style="padding:12px 16px;font-size:12px;color:#374151;font-weight:600;white-space:nowrap;">${day.clockOut}</td>
      <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#111827;white-space:nowrap;">${day.duration}</td>
      <td style="padding:12px 48px 12px 16px;">
        <div style="display:flex;height:24px;border-radius:4px;overflow:hidden;background:#f4f4f5;width:100%;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
          ${buildBarSegments(day)}
        </div>
      </td>
    </tr>`).join("");
}

export function generatePDFHTML(
  days: AttendanceDay[],
  studentName: string,
  studentLRN: string,
  studentGrade: string
): string {
  const generatedDate = getGeneratedDate();
  const initials = getInitials(studentName);
  const { totalDays, presentDays, absentDays, lateDays } = computeStats(days);
  const dayRows = buildDayRows(days);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Attendance Report — ${studentName}</title>
  <style>${PDF_STYLES}</style>
</head>
<body>
<div class="page">

  <div class="report-header">
    <div class="school-label">Official Attendance Report</div>
    <div class="report-title">Student <em>Attendance</em><br>Timeline Record</div>
    <div class="student-meta-band">
      <div class="student-avatar">${initials}</div>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-key">Full Name</span><span class="meta-val">${studentName}</span></div>
        <div class="meta-item"><span class="meta-key">LRN</span><span class="meta-val">${studentLRN}</span></div>
        <div class="meta-item"><span class="meta-key">Grade / Section</span><span class="meta-val">${studentGrade}</span></div>
        <div class="meta-item"><span class="meta-key">Report Date</span><span class="meta-val">${generatedDate}</span></div>
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
    <div class="summary-card"><span class="s-label">Total Days</span><span class="s-value" style="color:#6366f1;">${totalDays}</span><span class="s-sub">in this report</span></div>
    <div class="summary-card"><span class="s-label">Present</span><span class="s-value" style="color:#2563eb;">${presentDays}</span><span class="s-sub">days attended</span></div>
    <div class="summary-card"><span class="s-label">Absent</span><span class="s-value" style="color:#dc2626;">${absentDays}</span><span class="s-sub">days missed</span></div>
    <div class="summary-card"><span class="s-label">Late</span><span class="s-value" style="color:#d97706;">${lateDays}</span><span class="s-sub">late arrivals</span></div>
  </div>

  <div class="legend-bar">
    <span class="legend-label">Legend:</span>
    <div class="legend-item"><div class="legend-dot" style="background:#6366f1;"></div> Present</div>
    <div class="legend-item"><div class="legend-dot" style="background:#f59e0b;"></div> Late</div>
    <div class="legend-item"><div class="legend-dot" style="background:#ef4444;"></div> Absent</div>
    <div class="legend-item"><div class="legend-dot" style="background:#d1d5db;"></div> Break</div>
  </div>

  <div class="table-wrap">
    <div class="section-heading">Daily Attendance Breakdown</div>
    <table>
      <colgroup>
        <col class="col-date" /><col class="col-status" /><col class="col-clockin" />
        <col class="col-clockout" /><col class="col-duration" /><col class="col-timeline" />
      </colgroup>
      <thead>
        <tr>
          <th>Date</th><th>Status</th><th>Clock-in</th>
          <th>Clock-out</th><th>Duration</th><th style="padding-right:48px;">Timeline</th>
        </tr>
      </thead>
      <tbody>${dayRows}</tbody>
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