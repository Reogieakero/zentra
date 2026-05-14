"use client";

import React, { useState, useMemo } from "react";
import styles from "./StudentsView.module.css";
import { SearchIcon, FilterIcon, DownloadIcon, ChevronIcon } from "./icons/Icons";
import { Student } from "../types/student";

const GRADES   = ["All Grades", "8", "9", "10", "11", "12"];
const STATUSES = ["All Status", "Enrolled", "Pending", "Dropped", "Graduated"];

interface StudentsViewProps {
  students: Student[];
  sectionFilter: string | null;
  onSelectStudent: (s: Student) => void;
}

export function StudentsView({ students, sectionFilter, onSelectStudent }: StudentsViewProps) {
  const [search, setSearch]       = useState("");
  const [grade, setGrade]         = useState("All Grades");
  const [statusFilter, setStatus] = useState("All Status");
  const [sortKey, setSortKey]     = useState<keyof Student>("name");
  const [sortDir, setSortDir]     = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof Student) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = useMemo(() => students
    .filter(s => {
      const q = search.toLowerCase();
      return (
        (s.name.toLowerCase().includes(q) || s.lrn.includes(q)) &&
        (grade === "All Grades" || s.grade === grade) &&
        (statusFilter === "All Status" || s.status === statusFilter) &&
        (sectionFilter === null || s.section === sectionFilter)
      );
    })
    .sort((a, b) => {
      const cmp = String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? ""), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    }),
  [search, grade, statusFilter, sortKey, sortDir, sectionFilter, students]);

  const SortBtn = ({ col }: { col: keyof Student }) => (
    <span className={styles.sortBtn} onClick={() => handleSort(col)}>
      {sortKey === col
        ? <ChevronIcon dir={sortDir === "asc" ? "up" : "down"} />
        : <span className={styles.sortIdle}>↕</span>}
    </span>
  );

  const total    = filtered.length;
  const enrolled = filtered.filter(s => s.status === "Enrolled").length;
  const atRisk   = filtered.filter(s => s.risk === "High" || s.risk === "Medium").length;
  const avgGpa   = total > 0
    ? (filtered.reduce((sum, s) => sum + s.gpa, 0) / total).toFixed(1)
    : "—";

  return (
    <div className={styles.viewPane}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLbl}>Total Students</span>
          <span className={styles.statVal}>{total}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLbl}>Enrolled</span>
          <span className={styles.statVal} style={{ color: "#059669" }}>{enrolled}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLbl}>Students At Risk</span>
          <span className={styles.statVal} style={{ color: "#dc2626" }}>{atRisk}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLbl}>Average GPA</span>
          <span className={styles.statVal} style={{ color: "var(--color-primary, #6d28d9)" }}>{avgGpa}</span>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            className={styles.searchInput}
            placeholder="Search by name or LRN…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <FilterIcon />
          <select className={styles.select} value={grade} onChange={e => setGrade(e.target.value)}>
            {GRADES.map(g => <option key={g}>{g}</option>)}
          </select>
          <select className={styles.select} value={statusFilter} onChange={e => setStatus(e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button className={styles.btnOutline}><DownloadIcon /> Export</button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}><span className={styles.thInner}>Student <SortBtn col="name" /></span></th>
              <th className={styles.th}><span className={styles.thInner}>LRN <SortBtn col="lrn" /></span></th>
              <th className={styles.th}><span className={styles.thInner}>Grade <SortBtn col="grade" /></span></th>
              {sectionFilter === null && <th className={styles.th}>Section</th>}
              <th className={styles.th}><span className={styles.thInner}>GPA <SortBtn col="gpa" /></span></th>
              <th className={styles.th}><span className={styles.thInner}>Absences <SortBtn col="absences" /></span></th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Risk</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={sectionFilter === null ? 8 : 7} className={styles.empty}>
                  No students match your filters.
                </td>
              </tr>
            ) : filtered.map((s) => (
              <tr
                key={s.id}
                className={styles.row}
                onClick={() => onSelectStudent(s)}
              >
                <td className={styles.td}>
                  <div className={styles.studentCell}>
                    <div className={`${styles.avatar} ${
                      s.risk === "High"   ? styles.avatarHigh :
                      s.risk === "Medium" ? styles.avatarMed  : styles.avatarDefault
                    }`}>{s.avatar}</div>
                    <div>
                      <p className={styles.studentName}>{s.name}</p>
                      <p className={styles.studentGender}>{s.gender}</p>
                    </div>
                  </div>
                </td>
                <td className={styles.td}><span className={styles.lrn}>{s.lrn}</span></td>
                <td className={styles.td}><span className={styles.gradeChip}>G{s.grade}</span></td>
                {sectionFilter === null && <td className={styles.td}>{s.section}</td>}
                <td className={styles.td}>
                  <span className={`${styles.gpa} ${
                    s.gpa < 75 ? styles.gpaDanger :
                    s.gpa < 80 ? styles.gpaWarn   : styles.gpaGood
                  }`}>{s.gpa}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.absences} ${
                    s.absences >= 10 ? styles.absHigh :
                    s.absences >= 5  ? styles.absMed  : ""
                  }`}>{s.absences}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.statusChip} ${
                    s.status === "Enrolled"  ? styles.statusEnrolled  :
                    s.status === "Pending"   ? styles.statusPending   :
                    s.status === "Dropped"   ? styles.statusDropped   :
                    styles.statusGraduated
                  }`}>{s.status}</span>
                </td>
                <td className={styles.td}>
                  {s.risk ? (
                    <span className={`${styles.riskChip} ${
                      s.risk === "High" ? styles.riskHigh : styles.riskMed
                    }`}>{s.risk}</span>
                  ) : (
                    <span className={styles.riskNone}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.resultCount}>
        Showing <strong>{filtered.length}</strong> of <strong>{total}</strong> students
      </div>
    </div>
  );
}