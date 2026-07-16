"use client";

import { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { GradeRow, GradeStat, DayTotal } from "./types";
import { grades, GRADE_COLORS, GRADE_SHORT } from "./constants";
import { sparkPoints } from "./utils";
import { CustomTooltip } from "./CustomTooltip";
import { useAttendanceAnalytics } from "@/hooks/useAttendanceAnalytics";
import { KPICard } from "./KPICard";
import styles from "./AttendanceReport.module.css";

interface AttendanceReportProps {
  data: GradeRow[];
  dayDateMap: Record<string, string>;
  gradeStats: GradeStat[];
  dayTotals: DayTotal[];
  grandTotal: number;
  weekLabel: string;
  onBack: () => void;
}

type PaperSize = "letter" | "a4";

const PAPER_CONFIG: Record<PaperSize, { label: string; width: string; height: string; cssSize: string }> = {
  letter: { label: "Letter (8.5 × 11 in)",  width: "816px",  height: "1056px", cssSize: "letter" },
  a4:     { label: "A4 (210 × 297 mm)",      width: "794px",  height: "1123px", cssSize: "a4"     },
};

function generateAttendancePDFHTML(params: {
  data: GradeRow[];
  dayDateMap: Record<string, string>;
  gradeStats: GradeStat[];
  dayTotals: DayTotal[];
  grandTotal: number;
  weekLabel: string;
  highestDay: { day: string; total: number; date: string };
  lowestDay: { day: string; total: number; date: string };
  leadingGrade: { grade: string; avg: number };
  days: string[];
  minVal: number;
  maxVal: number;
  chartMin: number;
  chartMax: number;
  paperSize: PaperSize;
}): string {
  const {
    data,
    dayDateMap,
    gradeStats,
    grandTotal,
    weekLabel,
    highestDay,
    lowestDay,
    leadingGrade,
    days,
    minVal,
    maxVal,
    chartMin,
    chartMax,
    paperSize,
  } = params;

  const paper = PAPER_CONFIG[paperSize];

  const generatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const generatedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const PRINT_GRADE_COLORS: Record<string, string> = { ...GRADE_COLORS };

  // ── KPI Cards (chrome-style, matching KPICard.tsx) ──────────────────────────
  const kpiDefs = [
    {
      label: "Total Students",
      value: grandTotal.toLocaleString(),
      note: "across all grades & days",
      url: "zentra.app/stats/total-students",
      color: "#6366f1",
      useColorForValue: false,
    },
    {
      label: "Daily Average",
      value: Math.round(grandTotal / 5).toLocaleString(),
      note: "per school day",
      url: "zentra.app/stats/daily-average",
      color: "#3b82f6",
      useColorForValue: false,
    },
    {
      label: "Peak Day",
      value: highestDay.day,
      note: `<strong>${highestDay.total}</strong> students · ${highestDay.date}`,
      url: "zentra.app/stats/peak-day",
      color: "#10b981",
      useColorForValue: false,
    },
    {
      label: "Leading Grade",
      value: GRADE_SHORT[leadingGrade.grade as keyof typeof GRADE_SHORT] ?? leadingGrade.grade,
      note: `avg <strong>${leadingGrade.avg.toFixed(1)}</strong> students/day`,
      url: "zentra.app/stats/leading-grade",
      color: PRINT_GRADE_COLORS[leadingGrade.grade] ?? "#f59e0b",
      useColorForValue: true,
    },
  ];

  const kpiCardsHTML = kpiDefs.map(({ label, value, note, url, color, useColorForValue }) => `
    <div class="kpi-card" style="border-color:${color}22;box-shadow:0 4px 16px ${color}0a;">
      <div class="kpi-chrome" style="background:${color}06;border-bottom-color:${color}15;">
        <span class="kpi-dot" style="background:#ef4444;"></span>
        <span class="kpi-dot" style="background:#f59e0b;"></span>
        <span class="kpi-dot" style="background:#10b981;"></span>
        <div class="kpi-bar" style="background:${color}0f;">
          <span class="kpi-url" style="color:${color}aa;">${url}</span>
        </div>
      </div>
      <div class="kpi-body" style="background:linear-gradient(to bottom,${color}03,transparent);">
        <div class="kpi-label" style="color:${color}99;">${label}</div>
        <div class="kpi-value" style="color:${useColorForValue ? color : "#111827"};">${value}</div>
        <div class="kpi-note">${note}</div>
      </div>
    </div>
  `).join("");

  // ── Line Chart (SVG polyline, mirrors Recharts line chart) ──────────────────
  const svgW = 820;
  const svgH = 190;
  const padL = 36;
  const padR = 12;
  const padT = 10;
  const padB = 28;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;
  const valRange = (maxVal - minVal) || 1;

  const xPos = (i: number) => padL + (i / (days.length - 1)) * chartW;
  const yPos = (v: number) => padT + chartH - ((v - minVal) / valRange) * chartH;

  const refY = yPos(100);
  const refLine = (refY >= padT && refY <= padT + chartH)
    ? `<line x1="${padL}" y1="${refY.toFixed(1)}" x2="${svgW - padR}" y2="${refY.toFixed(1)}" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="4 4"/>`
    : "";

  const yTicks = [minVal, minVal + Math.round(valRange / 3), minVal + Math.round((2 * valRange) / 3), maxVal].map((v) => {
    const y = yPos(v);
    return `<text x="${padL - 4}" y="${y.toFixed(1)}" text-anchor="end" dominant-baseline="middle" font-size="9" fill="#9ca3af">${Math.round(v)}</text>`;
  }).join("");

  const xLabels = days.map((day, i) => {
    const x = xPos(i);
    return `<text x="${x.toFixed(1)}" y="${(padT + chartH + 18).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="500" fill="#9ca3af">${day}</text>`;
  }).join("");

  const gradeLines = grades.map((g) => {
    const color = PRINT_GRADE_COLORS[g] || "#6366f1";
    const pts = days.map((day, i) => {
      const row = data.find((r) => r.day === day);
      const v = row ? (row[g] ?? 0) : 0;
      return `${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`;
    }).join(" ");
    const dots = days.map((day, i) => {
      const row = data.find((r) => r.day === day);
      const v = row ? (row[g] ?? 0) : 0;
      return `<circle cx="${xPos(i).toFixed(1)}" cy="${yPos(v).toFixed(1)}" r="3.5" fill="${color}" stroke="#fff" stroke-width="2" style="-webkit-print-color-adjust:exact;print-color-adjust:exact;"/>`;
    }).join("");
    return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" style="-webkit-print-color-adjust:exact;print-color-adjust:exact;"/>${dots}`;
  }).join("");

  const chartSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" style="width:100%;display:block;">
      ${refLine}
      ${yTicks}
      ${xLabels}
      ${gradeLines}
    </svg>`;

  const chartLegendHTML = grades.map((g) => `
    <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#4b5563;">
      <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${PRINT_GRADE_COLORS[g] || "#6366f1"};-webkit-print-color-adjust:exact;print-color-adjust:exact;"></span>
      <span>${g}</span>
    </div>
  `).join("");

  // ── Grade Cards (left-accent + sparkline, matching on-page gradeCard) ────────

  const gradeCardsHTML = gradeStats.map(({ grade, avg, peak, peakDay, low, lowDay, trend, vals }) => {
    const color = PRINT_GRADE_COLORS[grade] ?? "#7c3aed";
    const trendArrow = trend >= 0 ? "▲" : "▼";
    const trendColor = trend >= 0 ? "#10b981" : "#ef4444";
    const lo = Math.min(...vals);
    const hi = Math.max(...vals);
    const range = (hi - lo) || 1;
    const sparkPts = vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * 120;
      const y = 36 - ((v - lo) / range) * 36;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    const sparkDots = vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * 120;
      const y = 36 - ((v - lo) / range) * 36;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5" fill="${color}" stroke="#fff" stroke-width="1.5" style="-webkit-print-color-adjust:exact;print-color-adjust:exact;"/>`;
    }).join("");
    return `
      <div class="grade-card" style="border-left-color:${color};">
        <div class="grade-name">${grade}</div>
        <div class="grade-avg">${avg.toFixed(1)}<span class="grade-avg-suffix"> avg</span></div>
        <div class="grade-stats">
          <span>Peak <strong style="color:#111827;">${peak} (${peakDay})</strong></span>
          <span>Low <strong style="color:#111827;">${low} (${lowDay})</strong></span>
          <span style="color:${trendColor};font-weight:600;">${trendArrow} ${Math.abs(trend)} Mon→Fri</span>
        </div>
        <svg viewBox="0 0 120 36" style="width:100%;max-width:140px;display:block;">
          <polyline points="${sparkPts}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" opacity="0.8" style="-webkit-print-color-adjust:exact;print-color-adjust:exact;"/>
          ${sparkDots}
        </svg>
      </div>
    `;
  }).join("");

  // ── Table ────────────────────────────────────────────────────────────────────
  const gradeHeaders = grades.map((g) => `
    <th style="text-align:center;">${GRADE_SHORT[g as keyof typeof GRADE_SHORT] ?? g}</th>
  `).join("");

  const tableRows = days.map((day) => {
    const row = data.find((r) => r.day === day);
    if (!row) return "";
    const total = grades.reduce((s, g) => s + (row[g] ?? 0), 0);
    const gradeCells = grades.map((g) => `<td class="td-center">${row[g] ?? 0}</td>`).join("");
    return `
      <tr>
        <td>
          <div class="td-day">${day}</div>
          <div class="td-date">${dayDateMap[day] ?? ""}</div>
        </td>
        ${gradeCells}
        <td class="td-total">${total}</td>
      </tr>
    `;
  }).join("");

  const gradeTotals = grades.map((g) => `
    <td class="td-center" style="font-weight:700;">${data.reduce((s, r) => s + (r[g] ?? 0), 0)}</td>
  `).join("");

  const totalRow = `
    <tr class="tr-total">
      <td style="font-weight:700;font-size:11px;">TOTAL</td>
      ${gradeTotals}
      <td class="td-total">${grandTotal}</td>
    </tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Attendance Report — ${weekLabel}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-font-smoothing: antialiased; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #e5e7eb;
      color: #111827;
      min-height: 100vh;
      padding: 40px 24px 60px;
    }

    /* ── Toolbar ── */
    .toolbar {
      width: ${paper.width};
      margin: 0 auto 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .toolbar-left { display: flex; align-items: center; gap: 10px; }
    .paper-badge { font-size: 11px; font-weight: 600; color: #6b7280; background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 10px; }
    .toolbar-title { font-size: 11px; font-weight: 600; color: #9ca3af; letter-spacing: 0.04em; text-transform: uppercase; }
    .btn-print {
      display: inline-flex; align-items: center; gap: 7px;
      background: #111827; border: none; border-radius: 7px;
      padding: 8px 16px; color: #fff; font-size: 12px; font-weight: 600;
      cursor: pointer; transition: background 0.15s;
    }
    .btn-print:hover { background: #374151; }

    /* ── Paper: exact canvas, clips nothing, contains the inner layout ── */
    .paper {
      width: ${paper.width};
      height: ${paper.height};
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.10);
      position: relative;
      overflow: hidden;
    }

    /* ── Paper inner: fills the page with equal gutters on all sides ── */
    /* Gutter: 54px top, 54px bottom, 64px left, 64px right (standard print margins) */
    .paper-inner {
      position: absolute;
      top: 54px; bottom: 54px; left: 64px; right: 64px;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* ── Section spacing tokens ── */
    .sec { flex-shrink: 0; padding-bottom: 14px; }
    .sec-grow { flex: 1; display: flex; flex-direction: column; min-height: 0; padding-bottom: 14px; }

    /* ── Report header ── */
    .report-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      border-bottom: 2px solid #111827; padding-bottom: 12px; margin-bottom: 14px;
      flex-shrink: 0;
    }
    .report-school { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #6b7280; margin-bottom: 3px; }
    .report-title { font-size: 20px; font-weight: 800; color: #111827; line-height: 1.15; }
    .report-sub { font-size: 11px; color: #6b7280; margin-top: 3px; }
    .report-meta { text-align: right; font-size: 9.5px; color: #9ca3af; line-height: 1.8; }
    .report-meta strong { color: #374151; }

    /* ── Section label ── */
    .section-label {
      font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.12em;
      color: #9ca3af; font-weight: 700;
      border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 9px;
    }

    /* ── KPI row ── */
    .kpi-row { display: flex; gap: 10px; }
    .kpi-card { flex: 1; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
    .kpi-chrome { display: flex; align-items: center; gap: 4px; padding: 5px 8px; border-bottom: 1px solid #e5e7eb; }
    .kpi-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .kpi-bar { margin-left: 6px; flex: 1; height: 14px; border-radius: 3px; display: flex; align-items: center; padding: 0 6px; overflow: hidden; }
    .kpi-url { font-size: 8px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .kpi-body { padding: 10px 12px; }
    .kpi-label { font-size: 8.5px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 3px; }
    .kpi-value { font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 2px; line-height: 1.1; }
    .kpi-note { font-size: 8.5px; color: #9ca3af; }

    /* ── Chart: flex:1 so it fills leftover vertical space ── */
    .chart-section { flex: 1; display: flex; flex-direction: column; min-height: 0; padding-bottom: 14px; }
    .chart-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 14px; flex: 1; display: flex; flex-direction: column; min-height: 0; }
    .chart-legend { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; flex-shrink: 0; }
    .legend-item { display: flex; align-items: center; gap: 5px; font-size: 9.5px; color: #4b5563; }
    .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .chart-svg-wrap { flex: 1; min-height: 0; display: flex; }
    .chart-svg-wrap svg { width: 100% !important; height: 100% !important; }

    /* ── Grade cards grid ── */
    .grade-section { flex-shrink: 0; padding-bottom: 14px; }
    .grade-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .grade-card {
      background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 7px;
      padding: 12px 14px 10px; border-left-width: 4px; border-left-style: solid;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .grade-name { font-size: 8.5px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
    .grade-avg { font-size: 19px; font-weight: 800; color: #111827; margin-bottom: 4px; line-height: 1.1; }
    .grade-avg-suffix { font-size: 10px; color: #9ca3af; font-weight: 400; }
    .grade-stats { display: flex; flex-direction: column; gap: 2px; font-size: 9.5px; color: #6b7280; margin-bottom: 7px; }

    /* ── Table ── */
    .table-section { flex-shrink: 0; padding-bottom: 14px; }
    table { width: 100%; border-collapse: collapse; }
    .table-wrap { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
    th { padding: 8px 12px; background: #f9fafb; font-size: 11px; font-weight: 600; color: #9ca3af; border-bottom: 2px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.05em; text-align: left; }
    td { padding: 6px 10px; border-bottom: 1px solid #f3f4f6; font-size: 10.5px; }
    .td-day { font-weight: 600; color: #111827; font-size: 10.5px; }
    .td-date { font-size: 8.5px; color: #9ca3af; }
    .td-center { text-align: center; color: #374151; }
    .td-total { text-align: center; font-weight: 700; color: #111827; }
    .tr-total td { background: #f9fafb; font-weight: 700; border-top: 2px solid #e5e7eb; border-bottom: none; }

    /* ── Observation note ── */
    .note-box {
      flex-shrink: 0; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
      padding: 10px 14px; font-size: 9.5px; color: #6b7280; line-height: 1.6;
      margin-bottom: 14px;
    }
    .note-title { font-size: 8px; text-transform: uppercase; color: #9ca3af; font-weight: 700; display: block; margin-bottom: 3px; letter-spacing: 0.08em; }

    /* ── Footer: always at the bottom ── */
    .report-footer {
      margin-top: auto; flex-shrink: 0;
      display: flex; justify-content: space-between;
      font-size: 8.5px; color: #9ca3af;
      border-top: 1px solid #e5e7eb; padding-top: 10px;
    }

    /* ── Print ── */
    @page { size: ${paper.cssSize}; margin: 0; }
    @media print {
      html, body { background: #fff !important; padding: 0 !important; margin: 0 !important; }
      .toolbar { display: none !important; }
      .paper {
        box-shadow: none !important;
        position: fixed !important;
        top: 0 !important; left: 0 !important;
        width: ${paper.width} !important;
        height: ${paper.height} !important;
        transform: none !important;
        overflow: hidden !important;
      }
      .paper-inner {
        top: 54px !important; bottom: 54px !important;
        left: 64px !important; right: 64px !important;
      }
    }
  </style>
</head>
<body>

  <!-- Toolbar -->
  <div class="toolbar">
    <div class="toolbar-left">
      <span class="toolbar-title">Print Preview</span>
      <span class="paper-badge">${paper.label}</span>
    </div>
    <button class="btn-print" onclick="window.print()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
      Print / Save as PDF
    </button>
  </div>

  <!-- Bond Paper -->
  <div class="paper">
  <div class="paper-inner" id="paper-inner">

    <!-- Report Header -->
    <div class="report-header">
      <div>
        <div class="report-school">School Attendance System</div>
        <div class="report-title">Grade Attendance Summary</div>
        <div class="report-sub">${weekLabel} · All Grade Levels</div>
      </div>
      <div class="report-meta">
        <div><strong>Generated</strong> ${generatedDate}</div>
        <div><strong>Time</strong> ${generatedTime}</div>
        <div><strong>Format</strong> ${paper.label}</div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="sec">
      <div class="section-label">Key Metrics</div>
      <div class="kpi-row">${kpiCardsHTML}</div>
    </div>

    <!-- Line Chart: flex:1, grows to fill remaining space -->
    <div class="chart-section">
      <div class="section-label">Attendance Trend — By Grade</div>
      <div class="chart-box">
        <div class="chart-legend">${chartLegendHTML}</div>
        <div class="chart-svg-wrap">${chartSVG}</div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-section">
      <div class="section-label">Daily Attendance by Grade</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="text-align:left;">Day</th>
              ${gradeHeaders}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
            ${totalRow}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Note -->
    <div class="note-box">
      <strong class="note-title">Observation</strong>
      Lowest attendance was recorded on <strong>${lowestDay.day}</strong> (${lowestDay.date}) with <strong>${lowestDay.total}</strong> total students present. Friday attendance is consistently lower across all grade levels. Consider targeted engagement initiatives for end-of-week sessions.
    </div>

    <!-- Footer -->
    <div class="report-footer">
      <span>Grade Attendance Report · ${weekLabel}</span>
      <span>Generated by School Attendance System</span>
    </div>

  </div><!-- /.paper-inner -->
  </div>

  <script>
    (function() {
      // Only job of JS: scale the paper shell to fit the browser viewport for screen preview.
      // The content layout (filling the page with equal gutters) is handled purely by CSS.
      function fitToViewport() {
        var shell = document.querySelector('.paper');
        var toolbar = document.querySelector('.toolbar');
        if (!shell) return;
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var pw = shell.offsetWidth;
        var ph = shell.offsetHeight;
        var scale = Math.min((vw - 64) / pw, (vh - 120) / ph, 1);
        shell.style.transformOrigin = 'top center';
        shell.style.transform = scale < 1 ? 'scale(' + scale + ')' : 'none';
        if (toolbar) {
          toolbar.style.width = Math.round(pw * Math.min(scale, 1)) + 'px';
        }
        document.body.style.minHeight = (ph * Math.min(scale, 1) + 120) + 'px';
      }
      window.addEventListener('load', fitToViewport);
      window.addEventListener('resize', fitToViewport);
    })();
  </script>
</body>
</html>`;
}

