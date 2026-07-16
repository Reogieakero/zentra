import type { AttendanceDay } from "@/types/attendance";
import { getBarColor, computeStats, getInitials, getGeneratedDate } from "./pdf-utils";

export function generateAttendanceReportHtml(studentName: string, days: AttendanceDay[]) {
  const stats = computeStats(days);

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Attendance Report</title>
<style>${PDF_STYLES}</style></head><body>
<div class="page">
  <div class="report-header">
    <div class="school-label">Department of Education</div>
    <div class="report-title">Attendance Report <em>• Detailed View</em></div>
    <div class="student-meta-band">
      <div class="student-avatar">${getInitials(studentName)}</div>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-key">Student</span><span class="meta-val">${studentName}</span></div>
        <div class="meta-item"><span class="meta-key">Generated</span><span class="meta-val">${getGeneratedDate()}</span></div>
      </div>
    </div>
  </div>

  <div class="summary-strip">
    <div class="summary-card"><span class="s-label">Total Days</span><span class="s-value">${stats.totalDays}</span><span class="s-sub">school days</span></div>
    <div class="summary-card"><span class="s-label">Present</span><span class="s-value" style="color:#6366f1">${stats.presentDays}</span><span class="s-sub">on time</span></div>
    <div class="summary-card"><span class="s-label">Late</span><span class="s-value" style="color:#f59e0b">${stats.lateDays}</span><span class="s-sub">arrivals</span></div>
    <div class="summary-card"><span class="s-label">Absent</span><span class="s-value" style="color:#ef4444">${stats.absentDays}</span><span class="s-sub">missed days</span></div>
  </div>

  <div class="legend-bar">
    <span class="legend-label">Legend:</span>
    <span class="legend-item"><span class="legend-dot" style="background:#6366f1"></span>Present</span>
    <span class="legend-item"><span class="legend-dot" style="background:#f59e0b"></span>Late</span>
    <span class="legend-item"><span class="legend-dot" style="background:#ef4444"></span>Absent</span>
    <span class="legend-item"><span class="legend-dot" style="background:#d1d5db"></span>Break</span>
  </div>

  <div class="table-wrap">
    <div class="section-heading">Daily Attendance Log</div>
    <table>
      <colgroup><col class="col-date"/><col class="col-status"/><col class="col-clockin"/><col class="col-clockout"/><col class="col-duration"/><col class="col-timeline"/></colgroup>
      <thead><tr>
        <th>Date</th><th>Status</th><th>Clock In</th><th>Clock Out</th><th>Duration</th><th>Timeline</th>
      </tr></thead>
      <tbody>
        ${days.map((day) => `
          <tr>
            <td style="padding:8px 16px;font-size:13px;font-weight:600;color:#111">${day.label}</td>
            <td style="padding:8px 16px">${day.late ? '<span style="color:#f59e0b;font-weight:600">Late</span>' : day.clockIn === "-" ? '<span style="color:#ef4444;font-weight:600">Absent</span>' : '<span style="color:#6366f1;font-weight:600">Present</span>'}</td>
            <td style="padding:8px 16px;font-size:13px;color:#374151">${day.clockIn}</td>
            <td style="padding:8px 16px;font-size:13px;color:#374151">${day.clockOut}</td>
            <td style="padding:8px 16px;font-size:13px;color:#374151">${day.duration}</td>
            <td style="padding:8px 16px"><div style="display:flex;height:28px;border-radius:6px;overflow:hidden;min-width:140px">${day.bars.map((bar) => `<div style="flex:${bar.flex};background:${getBarColor(bar.type)};min-width:4px" title="${bar.label}"></div>`).join("")}</div></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>

  <div class="report-footer">
    <span class="footer-note">This report is system-generated and does not require a signature.</span>
    <span class="footer-brand">ZENTRA</span>
  </div>
</div></body></html>`;
}

const PDF_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #f8f8fb; color: #111827; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { max-width: 860px; margin: 0 auto; background: #fff; min-height: 100vh; box-shadow: 0 0 40px rgba(0,0,0,0.08); }
  .report-header { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); padding: 40px 48px 32px; color: #fff; position: relative; overflow: hidden; }
  .report-header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 220px; height: 220px; background: rgba(255,255,255,0.06); border-radius: 50%; }
  .school-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.75; margin-bottom: 6px; }
  .report-title { font-size: 2rem; font-weight: 700; line-height: 1.15; margin-bottom: 20px; }
  .report-title em { font-style: italic; opacity: 0.85; }
  .student-meta-band { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; }
  .student-avatar { width: 52px; height: 52px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 700; flex-shrink: 0; }
  .meta-grid { display: flex; gap: 24px; flex-wrap: wrap; }
  .meta-item { display: flex; flex-direction: column; gap: 2px; }
  .meta-key { font-size: 10px; font-weight: 600; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.08em; }
  .meta-val { font-size: 13px; font-weight: 700; }
  .summary-strip { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid #f0f0f4; }
  .summary-card { padding: 20px 24px; border-right: 1px solid #f0f0f4; display: flex; flex-direction: column; gap: 4px; }
  .summary-card:last-child { border-right: none; }
  .s-label { font-size: 10px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; }
  .s-value { font-size: 1.8rem; font-weight: 800; line-height: 1; }
  .s-sub { font-size: 11px; color: #9ca3af; }
  .legend-bar { display: flex; gap: 20px; align-items: center; padding: 14px 48px; background: #fafafa; border-bottom: 1px solid #f0f0f4; flex-wrap: wrap; }
  .legend-label { font-size: 10px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em; }
  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #374151; font-weight: 500; }
  .legend-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; display: inline-block; }
  .table-wrap { padding: 0 0 40px; }
  .section-heading { padding: 24px 48px 12px; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; }
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #fafafa; border-top: 1px solid #f0f0f4; border-bottom: 1px solid #e5e7eb; }
  thead th { padding: 10px 16px; font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; text-align: left; }
  thead th:first-child { padding-left: 48px; }
  thead th:last-child { padding-right: 48px; }
  .report-footer { border-top: 1px dashed #e5e7eb; padding: 20px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-note { font-size: 10px; color: #9ca3af; }
  .footer-brand { font-size: 10px; color: #c4b5fd; font-weight: 700; letter-spacing: 0.06em; }
  @page { margin: 0; size: A4; }
  @media print { body { background: #fff; } .page { box-shadow: none; max-width: 100%; } }
`;
