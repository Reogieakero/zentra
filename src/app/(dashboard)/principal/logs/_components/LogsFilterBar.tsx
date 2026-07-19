"use client";

import React from "react";
import styles from "./LogsFilterBar.module.css";
import { FilterSelect } from "@/components/ui/filter-select";
import { Button } from "@/components/ui/button";
import { CATEGORY_LIST } from "./logTypes";
import { SearchIcon, DownloadIcon, RefreshIcon } from "./LogIcons";

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  ...CATEGORY_LIST.map((c) => ({ value: c.id, label: c.label })),
];

const SEVERITY_OPTIONS = [
  { value: "all", label: "All Severities" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
];

interface LogsFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  severity: string;
  onSeverityChange: (v: string) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function LogsFilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  severity,
  onSeverityChange,
  isRefreshing,
  onRefresh,
}: LogsFilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>
          <SearchIcon />
        </span>
        <input
          className={styles.searchInput}
          placeholder="Search logs by actor or action..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <FilterSelect options={CATEGORY_OPTIONS} value={category} onChange={onCategoryChange} />
      <FilterSelect options={SEVERITY_OPTIONS} value={severity} onChange={onSeverityChange} />

      <div className={styles.spacer} />

      <button
        type="button"
        className={styles.iconBtn}
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label="Refresh logs"
      >
        <span className={isRefreshing ? styles.spinning : undefined}>
          <RefreshIcon />
        </span>
        Refresh
      </button>

      <Button variant="outline" size="sm" type="button">
        <DownloadIcon />
        Export
      </Button>
    </div>
  );
}
