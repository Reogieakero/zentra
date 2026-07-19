"use client";

import React, { useMemo, useState } from "react";
import styles from "./ReportsHistory.module.css";
import { FilterSelect } from "@/components/ui/filter-select";
import { DownloadIcon, SpinnerIcon, XCircleIcon, CheckIcon } from "./ReportIcons";
import type { GeneratedReport, ReportType } from "../page";

const TYPE_COLORS: Record<ReportType, string> = {
  attendance: "var(--accent-emerald)",
  sf10: "var(--accent-indigo)",
  enrollment: "var(--accent-teal)",
  adm: "var(--accent-sky)",
  anecdotal: "var(--accent-pink)",
};

const TYPE_LABELS: Record<ReportType, string> = {
  attendance: "ATTENDANCE",
  sf10: "SF10",
  enrollment: "ENROLLMENT",
  adm: "ADM",
  anecdotal: "ANECDOTAL",
};

const FILTER_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "attendance", label: "Attendance" },
  { value: "sf10", label: "SF10 Records" },
  { value: "enrollment", label: "Enrollment" },
  { value: "adm", label: "ADM" },
  { value: "anecdotal", label: "Anecdotal" },
];

interface ReportsHistoryProps {
  reports: GeneratedReport[];
}

export function ReportsHistory({ reports }: ReportsHistoryProps) {
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    if (typeFilter === "all") return reports;
    return reports.filter((r) => r.type === typeFilter);
  }, [reports, typeFilter]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Generated Reports</h2>
          <span className={styles.count}>{filtered.length} of {reports.length}</span>
        </div>
        <div className={styles.filterRow}>
          <FilterSelect options={FILTER_OPTIONS} value={typeFilter} onChange={setTypeFilter} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          No reports match this filter yet. Generate one using the panel above.
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.headerCell}>Report</th>
                <th className={styles.headerCell}>Type</th>
                <th className={styles.headerCell}>Range</th>
                <th className={styles.headerCell}>Generated</th>
                <th className={styles.headerCell}>Status</th>
                <th className={styles.headerCell}>Size</th>
                <th className={styles.headerCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className={styles.row}>
                  <td className={styles.cell}>
                    <div className={styles.reportName}>{r.name}</div>
                    <div className={styles.reportMeta}>{r.format.toUpperCase()}</div>
                  </td>
                  <td className={styles.cell}>
                    <span
                      className={styles.typeTag}
                      style={{ color: TYPE_COLORS[r.type], borderColor: TYPE_COLORS[r.type] }}
                    >
                      {TYPE_LABELS[r.type]}
                    </span>
                  </td>
                  <td className={styles.cell}>{r.range}</td>
                  <td className={styles.cell}>{r.generatedAt}</td>
                  <td className={styles.cell}>
                    <StatusBadge status={r.status} />
                  </td>
                  <td className={styles.cell}>{r.size ?? "—"}</td>
                  <td className={styles.cell}>
                    <button
                      className={styles.downloadBtn}
                      disabled={r.status !== "ready"}
                      type="button"
                    >
                      <DownloadIcon />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function StatusBadge({ status }: { status: GeneratedReport["status"] }) {
  if (status === "ready") {
    return (
      <span className={`${styles.statusBadge} ${styles.statusReady}`}>
        <CheckIcon />
        Ready
      </span>
    );
  }
  if (status === "generating") {
    return (
      <span className={`${styles.statusBadge} ${styles.statusGenerating}`}>
        <span className={styles.spinning}>
          <SpinnerIcon />
        </span>
        Generating
      </span>
    );
  }
  return (
    <span className={`${styles.statusBadge} ${styles.statusFailed}`}>
      <XCircleIcon />
      Failed
    </span>
  );
}
