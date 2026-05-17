"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import styles from "./AttendanceLine.module.css";

type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type Grade = "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12";

interface GradeRow {
  day: Day;
  "Grade 7": number;
  "Grade 8": number;
  "Grade 9": number;
  "Grade 10": number;
  "Grade 11": number;
  "Grade 12": number;
}

const dataByDate: Record<string, GradeRow[]> = {
  "2025-05-16": [
    { day: "Mon", "Grade 7": 112, "Grade 8": 98,  "Grade 9": 105, "Grade 10": 89,  "Grade 11": 76,  "Grade 12": 68  },
    { day: "Tue", "Grade 7": 118, "Grade 8": 104, "Grade 9": 99,  "Grade 10": 95,  "Grade 11": 80,  "Grade 12": 72  },
    { day: "Wed", "Grade 7": 105, "Grade 8": 91,  "Grade 9": 110, "Grade 10": 88,  "Grade 11": 74,  "Grade 12": 65  },
    { day: "Thu", "Grade 7": 120, "Grade 8": 107, "Grade 9": 102, "Grade 10": 93,  "Grade 11": 82,  "Grade 12": 70  },
    { day: "Fri", "Grade 7": 95,  "Grade 8": 85,  "Grade 9": 90,  "Grade 10": 78,  "Grade 11": 65,  "Grade 12": 58  },
  ],
  "2025-05-15": [
    { day: "Mon", "Grade 7": 108, "Grade 8": 95,  "Grade 9": 101, "Grade 10": 86,  "Grade 11": 73,  "Grade 12": 65  },
    { day: "Tue", "Grade 7": 115, "Grade 8": 100, "Grade 9": 97,  "Grade 10": 91,  "Grade 11": 78,  "Grade 12": 69  },
    { day: "Wed", "Grade 7": 100, "Grade 8": 88,  "Grade 9": 106, "Grade 10": 84,  "Grade 11": 71,  "Grade 12": 62  },
    { day: "Thu", "Grade 7": 117, "Grade 8": 103, "Grade 9": 99,  "Grade 10": 90,  "Grade 11": 79,  "Grade 12": 67  },
    { day: "Fri", "Grade 7": 90,  "Grade 8": 81,  "Grade 9": 87,  "Grade 10": 74,  "Grade 11": 62,  "Grade 12": 55  },
  ],
  "2025-05-14": [
    { day: "Mon", "Grade 7": 114, "Grade 8": 100, "Grade 9": 108, "Grade 10": 91,  "Grade 11": 78,  "Grade 12": 70  },
    { day: "Tue", "Grade 7": 120, "Grade 8": 106, "Grade 9": 103, "Grade 10": 97,  "Grade 11": 83,  "Grade 12": 74  },
    { day: "Wed", "Grade 7": 107, "Grade 8": 93,  "Grade 9": 112, "Grade 10": 90,  "Grade 11": 76,  "Grade 12": 67  },
    { day: "Thu", "Grade 7": 122, "Grade 8": 109, "Grade 9": 104, "Grade 10": 95,  "Grade 11": 84,  "Grade 12": 72  },
    { day: "Fri", "Grade 7": 97,  "Grade 8": 87,  "Grade 9": 92,  "Grade 10": 80,  "Grade 11": 67,  "Grade 12": 60  },
  ],
};

const fallback: GradeRow[] = [
  { day: "Mon", "Grade 7": 112, "Grade 8": 98,  "Grade 9": 105, "Grade 10": 89,  "Grade 11": 76,  "Grade 12": 68  },
  { day: "Tue", "Grade 7": 118, "Grade 8": 104, "Grade 9": 99,  "Grade 10": 95,  "Grade 11": 80,  "Grade 12": 72  },
  { day: "Wed", "Grade 7": 105, "Grade 8": 91,  "Grade 9": 110, "Grade 10": 88,  "Grade 11": 74,  "Grade 12": 65  },
  { day: "Thu", "Grade 7": 120, "Grade 8": 107, "Grade 9": 102, "Grade 10": 93,  "Grade 11": 82,  "Grade 12": 70  },
  { day: "Fri", "Grade 7": 95,  "Grade 8": 85,  "Grade 9": 90,  "Grade 10": 78,  "Grade 11": 65,  "Grade 12": 58  },
];

