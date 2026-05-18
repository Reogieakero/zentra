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
import type { Grade, GradeRow } from "./types";
import { grades, GRADE_COLORS, GRADE_SHORT } from "./constants";
import { CustomTooltip } from "./CustomTooltip";
import styles from "./ChartCard.module.css";

interface ChartCardProps {
  data: GradeRow[];
  dayDateMap: Record<string, string>;
  highGrade: Grade;
  onOpenReport?: () => void;
}

export function ChartCard({
  data,
  dayDateMap,
  highGrade,
  onOpenReport,
}: ChartCardProps) {
  const [hoveredGrade, setHoveredGrade] = useState<Grade | null>(null);

  const allVals = grades.flatMap((g) => data.map((r) => r[g]));
  const minVal = Math.floor(Math.min(...allVals) / 10) * 10 - 8;
  const maxVal = Math.ceil(Math.max(...allVals) / 10) * 10 + 4;

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div>
          <div className={styles.cardTitle}>Grade Attendance</div>
          <div className={styles.cardSub}>Students present per grade · this week</div>
        </div>
        <div className={styles.headerActions}>
          <span
            className={styles.leadingBadge}
            style={{
              color: GRADE_COLORS[highGrade],
              background: `${GRADE_COLORS[highGrade]}12`,
              border: `1px solid ${GRADE_COLORS[highGrade]}28`,
            }}
          >
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

      {/* Chart */}
      <div className={styles.chartWrap}>
        {/* Legend */}
        <div className={styles.legend}>
          {grades.map((g) => {
            const isActive = hoveredGrade === g;
            const isDim = hoveredGrade !== null && !isActive;
            return (
              <button
                key={g}
                className={styles.legendItem}
                style={{ opacity: isDim ? 0.3 : 1 }}
                onMouseEnter={() => setHoveredGrade(g)}
                onMouseLeave={() => setHoveredGrade(null)}
              >
                <span
                  className={styles.legendLine}
                  style={{
                    width: isActive ? 16 : 10,
                    background: GRADE_COLORS[g],
                  }}
                />
                <span className={styles.legendLabel}>{GRADE_SHORT[g]}</span>
              </button>
            );
          })}
        </div>

        {/* Recharts */}
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
                label={{
                  value: "100",
                  position: "insideTopRight",
                  fontSize: 9,
                  fill: "#d1d5db",
                  dy: -4,
                }}
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
                content={
                  <CustomTooltip
                    activeGrade={hoveredGrade}
                    dayDateMap={dayDateMap as Record<import("./types").Day, string>}
                  />
                }
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
                    activeDot={{ r: 4.5, fill: GRADE_COLORS[g], stroke: "#fff", strokeWidth: 2 }}
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