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

interface HeatmapCardProps {
  selectedDate: Date | null;
  onOpenReport?: () => void;
  isReportActive?: boolean;
}

export function HeatmapCard({ selectedDate, onOpenReport, isReportActive }: HeatmapCardProps) {
  const [hoveredGrade, setHoveredGrade] = useState<Grade | null>(null);

  const key = toDateStr(selectedDate);
  const data = (key && dataByDate[key]) ? dataByDate[key] : fallback;
  const dayDateMap = buildDayDateMap(selectedDate);

  const allVals = grades.flatMap((g) => data.map((r) => r[g]));
  const minVal = Math.floor(Math.min(...allVals) / 10) * 10 - 8;
  const maxVal = Math.ceil(Math.max(...allVals) / 10) * 10 + 4;

  const highGrade = grades.reduce((best, g) => {
    const avg = data.reduce((s, r) => s + r[g], 0) / data.length;
    const bestAvg = data.reduce((s, r) => s + r[best], 0) / data.length;
    return avg > bestAvg ? g : best;
  }, grades[0]);

  const days: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

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

  const dayTotals = days.map((day) => {
    const row = data.find((r) => r.day === day)!;
    const total = grades.reduce((s, g) => s + row[g], 0);
    return { day, total, date: dayDateMap[day] };
  });

  const grandTotal = dayTotals.reduce((s, d) => s + d.total, 0);
  const highestDay = dayTotals.reduce((best, d) => d.total > best.total ? d : best);
  const lowestDay = dayTotals.reduce((best, d) => d.total < best.total ? d : best);
  const leadingGrade = gradeStats.reduce((best, g) => g.avg > best.avg ? g : best);

  const chartMin = Math.min(...allVals) - 5;
  const chartMax = Math.max(...allVals) + 5;

  function sparkPoints(vals: number[]): string {
    return vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * 120;
      const y = 36 - ((v - chartMin) / (chartMax - chartMin)) * 36;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
  }

  const weekLabel = selectedDate
    ? `Week of ${new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
    : "Current Week";

  if (isReportActive) {
    return (
      <div className={styles.reportContainer}>
        <div className={styles.reportHeader}>
          <div>
            <div className={styles.headerEyebrow}>Weekly Attendance Report</div>
            <div className={styles.headerTitle}>Grade Attendance Summary</div>
            <div className={styles.headerSub}>{weekLabel} · All Grade Levels</div>
          </div>
          <div className={styles.headerMeta}>
            Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            <br />
            {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        <div className={styles.page}>
          <div className={styles.kpiRow}>
            <div className={styles.kpi}>
              <div className={styles.kpiLabel}>Total Students</div>
              <div className={styles.kpiValue}>{grandTotal.toLocaleString()}</div>
              <div className={styles.kpiNote}>across all grades &amp; days</div>
            </div>
            <div className={styles.kpi}>
              <div className={styles.kpiLabel}>Daily Average</div>
              <div className={styles.kpiValue}>{Math.round(grandTotal / 5).toLocaleString()}</div>
              <div className={styles.kpiNote}>per school day</div>
            </div>
            <div className={styles.kpi}>
              <div className={styles.kpiLabel}>Peak Day</div>
              <div className={styles.kpiValue}>{highestDay.day}</div>
              <div className={styles.kpiNote}>
                <strong>{highestDay.total}</strong> students · {highestDay.date}
              </div>
            </div>
            <div className={styles.kpi}>
              <div className={styles.kpiLabel}>Leading Grade</div>
              <div className={styles.kpiValue} style={{ color: GRADE_COLORS[leadingGrade.grade] }}>
                {GRADE_SHORT[leadingGrade.grade]}
              </div>
              <div className={styles.kpiNote}>
                avg <strong>{leadingGrade.avg.toFixed(1)}</strong> students/day
              </div>
            </div>
          </div>

          <div className={styles.chartSection}>
            <div className={styles.sectionLabel}>Attendance Trend — By Grade</div>
            <div className={styles.chartBox}>
              <div className={styles.chartLegend}>
                {grades.map((g) => (
                  <div key={g} className={styles.legendItemInline}>
                    <span className={styles.legendDotInline} style={{ background: GRADE_COLORS[g] }}></span>
                    {g}
                  </div>
                ))}
              </div>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: -10 }}>
                    <ReferenceLine y={100} stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth={1} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[minVal, maxVal]} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={35} />
                    <Tooltip content={<CustomTooltip activeGrade={hoveredGrade} dayDateMap={dayDateMap} />} />
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
            {gradeStats.map(({ grade, avg, peak, peakDay, low, lowDay, trend, vals }) => (
              <div key={grade} className={styles.gradeCard}>
                <div className={styles.gradeCardAccent} style={{ background: GRADE_COLORS[grade] }}></div>
                <div className={styles.gradeName}>{grade}</div>
                <div className={styles.gradeAvg}>
                  {avg.toFixed(1)}
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 400 }}> avg</span>
                </div>
                <div className={styles.gradeStats}>
                  <span>Peak <strong>{peak} ({peakDay})</strong></span>
                  <span>Low <strong>{low} ({lowDay})</strong></span>
                  <span className={trend >= 0 ? styles.trendUp : styles.trendDown}>
                    {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)} Mon→Fri
                  </span>
                </div>
                <div className={styles.gradeSpark}>
                  <svg viewBox="0 0 120 36" style={{ width: "100%", maxWidth: "160px", display: "block" }}>
                    <polyline points={sparkPoints(vals)} fill="none" stroke={GRADE_COLORS[grade]} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
                    {vals.map((v, i) => {
                      const x = (i / (vals.length - 1)) * 120;
                      const y = 36 - ((v - chartMin) / (chartMax - chartMin)) * 36;
                      return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.5" fill={GRADE_COLORS[grade]} stroke="#fff" strokeWidth="1.5" />;
                    })}
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.tableSection}>
            <div className={styles.sectionLabel}>Daily Attendance by Grade</div>
            <table className={styles.reportTable}>
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
                  {grades.map((g) => {
                    const sum = data.reduce((s, r) => s + r[g], 0);
                    return <td key={g}>{sum}</td>;
                  })}
                  <td>{grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.noteBox}>
            <strong className={styles.noteTitle}>Note</strong><br />
            Lowest attendance was recorded on <strong>{lowestDay.day}</strong> ({lowestDay.date}) with <strong>{lowestDay.total}</strong> total students present.
            Friday attendance is consistently lower across all grade levels. Consider targeted engagement initiatives for end-of-week sessions.
          </div>
        </div>

        <div className={styles.reportFooter}>
          <span>Grade Attendance Report · {weekLabel}</span>
          <span>Generated by Attendance System</span>
        </div>
      </div>
    );
  }

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
          {onOpenReport && (
            <button
              className={styles.viewReportBtn}
              onClick={onOpenReport}
              title="Open full attendance report"
            >
              View Report
            </button>
          )}
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