const grades: Grade[] = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

const GRADE_COLORS: Record<Grade, string> = {
  "Grade 7":  "#6d28d9",
  "Grade 8":  "#0891b2",
  "Grade 9":  "#d97706",
  "Grade 10": "#059669",
  "Grade 11": "#e11d48",
  "Grade 12": "#4f46e5",
};

const GRADE_SHORT: Record<Grade, string> = {
  "Grade 7":  "G7",
  "Grade 8":  "G8",
  "Grade 9":  "G9",
  "Grade 10": "G10",
  "Grade 11": "G11",
  "Grade 12": "G12",
};

const toDateStr = (date: Date | null) => {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const DAY_OFFSET: Record<Day, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4 };

function buildDayDateMap(selectedDate: Date | null): Record<Day, string> {
  const base = selectedDate ? new Date(selectedDate) : new Date();
  const jsDay = base.getDay();
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;
  const monday = new Date(base);
  monday.setDate(base.getDate() + diffToMonday);

  return (["Mon", "Tue", "Wed", "Thu", "Fri"] as Day[]).reduce((acc, day) => {
    const target = new Date(monday);
    target.setDate(monday.getDate() + DAY_OFFSET[day]);
    acc[day] = target.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return acc;
  }, {} as Record<Day, string>);
}

// ─── Report generator ────────────────────────────────────────────────────────

