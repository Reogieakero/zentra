"use client";

import React from "react";
import styles from "./StudentToolbar.module.css";
import { SearchIcon, FilterIcon, DownloadIcon, StatsIcon } from "./icons/Icons";

const GRADES = ["All Grades", "8", "9", "10", "11", "12"];
const STATUSES = ["All Status", "Enrolled", "Pending", "Dropped", "Graduated"];

interface StudentToolbarProps {
  search: string;
  grade: string;
  statusFilter: string;
  showStats: boolean;
  onSearchChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onToggleStats: () => void;
  onExport: () => void;
}

export function StudentToolbar({
  search,
  grade,
  statusFilter,
  showStats,
  onSearchChange,
  onGradeChange,
  onStatusChange,
  onToggleStats,
  onExport,
}: StudentToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          className={styles.searchInput}
          placeholder="Search by name or LRN…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.filters}>
        <FilterIcon />
        <select
          className={styles.select}
          value={grade}
          onChange={(e) => onGradeChange(e.target.value)}
        >
          {GRADES.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button
          className={`${styles.iconBtn} ${showStats ? styles.iconBtnActive : ""}`}
          onClick={onToggleStats}
          title="Toggle stats"
        >
          <StatsIcon />
        </button>
      </div>

      <button className={styles.btnOutline} onClick={onExport}>
        <DownloadIcon /> Export
      </button>
    </div>
  );
}