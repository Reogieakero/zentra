"use client";

import React from "react";
import styles from "./StudentToolbar.module.css";
import { SearchIcon, DownloadIcon, StatsIcon, EyeIcon, EyeOffIcon } from "./icons/Icons";

interface StudentToolbarProps {
  search: string;
  showStats: boolean;
  showLrn: boolean;
  onSearchChange: (value: string) => void;
  onToggleStats: () => void;
  onToggleLrn: () => void;
  onExport: () => void;
}

export function StudentToolbar({
  search,
  showStats,
  showLrn,
  onSearchChange,
  onToggleStats,
  onToggleLrn,
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

      <div className={styles.actions}>
        {/* Toggle LRN Visibility */}
        <button
          className={`${styles.iconBtn} ${!showLrn ? styles.iconBtnActive : ""}`}
          onClick={onToggleLrn}
          title={showLrn ? "Hide LRN columns" : "Show LRN columns"}
        >
          {showLrn ? <EyeOffIcon /> : <EyeIcon />}
        </button>

        {/* Toggle Stats Grid */}
        <button
          className={`${styles.iconBtn} ${showStats ? styles.iconBtnActive : ""}`}
          onClick={onToggleStats}
          title="Toggle stats"
        >
          <StatsIcon />
        </button>

        <button className={styles.btnOutline} onClick={onExport}>
          <DownloadIcon /> Export
        </button>
      </div>
    </div>
  );
}