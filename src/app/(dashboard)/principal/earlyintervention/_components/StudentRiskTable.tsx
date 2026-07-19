"use client";

import React, { useState, useMemo } from "react";
import styles from "./StudentRiskTable.module.css";
import { AtRiskStudent } from "./data";
import { SortIcon, TrendDownIcon, TrendUpIcon, MinusIcon } from "./Icons";
import { FilterBar, RiskFilter } from "./FilterBar";

type SortKey = "name" | "absences" | "gpa";
type SortDir = "asc" | "desc";

interface Props {
  students: AtRiskStudent[];
  onSelect: (student: AtRiskStudent) => void;
}

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "student" },
  { key: "absences", label: "absences" },
  { key: "gpa", label: "gpa" },
];

export function StudentRiskTable({ students, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [grade, setGrade] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("absences");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const grades = useMemo(
    () => Array.from(new Set(students.map((s) => s.grade))).sort((a, b) => Number(a) - Number(b)),
    [students]
  );

  const filtered = useMemo(() => {
    return students.filter((s) => {
      if (riskFilter !== "all" && s.risk !== riskFilter) return false;
      if (grade !== "all" && s.grade !== grade) return false;
      if (search.trim() && !s.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
      return true;
    });
  }, [students, search, riskFilter, grade]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      if (sortKey === "absences") cmp = a.absences - b.absences;
      if (sortKey === "gpa") cmp = a.gpa - b.gpa;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const TrendIcon = ({ trend }: { trend: AtRiskStudent["trend"] }) => {
    if (trend === "down") return <span className={styles.trendDown}><TrendDownIcon /></span>;
    if (trend === "up") return <span className={styles.trendUp}><TrendUpIcon /></span>;
    return <span className={styles.trendFlat}><MinusIcon /></span>;
  };

  const filterBar = (
    <div className={styles.filterRow}>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        riskFilter={riskFilter}
        onRiskFilterChange={setRiskFilter}
        grade={grade}
        onGradeChange={setGrade}
        grades={grades}
        resultCount={sorted.length}
      />
    </div>
  );

  if (sorted.length === 0) {
    return (
      <div className={styles.card}>
        {filterBar}
        <div className={styles.emptyState}>
          No students match these filters. Try widening your search or clearing a filter.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {filterBar}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key} className={styles.headerCell} onClick={() => handleSort(col.key)}>
                  <span className={styles.sortableHeader}>
                    {col.label}
                    <span className={sortKey === col.key ? "" : styles.sortIconInactive}>
                      <SortIcon />
                    </span>
                  </span>
                </th>
              ))}
              <th className={styles.headerCell}>grade / section</th>
              <th className={styles.headerCell}>risk</th>
              <th className={styles.headerCell}>flags</th>
              <th className={styles.headerCell}>trend</th>
              <th className={styles.headerCell}>last intervention</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr key={s.id} className={styles.row} onClick={() => onSelect(s)}>
                <td className={styles.cell}>
                  <div className={styles.studentCell}>
                    <div className={`${styles.avatar} ${s.risk === "high" ? styles.avatarHigh : styles.avatarMed}`}>
                      {s.avatar}
                    </div>
                    <div>
                      <div className={styles.studentName}>{s.name}</div>
                      <div className={styles.studentMeta}>{s.counselor}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.cell}>{s.absences}</td>
                <td className={styles.cell}>
                  <span className={s.gpa < 75 ? styles.gpaDanger : styles.gpaWarn}>{s.gpa}</span>
                </td>
                <td className={styles.cell}>
                  Grade {s.grade} — {s.section}
                </td>
                <td className={styles.cell}>
                  <span className={`${styles.riskBadge} ${s.risk === "high" ? styles.riskHigh : styles.riskMed}`}>
                    {s.risk === "high" ? "High" : "Medium"}
                  </span>
                </td>
                <td className={styles.cell}>
                  <div className={styles.flags}>
                    {s.flags.map((f) => (
                      <span key={f} className={styles.flag}>
                        {f}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={styles.cell}>
                  <div className={styles.trendCell}>
                    <TrendIcon trend={s.trend} />
                    {s.trend === "down" ? "Declining" : s.trend === "up" ? "Improving" : "Steady"}
                  </div>
                </td>
                <td className={styles.cell}>
                  {s.lastIntervention ?? <span className={styles.noneText}>None logged</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
