"use client";

import React, { useState, useMemo } from "react";
import styles from "./StudentsView.module.css";
import { SearchIcon, FilterIcon, DownloadIcon, ChevronIcon, StatsIcon } from "./icons/Icons";
import { Student } from "../types/student";

const GRADES = ["All Grades", "8", "9", "10", "11", "12"];
const STATUSES = ["All Status", "Enrolled", "Pending", "Dropped", "Graduated"];

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
  const [riskFilter, setRiskFilter] = useState<boolean>(false);

  const handleSort = (key: keyof Student) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = useMemo(() => students
    .filter(s => {
      const q = search.toLowerCase();
      const matchesSearch = (s.name.toLowerCase().includes(q) || s.lrn.includes(q));
      const matchesGrade = (grade === "All Grades" || s.grade === grade);
      const matchesStatus = (statusFilter === "All Status" || s.status === statusFilter);
      const matchesSection = (sectionFilter === null || s.section === sectionFilter);
      const matchesRisk = !riskFilter || (s.risk === "High" || s.risk === "Medium");

      return matchesSearch && matchesGrade && matchesStatus && matchesSection && matchesRisk;
    })
    .sort((a, b) => {
      const cmp = String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? ""), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    }),
  [search, grade, statusFilter, sortKey, sortDir, sectionFilter, students, riskFilter]);

  const stats = useMemo(() => {
    const base = students.filter(s => sectionFilter === null || s.section === sectionFilter);
    return {
      total: base.length,
      enrolled: base.filter(s => s.status === "Enrolled").length,
      atRisk: base.filter(s => s.risk === "High" || s.risk === "Medium").length,
      avgGpa: base.length > 0 ? (base.reduce((sum, s) => sum + s.gpa, 0) / base.length).toFixed(1) : "—"
    };
  }, [students, sectionFilter]);

  const SortBtn = ({ col }: { col: keyof Student }) => (
    <span className={styles.sortBtn} onClick={() => handleSort(col)}>
      {sortKey === col
        ? <ChevronIcon dir={sortDir === "asc" ? "up" : "down"} />
        : <span style={{ fontSize: "10px", opacity: 0.4 }}>↕</span>}
    </span>
  );

  return (
    <div className={styles.viewPane}>
      <div className={`${styles.statsWrapper} ${showStats ? styles.statsWrapperVisible : ""}`}>
        <div className={styles.statsGrid}>
          <div 
            className={`${styles.statCard} ${statusFilter === "All Status" && !riskFilter ? styles.statCardActive : ""}`}
            onClick={() => { setStatus("All Status"); setRiskFilter(false); }}
          >
            <div className={styles.chromeDots}>
              <div className={`${styles.dot} ${styles.dotRed}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <span className={styles.statLbl}>Total Students</span>
            <span className={styles.statVal}>{stats.total}</span>
          </div>

          <div 
            className={`${styles.statCard} ${statusFilter === "Enrolled" ? styles.statCardActive : ""}`}
            onClick={() => { setStatus("Enrolled"); setRiskFilter(false); }}
          >
            <div className={styles.chromeDots}>
              <div className={`${styles.dot} ${styles.dotRed}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <span className={styles.statLbl}>Enrolled</span>
            <span className={styles.statVal} style={{ color: "#10b981" }}>{stats.enrolled}</span>
          </div>

          <div 
            className={`${styles.statCard} ${riskFilter ? styles.statCardActive : ""}`}
            onClick={() => { setRiskFilter(true); setStatus("All Status"); }}
          >
            <div className={styles.chromeDots}>
              <div className={`${styles.dot} ${styles.dotRed}`} />
              <div className={`${styles.dot} ${styles.dotYellow}`} />
              <div className={`${styles.dot} ${styles.dotGreen}`} />
            </div>
            <span className={styles.statLbl}>Students At Risk</span>
            <span className={styles.statVal} style={{ color: "#ef4444" }}>{stats.atRisk}</span>
          </div>

          <div className={styles.statCard} style={{ cursor: "default" }}>
            <div className={styles.chromeDots}>
              <div className={styles.dot} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </div>
            <span className={styles.statLbl}>Average GPA</span>
            <span className={styles.statVal} style={{ color: "var(--brand-primary)" }}>{stats.avgGpa}</span>
          </div>
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
          <button 
            className={`${styles.iconBtn} ${showStats ? styles.iconBtnActive : ""}`}
            onClick={() => setShowStats(!showStats)}
          >
            <StatsIcon />
          </button>
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
            {filtered.map((s) => (
              <tr key={s.id} className={styles.row} onClick={() => onSelectStudent(s)}>
                <td className={styles.td}>
                  <div className={styles.studentCell}>
                    <div className={`${styles.avatar} ${
                      s.risk === "High" ? styles.avatarHigh :
                      s.risk === "Medium" ? styles.avatarMed : styles.avatarDefault
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
                    s.gpa < 75 ? styles.gpaDanger : s.gpa < 80 ? styles.gpaWarn : styles.gpaGood
                  }`}>{s.gpa}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.absences} ${
                    s.absences >= 10 ? styles.absHigh : s.absences >= 5 ? styles.absMed : ""
                  }`}>{s.absences}</span>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.statusChip} ${
                    s.status === "Enrolled" ? styles.statusEnrolled : ""
                  }`}>{s.status}</span>
                </td>
                <td className={styles.td}>
                  {s.risk ? (
                    <span className={`${styles.riskChip} ${
                      s.risk === "High" ? styles.riskHigh : styles.riskMed
                    }`}>{s.risk}</span>
                  ) : <span>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.resultCount}>
        Showing <strong>{filtered.length}</strong> of <strong>{stats.total}</strong> students
      </div>
    </div>
  );
}