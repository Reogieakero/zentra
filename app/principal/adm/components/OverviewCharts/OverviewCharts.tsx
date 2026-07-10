"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip
} from "recharts";
import styles from "./OverviewCharts.module.css";
import { statusChartData, reasonChartData } from "../../data/mockData";

export default function OverviewCharts() {
  return (
    <div className={`${styles.cardContainer} ${styles.fadeInUp}`} style={{ animationDelay: "0.15s" }}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>ADM Overview</h2>
      </div>
      <div className={styles.chartsGridInline}>
        <div className={styles.chartBlockContainer}>
          <span className={styles.chartBlockSubText}>Number of students by ADM status</span>
          <div className={styles.analyticsChart}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusChartData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
                <Tooltip
                  cursor={{ fill: "rgba(124, 58, 237, 0.04)" }}
                  contentStyle={{ background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={28}>
                  {statusChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.highlight ? "var(--brand-primary, #7c3aed)" : "var(--bg-subtle, #e5e7eb)"}
                      className={styles.interactiveBar}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartBlockContainer}>
          <span className={styles.chartBlockSubText}>Number of students by reason for ADM</span>
          <div className={styles.analyticsChart}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reasonChartData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 9 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 11 }} />
                <Tooltip
                  cursor={{ fill: "rgba(124, 58, 237, 0.04)" }}
                  contentStyle={{ background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "6px", fontSize: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="count" fill="var(--brand-primary, #7c3aed)" radius={[4, 4, 0, 0]} maxBarSize={20} className={styles.interactiveBar} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
