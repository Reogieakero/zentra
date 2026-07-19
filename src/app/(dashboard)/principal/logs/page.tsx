"use client";

import React, { useMemo, useState } from "react";
import styles from "./logs.module.css";
import { LogsFilterBar } from "./_components/LogsFilterBar";
import { LogsTable } from "./_components/LogsTable";
import type { LogEntry } from "./_components/logTypes";

const INITIAL_LOGS: LogEntry[] = [
  { id: "l1", timestamp: "Jul 19, 2026 09:42:11", severity: "info", category: "enrollment", actor: "Maria Santos", action: "Enrolled in Grade 10 — Section Rizal", details: "New student record created and linked to Section Rizal roster.", ip: "192.168.1.42" },
  { id: "l2", timestamp: "Jul 19, 2026 09:27:04", severity: "info", category: "sf10", actor: "J. Dizon (Registrar)", action: "Updated academic records — Section A, Grade 10", details: "Grades for Q4 imported from the SF9 batch upload.", ip: "192.168.1.18" },
  { id: "l3", timestamp: "Jul 19, 2026 08:55:38", severity: "warning", category: "adm", actor: "System", action: "ADM application #2024-014 missing birth certificate", details: "Applicant document checklist is incomplete; registrar has been notified.", ip: "10.0.0.5" },
  { id: "l4", timestamp: "Jul 19, 2026 08:31:20", severity: "info", category: "sf10", actor: "R. Cruz (Registrar)", action: "Records updated — Grade 8, Section Mabini", details: "Updated home address and guardian contact information.", ip: "192.168.1.18" },
  { id: "l5", timestamp: "Jul 19, 2026 07:58:47", severity: "error", category: "auth", actor: "unknown@mail.com", action: "Failed login attempt (5th try)", details: "Account temporarily locked after repeated failed password attempts.", ip: "203.0.113.77" },
  { id: "l6", timestamp: "Jul 19, 2026 07:14:02", severity: "info", category: "adm", actor: "J. Dizon (Registrar)", action: "ID #2024-002 approved and verified", details: "Applicant documents verified against submitted requirements.", ip: "192.168.1.18" },
  { id: "l7", timestamp: "Jul 18, 2026 16:45:12", severity: "info", category: "sf10", actor: "System", action: "Bulk document export processed for Senior High", details: "312 SF10 records exported as a single PDF batch.", ip: "10.0.0.5" },
  { id: "l8", timestamp: "Jul 18, 2026 15:12:00", severity: "warning", category: "attendance", actor: "System", action: "Attendance sync delayed for Section Bonifacio", details: "Biometric device offline for 40 minutes; manual entry required.", ip: "10.0.0.9" },
  { id: "l9", timestamp: "Jul 18, 2026 14:03:51", severity: "info", category: "announcement", actor: "Principal's Office", action: "Published \"Brigada Eskwela — Saturday Cleanup Drive\"", details: "Announcement pinned and sent to all audiences.", ip: "192.168.1.5" },
  { id: "l10", timestamp: "Jul 18, 2026 11:20:09", severity: "error", category: "system", actor: "System", action: "Scheduled backup failed", details: "Nightly database backup job exited with a connection timeout.", ip: "10.0.0.2" },
  { id: "l11", timestamp: "Jul 18, 2026 10:47:33", severity: "info", category: "anecdotal", actor: "G. Reyes (Guidance)", action: "Logged counseling note for Grade 9 student", details: "Behavioral note added following a scheduled guidance session.", ip: "192.168.1.31" },
  { id: "l12", timestamp: "Jul 18, 2026 09:05:47", severity: "info", category: "auth", actor: "admin@school.edu", action: "Logged in from a new device", details: "First login from this device; verified via one-time code.", ip: "192.168.1.5" },
  { id: "l13", timestamp: "Jul 17, 2026 16:58:02", severity: "info", category: "enrollment", actor: "Ana Reyes", action: "Enrolled in Grade 7 — Section Bonifacio", details: "New student record created and linked to Section Bonifacio roster.", ip: "192.168.1.44" },
  { id: "l14", timestamp: "Jul 17, 2026 14:22:15", severity: "warning", category: "adm", actor: "System", action: "Duplicate applicant record flagged", details: "Applicant #2024-018 shares matching name and birthdate with an existing record.", ip: "10.0.0.5" },
];

const ROTATING_ACTIONS: Array<Pick<LogEntry, "category" | "action" | "details" | "actor" | "severity">> = [
  { category: "attendance", severity: "info", actor: "System", action: "Attendance sync completed for all sections", details: "Biometric attendance data synced successfully for the current period." },
  { category: "auth", severity: "info", actor: "admin@school.edu", action: "Logged in", details: "Successful login from a recognized device." },
  { category: "sf10", severity: "info", actor: "R. Cruz (Registrar)", action: "Generated SF10 export batch", details: "Export batch generated and queued for download." },
];

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [severity, setSeverity] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const matchesSearch =
        search.trim().length === 0 ||
        l.actor.toLowerCase().includes(search.toLowerCase()) ||
        l.action.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || l.category === category;
      const matchesSeverity = severity === "all" || l.severity === severity;
      return matchesSearch && matchesCategory && matchesSeverity;
    });
  }, [logs, search, category, severity]);

  const warningCount = logs.filter((l) => l.severity === "warning").length;
  const errorCount = logs.filter((l) => l.severity === "error").length;

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      const next = ROTATING_ACTIONS[Math.floor(Math.random() * ROTATING_ACTIONS.length)];
      const newLog: LogEntry = {
        id: `l${Date.now()}`,
        timestamp: "Just now",
        ip: "192.168.1.5",
        ...next,
      };
      setLogs((prev) => [newLog, ...prev]);
      setIsRefreshing(false);
    }, 700);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerArea}>
        <div>
          <h1 className={styles.pageTitle}>System Logs</h1>
          <p className={styles.pageSubtitle}>Track admin activity, sync events, and system alerts</p>
        </div>
        <div className={styles.statsStrip}>
          <div className={styles.statChip}>
            <span className={styles.statValue}>{logs.length}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statChip}>
            <span className={`${styles.statValue} ${styles.statValueWarning}`}>{warningCount}</span>
            <span className={styles.statLabel}>Warnings</span>
          </div>
          <div className={styles.statChip}>
            <span className={`${styles.statValue} ${styles.statValueError}`}>{errorCount}</span>
            <span className={styles.statLabel}>Errors</span>
          </div>
        </div>
      </header>

      <LogsFilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        severity={severity}
        onSeverityChange={setSeverity}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <LogsTable logs={filtered} />
    </div>
  );
}
