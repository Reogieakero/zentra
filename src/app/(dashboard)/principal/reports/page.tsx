"use client";

import React, { useState } from "react";
import styles from "./reports.module.css";
import { ReportTypeCard } from "./_components/ReportTypeCard";
import { GenerateReportPanel } from "./_components/GenerateReportPanel";
import { ReportsHistory } from "./_components/ReportsHistory";
import {
  AttendanceIcon,
  Sf10Icon,
  EnrollmentIcon,
  AdmIcon,
  AnecdotalIcon,
} from "./_components/ReportIcons";

export type ReportType = "attendance" | "sf10" | "enrollment" | "adm" | "anecdotal";

export interface GeneratedReport {
  id: string;
  name: string;
  type: ReportType;
  range: string;
  format: string;
  generatedAt: string;
  status: "ready" | "generating" | "failed";
  size?: string;
}

interface ReportTypeInfo {
  id: ReportType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

const REPORT_TYPES: ReportTypeInfo[] = [
  { id: "attendance", label: "Attendance", description: "Daily & monthly trends", icon: <AttendanceIcon />, color: "var(--accent-emerald)", count: 18 },
  { id: "sf10", label: "SF10 Records", description: "Permanent academic records", icon: <Sf10Icon />, color: "var(--accent-indigo)", count: 9 },
  { id: "enrollment", label: "Enrollment", description: "New & transferred students", icon: <EnrollmentIcon />, color: "var(--accent-teal)", count: 6 },
  { id: "adm", label: "ADM", description: "Admission applications", icon: <AdmIcon />, color: "var(--accent-sky)", count: 4 },
  { id: "anecdotal", label: "Anecdotal", description: "Behavior & counseling notes", icon: <AnecdotalIcon />, color: "var(--accent-pink)", count: 3 },
];

const INITIAL_REPORTS: GeneratedReport[] = [
  { id: "r1", name: "Attendance Summary — July", type: "attendance", range: "This Month", format: "pdf", generatedAt: "Jul 18, 09:12 AM", status: "ready", size: "1.2 MB" },
  { id: "r2", name: "SF10 Records — Grade 10", type: "sf10", range: "This Quarter", format: "xlsx", generatedAt: "Jul 17, 04:41 PM", status: "ready", size: "3.4 MB" },
  { id: "r3", name: "Enrollment Report — SY 2025-2026", type: "enrollment", range: "This School Year", format: "pdf", generatedAt: "Jul 16, 11:03 AM", status: "ready", size: "890 KB" },
  { id: "r4", name: "ADM Applications — Week 3", type: "adm", range: "This Week", format: "csv", generatedAt: "Jul 15, 08:27 AM", status: "failed" },
  { id: "r5", name: "Anecdotal Records — June", type: "anecdotal", range: "This Month", format: "pdf", generatedAt: "Jun 30, 02:15 PM", status: "ready", size: "2.1 MB" },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<ReportType>("attendance");
  const [reports, setReports] = useState<GeneratedReport[]>(INITIAL_REPORTS);

  const isGenerating = reports.some((r) => r.status === "generating");
  const readyCount = reports.filter((r) => r.status === "ready").length;
  const selectedInfo = REPORT_TYPES.find((t) => t.id === selectedType)!;

  const handleGenerate = (range: string, rangeLabel: string, format: string) => {
    const id = `r${Date.now()}`;
    const newReport: GeneratedReport = {
      id,
      name: `${selectedInfo.label} Report — ${rangeLabel}`,
      type: selectedType,
      range: rangeLabel,
      format,
      generatedAt: "Just now",
      status: "generating",
    };

    setReports((prev) => [newReport, ...prev]);

    // Simulate report generation completing
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: "ready", size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB` }
            : r
        )
      );
    }, 2400);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>Reports</h1>
          <p className={styles.pageSubtitle}>Generate and review records for your school</p>
        </div>
        <div className={styles.statsStrip}>
          <div className={styles.statChip}>
            <span className={styles.statValue}>{reports.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statChip}>
            <span className={styles.statValue}>{readyCount}</span>
            <span className={styles.statLabel}>Ready</span>
          </div>
        </div>
      </header>

      <div>
        <h2 className={styles.sectionTitle}>Choose a report type</h2>
        <div className={styles.typeGrid}>
          {REPORT_TYPES.map((t) => (
            <ReportTypeCard
              key={t.id}
              label={t.label}
              description={t.description}
              icon={t.icon}
              color={t.color}
              count={t.count}
              selected={selectedType === t.id}
              onSelect={() => setSelectedType(t.id)}
            />
          ))}
        </div>
      </div>

      <GenerateReportPanel
        selectedTypeLabel={selectedInfo.label}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      />

      <ReportsHistory reports={reports} />
    </div>
  );
}