function openAttendanceReport(data: GradeRow[], selectedDate: Date | null, dayDateMap: Record<Day, string>) {
  const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Compute per-grade stats
  const gradeStats = grades.map((g) => {
    const vals = data.map((r) => r[g]);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const peak = Math.max(...vals);
    const peakDay = data[vals.indexOf(peak)].day;
    const low = Math.min(...vals);
    const lowDay = data[vals.indexOf(low)].day;
    const trend = vals[vals.length - 1] - vals[0];
    return { grade: g, avg, peak, peakDay, low, lowDay, trend, vals };
  });

  // Compute per-day totals
  const dayTotals = days.map((day) => {
    const row = data.find((r) => r.day === day)!;
    const total = grades.reduce((s, g) => s + row[g], 0);
    return { day, total, date: dayDateMap[day] };
  });

  const grandTotal = dayTotals.reduce((s, d) => s + d.total, 0);
  const highestDay = dayTotals.reduce((best, d) => d.total > best.total ? d : best);
  const lowestDay = dayTotals.reduce((best, d) => d.total < best.total ? d : best);
  const leadingGrade = gradeStats.reduce((best, g) => g.avg > best.avg ? g : best);

  // SVG sparkline for each grade (120×36)
  const allVals = grades.flatMap((g) => data.map((r) => r[g]));
  const chartMin = Math.min(...allVals) - 5;
  const chartMax = Math.max(...allVals) + 5;

  function sparkPoints(vals: number[], w = 120, h = 36): string {
    return vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * w;
      const y = h - ((v - chartMin) / (chartMax - chartMin)) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  // Full SVG chart (600×260) with all grade lines
  const chartW = 600, chartH = 260;
  const padL = 40, padR = 20, padT = 16, padB = 28;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;

  function linePoints(vals: number[]): string {
    return vals.map((v, i) => {
      const x = padL + (i / (vals.length - 1)) * innerW;
      const y = padT + innerH - ((v - chartMin) / (chartMax - chartMin)) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  const yTicks = [chartMin, Math.round((chartMin + chartMax) / 2), chartMax].map(Math.round);
  const weekLabel = selectedDate
    ? `Week of ${new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
    : "Current Week";

  const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Attendance Report — ${weekLabel}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0f14;
    --ink-2: #3a3a4a;
    --ink-3: #7a7a90;
    --ink-4: #b0b0c0;
    --paper: #f8f8f5;
    --paper-2: #f0f0ec;
    --paper-3: #e4e4de;
    --rule: #ddddd6;
    --accent: #1a1a2e;
    --radius: 4px;
  }

  html { font-size: 15px; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
    padding: 0;
  }

  /* ── Header ── */
  .report-header {
    background: var(--accent);
    color: #fff;
    padding: 40px 56px 36px;
    position: relative;
    overflow: hidden;
  }
  .report-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 28px,
      rgba(255,255,255,0.025) 28px,
      rgba(255,255,255,0.025) 29px
    );
  }
  .header-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 10px;
  }
  .header-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2.2rem;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 6px;
  }
  .header-sub {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.5);
  }
  .header-meta {
    position: absolute;
    top: 40px;
    right: 56px;
    text-align: right;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.35);
    line-height: 1.8;
  }

  /* ── Page layout ── */
  .page { max-width: 900px; margin: 0 auto; padding: 40px 56px 80px; }

  /* ── Section titles ── */
  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--rule);
  }

  /* ── KPI row ── */
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 40px;
  }
  .kpi {
    background: #fff;
    padding: 20px 22px;
  }
  .kpi-label {
    font-size: 0.68rem;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.08em;
    color: var(--ink-3);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .kpi-value {
    font-family: 'DM Serif Display', serif;
    font-size: 1.9rem;
    color: var(--ink);
    line-height: 1;
    margin-bottom: 4px;
  }
  .kpi-note {
    font-size: 0.72rem;
    color: var(--ink-3);
  }
  .kpi-note strong { color: var(--ink-2); font-weight: 600; }

  /* ── Chart section ── */
  .chart-section { margin-bottom: 44px; }
  .chart-box {
    background: #fff;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    padding: 28px 28px 20px;
  }
  .chart-legend {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--ink-2);
    letter-spacing: 0.03em;
  }
  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── Per-grade breakdown ── */
  .grade-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 44px;
  }
  .grade-card {
    background: #fff;
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    padding: 18px 18px 14px;
    position: relative;
  }
  .grade-card-accent {
    position: absolute;
    top: 0; left: 0;
    width: 3px;
    height: 100%;
    border-radius: var(--radius) 0 0 var(--radius);
  }
  .grade-name {
    font-size: 0.7rem;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 8px;
    margin-left: 8px;
  }
  .grade-avg {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    color: var(--ink);
    margin-left: 8px;
    line-height: 1;
    margin-bottom: 10px;
  }
  .grade-stats {
    display: flex;
    gap: 12px;
    margin-left: 8px;
    font-size: 0.7rem;
    color: var(--ink-3);
    flex-wrap: wrap;
  }
  .grade-stats span strong { color: var(--ink-2); font-weight: 600; }
  .grade-spark {
    margin-top: 12px;
    margin-left: 8px;
  }
  .trend-up { color: #059669; }
  .trend-down { color: #e11d48; }

  /* ── Daily totals table ── */
  .table-section { margin-bottom: 44px; }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.82rem;
  }
  thead th {
    background: var(--paper-2);
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid var(--rule);
  }
  thead th:not(:first-child) { text-align: right; }
  tbody td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--rule);
    color: var(--ink-2);
  }
  tbody td:not(:first-child) { text-align: right; font-family: 'DM Mono', monospace; font-size: 0.8rem; }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: var(--paper-2); }
  .day-label { font-weight: 600; color: var(--ink); }
  .day-date { font-size: 0.72rem; color: var(--ink-3); margin-top: 1px; }
  .row-total { font-weight: 600; color: var(--ink); }
  .total-row td { background: var(--paper-2); font-weight: 700; color: var(--ink); border-top: 2px solid var(--rule); }

  /* ── Footer ── */
  .report-footer {
    margin-top: 60px;
    padding-top: 20px;
    border-top: 1px solid var(--rule);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.7rem;
    font-family: 'DM Mono', monospace;
    color: var(--ink-4);
  }

  @media print {
    body { background: #fff; }
    .report-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .kpi { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>

<div class="report-header">
  <div class="header-eyebrow">Weekly Attendance Report</div>
  <div class="header-title">Grade Attendance<br>Summary</div>
  <div class="header-sub">${weekLabel} · All Grade Levels</div>
  <div class="header-meta">
    Generated ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}<br>
    ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
  </div>
</div>

<div class="page">

  <!-- KPIs -->
  <div class="kpi-row">
    <div class="kpi">
      <div class="kpi-label">Total Students</div>
      <div class="kpi-value">${grandTotal.toLocaleString()}</div>
      <div class="kpi-note">across all grades &amp; days</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">Daily Average</div>
      <div class="kpi-value">${Math.round(grandTotal / 5).toLocaleString()}</div>
      <div class="kpi-note">per school day</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">Peak Day</div>
      <div class="kpi-value">${highestDay.day}</div>
      <div class="kpi-note"><strong>${highestDay.total}</strong> students · ${highestDay.date}</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">Leading Grade</div>
      <div class="kpi-value" style="color:${GRADE_COLORS[leadingGrade.grade]}">${GRADE_SHORT[leadingGrade.grade]}</div>
      <div class="kpi-note">avg <strong>${leadingGrade.avg.toFixed(1)}</strong> students/day</div>
    </div>
  </div>

  <!-- Chart -->
  <div class="chart-section">
    <div class="section-label">Attendance Trend — By Grade</div>
    <div class="chart-box">
      <div class="chart-legend">
        ${grades.map((g) => `
          <div class="legend-item">
            <span class="legend-dot" style="background:${GRADE_COLORS[g]}"></span>
            ${g}
          </div>
        `).join("")}
      </div>
      <svg viewBox="0 0 ${chartW} ${chartH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;">
        <!-- Y grid lines + labels -->
        ${yTicks.map((tick) => {
          const y = padT + innerH - ((tick - chartMin) / (chartMax - chartMin)) * innerH;
          return `
            <line x1="${padL}" y1="${y.toFixed(1)}" x2="${padL + innerW}" y2="${y.toFixed(1)}"
              stroke="#e5e7eb" stroke-width="1" ${tick === 100 ? 'stroke-dasharray="4 4"' : ''} />
            <text x="${padL - 6}" y="${(y + 4).toFixed(1)}" font-size="9" fill="#9ca3af" text-anchor="end"
              font-family="'DM Mono', monospace">${tick}</text>
          `;
        }).join("")}
        <!-- X axis labels -->
        ${days.map((day, i) => {
          const x = padL + (i / (days.length - 1)) * innerW;
          return `
            <text x="${x.toFixed(1)}" y="${(padT + innerH + 18).toFixed(1)}" font-size="10" fill="#9ca3af"
              text-anchor="middle" font-family="'DM Sans', sans-serif" font-weight="500">${day}</text>
          `;
        }).join("")}
        <!-- Lines -->
        ${grades.map((g) => {
          const vals = data.map((r) => r[g]);
          return `<polyline points="${linePoints(vals)}" fill="none" stroke="${GRADE_COLORS[g]}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />`;
        }).join("\n        ")}
        <!-- Dots -->
        ${grades.map((g) => {
          return data.map((r, i) => {
            const x = padL + (i / (days.length - 1)) * innerW;
            const y = padT + innerH - ((r[g] - chartMin) / (chartMax - chartMin)) * innerH;
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="${GRADE_COLORS[g]}" stroke="#fff" stroke-width="2"/>`;
          }).join("\n        ");
        }).join("\n        ")}
      </svg>
    </div>
  </div>

  <!-- Per-grade cards -->
  <div class="section-label">Per-Grade Breakdown</div>
  <div class="grade-grid">
    ${gradeStats.map(({ grade, avg, peak, peakDay, low, lowDay, trend, vals }) => `
      <div class="grade-card">
        <div class="grade-card-accent" style="background:${GRADE_COLORS[grade]}"></div>
        <div class="grade-name">${grade}</div>
        <div class="grade-avg">${avg.toFixed(1)}<span style="font-size:0.9rem;color:var(--ink-3);font-family:'DM Sans',sans-serif;font-weight:400"> avg</span></div>
        <div class="grade-stats">
          <span>Peak <strong>${peak} (${peakDay})</strong></span>
          <span>Low <strong>${low} (${lowDay})</strong></span>
          <span class="${trend >= 0 ? 'trend-up' : 'trend-down'}">${trend >= 0 ? "▲" : "▼"} ${Math.abs(trend)} Mon→Fri</span>
        </div>
        <div class="grade-spark">
          <svg viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:160px;display:block;">
            <polyline points="${sparkPoints(vals)}" fill="none" stroke="${GRADE_COLORS[grade]}" stroke-width="1.8"
              stroke-linejoin="round" stroke-linecap="round" opacity="0.8"/>
            ${vals.map((v, i) => {
              const x = (i / (vals.length - 1)) * 120;
              const y = 36 - ((v - chartMin) / (chartMax - chartMin)) * 36;
              return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.5" fill="${GRADE_COLORS[grade]}" stroke="#fff" stroke-width="1.5"/>`;
            }).join("")}
          </svg>
        </div>
      </div>
    `).join("")}
  </div>

  <!-- Daily totals table -->
  <div class="table-section">
    <div class="section-label">Daily Attendance by Grade</div>
    <table>
      <thead>
        <tr>
          <th>Day</th>
          ${grades.map((g) => `<th>${GRADE_SHORT[g]}</th>`).join("")}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${days.map((day) => {
          const row = data.find((r) => r.day === day)!;
          const total = grades.reduce((s, g) => s + row[g], 0);
          return `
            <tr>
              <td>
                <div class="day-label">${day}</div>
                <div class="day-date">${dayDateMap[day]}</div>
              </td>
              ${grades.map((g) => `<td>${row[g]}</td>`).join("")}
              <td class="row-total">${total}</td>
            </tr>
          `;
        }).join("")}
        <tr class="total-row">
          <td>TOTAL</td>
          ${grades.map((g) => {
            const sum = data.reduce((s, r) => s + r[g], 0);
            return `<td>${sum}</td>`;
          }).join("")}
          <td>${grandTotal}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Lowest day note -->
  <div style="background:#fff;border:1px solid var(--rule);border-radius:var(--radius);padding:16px 20px;font-size:0.8rem;color:var(--ink-2);line-height:1.6;">
    <strong style="font-family:'DM Mono',monospace;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink-3);">Note</strong><br>
    Lowest attendance was recorded on <strong>${lowestDay.day}</strong> (${lowestDay.date}) with <strong>${lowestDay.total}</strong> total students present.
    Friday attendance is consistently lower across all grade levels. Consider targeted engagement initiatives for end-of-week sessions.
  </div>

</div>

<div class="report-footer" style="max-width:900px;margin:0 auto;padding:0 56px 40px;">
  <span>Grade Attendance Report · ${weekLabel}</span>
  <span>Generated by Attendance System</span>
</div>

</body>
</html>`;

  const tab = window.open("", "_blank");
  if (tab) {
    tab.document.write(reportHtml);
    tab.document.close();
  }
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  activeGrade: Grade | null;
  dayDateMap: Record<Day, string>;
}

function CustomTooltip({ active, payload, label, activeGrade, dayDateMap }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const items = activeGrade
    ? payload.filter((p) => p.dataKey === activeGrade)
    : payload;

  const dateLabel = label ? dayDateMap[label as Day] : null;

  return (
    <div style={{
      background: "var(--bg-base, #ffffff)",
      border: "1px solid var(--border-base, #e5e7eb)",
      borderRadius: 10,
      padding: "10px 14px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
      minWidth: 130,
    }}>
      <p style={{
        fontSize: 10,
        fontWeight: 700,
        color: "var(--text-muted, #9ca3af)",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}>
        {label}{dateLabel ? <span style={{ fontWeight: 400, marginLeft: 5, textTransform: "none", letterSpacing: 0 }}>· {dateLabel}</span> : null}
      </p>
      {items.map((p) => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: p.color, flexShrink: 0,
          }} />
          <span style={{ fontSize: 11, color: "var(--text-secondary, #6b7280)", flex: 1 }}>{p.dataKey}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary, #111827)", fontVariantNumeric: "tabular-nums" }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface HeatmapCardProps {
  selectedDate: Date | null;
}

export function HeatmapCard({ selectedDate }: HeatmapCardProps) {
  const key = toDateStr(selectedDate);
  const data = (key && dataByDate[key]) ? dataByDate[key] : fallback;

  const [hoveredGrade, setHoveredGrade] = useState<Grade | null>(null);

  const dayDateMap = buildDayDateMap(selectedDate);

  const allVals = grades.flatMap((g) => data.map((r) => r[g]));
  const minVal = Math.floor(Math.min(...allVals) / 10) * 10 - 8;
  const maxVal = Math.ceil(Math.max(...allVals) / 10) * 10 + 4;

  const highGrade = grades.reduce((best, g) => {
    const avg = data.reduce((s, r) => s + r[g], 0) / data.length;
    const bestAvg = data.reduce((s, r) => s + r[best], 0) / data.length;
    return avg > bestAvg ? g : best;
  }, grades[0]);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Grade Attendance</div>
          <div className={styles.cardSub}>Students present per grade · this week</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: GRADE_COLORS[highGrade],
            background: `${GRADE_COLORS[highGrade]}12`,
            padding: "3px 8px",
            borderRadius: 20,
            border: `1px solid ${GRADE_COLORS[highGrade]}28`,
            letterSpacing: "0.02em",
          }}>
            {GRADE_SHORT[highGrade]} leading
          </span>
          <button
            className={styles.viewReportBtn}
            onClick={() => openAttendanceReport(data, selectedDate, dayDateMap)}
            title="Open full attendance report"
          >
            View Report
          </button>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <div className={styles.legend}>
          {grades.map((g) => {
            const isActive = hoveredGrade === g;
            const isDim = hoveredGrade !== null && !isActive;
            return (
              <button
                key={g}
                className={styles.legendItem}
                style={{ opacity: isDim ? 0.3 : 1, transition: "opacity 0.2s" }}
                onMouseEnter={() => setHoveredGrade(g)}
                onMouseLeave={() => setHoveredGrade(null)}
              >
                <span style={{
                  display: "inline-block",
                  width: isActive ? 16 : 10,
                  height: 2,
                  background: GRADE_COLORS[g],
                  borderRadius: 2,
                  flexShrink: 0,
                  transition: "width 0.15s",
                }} />
                <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.03em", color: "var(--text-secondary)" }}>
                  {GRADE_SHORT[g]}
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.svgWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
              onMouseLeave={() => setHoveredGrade(null)}
            >
              <ReferenceLine
                y={100}
                stroke="#e5e7eb"
                strokeDasharray="4 4"
                strokeWidth={1}
                label={{ value: "100", position: "insideTopRight", fontSize: 9, fill: "#d1d5db", dy: -4 }}
              />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "var(--text-muted, #9ca3af)", fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                domain={[minVal, maxVal]}
                tick={{ fontSize: 10, fill: "var(--text-muted, #9ca3af)" }}
                axisLine={false}
                tickLine={false}
                width={32}
                tickCount={4}
              />
              <Tooltip
                content={<CustomTooltip activeGrade={hoveredGrade} dayDateMap={dayDateMap} />}
                cursor={{ stroke: "#e5e7eb", strokeWidth: 1, strokeDasharray: "3 3" }}
              />

              {grades.map((g) => {
                const isActive = hoveredGrade === g;
                const isDim = hoveredGrade !== null && !isActive;
                return (
                  <Line
                    key={g}
                    type="linear"
                    dataKey={g}
                    stroke={GRADE_COLORS[g]}
                    strokeWidth={isActive ? 2.5 : isDim ? 0.8 : 1.5}
                    opacity={isDim ? 0.2 : 1}
                    dot={false}
                    activeDot={{
                      r: 4.5,
                      fill: GRADE_COLORS[g],
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    style={{ transition: "opacity 0.2s" }}
                    onMouseEnter={() => setHoveredGrade(g)}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}