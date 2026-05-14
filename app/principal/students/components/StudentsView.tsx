"use client";

import React, { useState, useMemo } from "react";
import styles from "./StudentsView.module.css";
import { StudentStats } from "./StudentStats";
import { StudentToolbar } from "./StudentToolbar";
import { StudentTable } from "./StudentTable";
import { Student } from "../types/student";

interface StudentsViewProps {
  students: Student[];
  sectionFilter: string | null;
  onSelectStudent: (s: Student) => void;
}

export function StudentsView({ students, sectionFilter, onSelectStudent }: StudentsViewProps) {
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("All Grades");
  const [statusFilter, setStatus] = useState("All Status");
  const [sortKey, setSortKey] = useState<keyof Student>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [showStats, setShowStats] = useState(true);
  const [riskFilter, setRiskFilter] = useState(false);
  
  // ── ADDED STATE FOR LRN VISIBILITY ──
  const [showLrn, setShowLrn] = useState(true); 

  const handleSort = (key: keyof Student) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const stats = useMemo(() => {
    const base = students.filter(
      (s) => sectionFilter === null || s.section === sectionFilter
    );
    return {
      total: base.length,
      enrolled: base.filter((s) => s.status === "Enrolled").length,
      atRisk: base.filter((s) => s.risk === "High" || s.risk === "Medium").length,
      avgGpa:
        base.length > 0
          ? (base.reduce((sum, s) => sum + s.gpa, 0) / base.length).toFixed(1)
          : "—",
    };
  }, [students, sectionFilter]);

  const filtered = useMemo(
    () =>
      students
        .filter((s) => {
          const q = search.toLowerCase();
          return (
            (s.name.toLowerCase().includes(q) || s.lrn.includes(q)) &&
            (grade === "All Grades" || s.grade === grade) &&
            (statusFilter === "All Status" || s.status === statusFilter) &&
            (sectionFilter === null || s.section === sectionFilter) &&
            (!riskFilter || s.risk === "High" || s.risk === "Medium")
          );
        })
        .sort((a, b) => {
          const cmp = String(a[sortKey] ?? "").localeCompare(
            String(b[sortKey] ?? ""),
            undefined,
            { numeric: true }
          );
          return sortDir === "asc" ? cmp : -cmp;
        }),
    [search, grade, statusFilter, sortKey, sortDir, sectionFilter, students, riskFilter]
  );

  const handleExport = () => {
    console.log("Export triggered");
  };

  return (
    <div className={styles.viewPane}>
      <StudentStats
        stats={stats}
        visible={showStats}
        statusFilter={statusFilter}
        riskFilter={riskFilter}
        onShowAll={() => { setStatus("All Status"); setRiskFilter(false); }}
        onShowEnrolled={() => { setStatus("Enrolled"); setRiskFilter(false); }}
        onShowAtRisk={() => { setRiskFilter(true); setStatus("All Status"); }}
      />

      <StudentToolbar
        search={search}
        showStats={showStats}
        showLrn={showLrn} // Fixed error by passing defined state
        onSearchChange={setSearch}
        onToggleStats={() => setShowStats((v) => !v)}
        onToggleLrn={() => setShowLrn((v) => !v)} // Fixed error by passing defined setter
        onExport={handleExport}
      />

      <StudentTable
        students={filtered}
        totalCount={stats.total}
        sortKey={sortKey}
        sortDir={sortDir}
        sectionFilter={sectionFilter}
        onSort={handleSort}
        onSelectStudent={onSelectStudent}
        showLrn={showLrn}
      />
    </div>
  );
}