export function AttendanceReport({
  data,
  dayDateMap,
  gradeStats,
  dayTotals,
  grandTotal,
  weekLabel,
  onBack,
}: AttendanceReportProps) {
  const {
    highestDay,
    lowestDay,
    leadingGrade,
    minVal,
    maxVal,
    chartMin,
    chartMax,
    days,
  } = useAttendanceAnalytics({ data, gradeStats, dayTotals });

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const themes = {
    total: "#6366f1",
    average: "#3b82f6",
    peak: "#10b981",
    leader: GRADE_COLORS[leadingGrade.grade] || "#f59e0b",
  };

  const handleOpenReport = (paperSize: PaperSize) => {
    setShowDropdown(false);
    const html = generateAttendancePDFHTML({
      data,
      dayDateMap,
      gradeStats,
      dayTotals,
      grandTotal,
      weekLabel,
      highestDay,
      lowestDay,
      leadingGrade,
      days,
      minVal,
      maxVal,
      chartMin,
      chartMax,
      paperSize,
    });
    const tab = window.open("", "_blank");
    if (tab) {
      tab.document.open();
      tab.document.write(html);
      tab.document.close();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>Weekly Attendance Report</div>
          <div className={styles.title}>Grade Attendance Summary</div>
          <div className={styles.sub}>{weekLabel} · All Grade Levels</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.meta}>
            Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            <br />
            {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              className={styles.downloadBtn}
              onClick={() => setShowDropdown((v) => !v)}
              aria-expanded={showDropdown}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Download Report
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: "transform 0.18s", transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  zIndex: 30,
                  background: "var(--bg-base, #fff)",
                  border: "1px solid var(--border-base, #e5e7eb)",
                  borderRadius: 12,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                  padding: "8px",
                  minWidth: 240,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted, #9ca3af)", padding: "4px 8px 6px" }}>
                  Select Paper Size
                </div>
                {(Object.entries(PAPER_CONFIG) as [PaperSize, typeof PAPER_CONFIG[PaperSize]][]).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => handleOpenReport(key)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: "none",
                      border: "1px solid transparent",
                      borderRadius: 8, padding: "8px 10px",
                      cursor: "pointer", textAlign: "left", width: "100%",
                      transition: "background 0.12s, border-color 0.12s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-muted, #f9fafb)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-base, #e5e7eb)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "none";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
                    }}
                  >
                    {/* Paper icon proportional to size */}
                    <div style={{
                      width: key === "letter" ? 22 : 26,
                      height: key === "letter" ? 32 : key === "a4" ? 30 : 28,
                      border: "1.5px solid #d1d5db",
                      borderRadius: 2,
                      background: "#fff",
                      flexShrink: 0,
                      boxShadow: "1px 1px 0 #e5e7eb",
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary, #111827)", lineHeight: 1.2 }}>
                        {key === "letter" ? "Letter" : key === "a4" ? "A4" : "Legal"}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted, #9ca3af)", marginTop: 1 }}>{cfg.label}</div>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.page} style={{ borderRadius: 0 }}>
        <div className={styles.kpiRow}>
          <KPICard
            title="Total Students"
            value={grandTotal.toLocaleString()}
            url="zentra.app/stats/total-students"
            themeColor={themes.total}
            note="across all grades & days"
          />
          <KPICard
            title="Daily Average"
            value={Math.round(grandTotal / 5).toLocaleString()}
            url="zentra.app/stats/daily-average"
            themeColor={themes.average}
            note="per school day"
          />
          <KPICard
            title="Peak Day"
            value={highestDay.day}
            url="zentra.app/stats/peak-day"
            themeColor={themes.peak}
            note={<><strong>{highestDay.total}</strong> students · {highestDay.date}</>}
          />
          <KPICard
            title="Leading Grade"
            value={GRADE_SHORT[leadingGrade.grade as keyof typeof GRADE_SHORT] ?? leadingGrade.grade}
            url="zentra.app/stats/leading-grade"
            themeColor={themes.leader}
            useColorForValue
            note={<>avg <strong>{leadingGrade.avg.toFixed(1)}</strong> students/day</>}
          />
        </div>

        <div className={styles.chartSection}>
          <div className={styles.sectionLabel}>Attendance Trend — By Grade</div>
          <div className={styles.chartBox}>
            <div className={styles.chartLegend}>
              {grades.map((g) => (
                <div key={g} className={styles.legendItemInline}>
                  <span className={styles.legendDotInline} style={{ background: GRADE_COLORS[g] }} />
                  {g}
                </div>
              ))}
            </div>
            <div className={styles.chartHeight}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: -10 }}>
                  <ReferenceLine y={100} stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth={1} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[minVal, maxVal]} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={35} />
                  <Tooltip content={<CustomTooltip activeGrade={null} dayDateMap={dayDateMap as Record<import("./types").Day, string>} />} />
                  {grades.map((g) => (
                    <Line key={g} type="linear" dataKey={g} stroke={GRADE_COLORS[g]} strokeWidth={2} dot={{ r: 3.5, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 5 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className={styles.sectionLabel}>Per-Grade Breakdown</div>
        <div className={styles.gradeGrid}>
          {gradeStats.map(({ grade, avg, peak, peakDay, low, lowDay, trend, vals }) => {
            const accentColor = GRADE_COLORS[grade] || "#7c3aed";
            return (
              <div key={grade} className={styles.gradeCard}>
                <div className={styles.gradeCardAccent} style={{ background: accentColor }} />
                <div className={styles.gradeName}>{grade}</div>
                <div className={styles.gradeAvg}>{avg.toFixed(1)}<span className={styles.gradeAvgSuffix}> avg</span></div>
                <div className={styles.gradeStats}>
                  <span>Peak <strong>{peak} ({peakDay})</strong></span>
                  <span>Low <strong>{low} ({lowDay})</strong></span>
                  <span className={trend >= 0 ? styles.trendUp : styles.trendDown}>
                    {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)} Mon→Fri
                  </span>
                </div>
                <div className={styles.gradeSpark}>
                  <svg viewBox="0 0 120 36" style={{ width: "100%", maxWidth: 160, display: "block" }}>
                    <polyline points={sparkPoints(vals, chartMin, chartMax)} fill="none" stroke={accentColor} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
                    {vals.map((v, i) => {
                      const x = (i / (vals.length - 1)) * 120;
                      const y = 36 - ((v - chartMin) / (chartMax - chartMin)) * 36;
                      return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.5" fill={accentColor} stroke="#fff" strokeWidth="1.5" />;
                    })}
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.tableSection}>
          <div className={styles.sectionLabel}>Daily Attendance by Grade</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Day</th>
                {grades.map((g) => <th key={g}>{GRADE_SHORT[g]}</th>)}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const row = data.find((r) => r.day === day)!;
                const total = grades.reduce((s, g) => s + row[g], 0);
                return (
                  <tr key={day}>
                    <td>
                      <div className={styles.dayLabel}>{day}</div>
                      <div className={styles.dayDate}>{dayDateMap[day]}</div>
                    </td>
                    {grades.map((g) => <td key={g}>{row[g]}</td>)}
                    <td className={styles.rowTotal}>{total}</td>
                  </tr>
                );
              })}
              <tr className={styles.totalRow}>
                <td>TOTAL</td>
                {grades.map((g) => <td key={g}>{data.reduce((s, r) => s + r[g], 0)}</td>)}
                <td>{grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.noteBox}>
          <strong className={styles.noteTitle}>Note</strong>
          <br />
          Lowest attendance was recorded on <strong>{lowestDay.day}</strong> ({lowestDay.date}) with <strong>{lowestDay.total}</strong> total students present. Friday attendance is consistently lower across all grade levels. Consider targeted engagement initiatives for end-of-week sessions.
        </div>
      </div>

      <div className={styles.footer}>
        <span>Grade Attendance Report · {weekLabel}</span>
        <span>Generated by Attendance System</span>
      </div>

    </div>
  );
}