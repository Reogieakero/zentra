"use client";

import React from "react";
import styles from "./FilterBar.module.css";
import { SearchIcon } from "./Icons";
import { RiskLevel } from "./data";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/ui/filter-select";

export type RiskFilter = "all" | RiskLevel;

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  riskFilter: RiskFilter;
  onRiskFilterChange: (v: RiskFilter) => void;
  grade: string;
  onGradeChange: (v: string) => void;
  grades: string[];
  resultCount: number;
}

const TABS: { key: RiskFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "high", label: "High Risk" },
  { key: "medium", label: "Medium Risk" },
];

// Inline overrides layered on top of the Button component for the active tab.
// (button.module.css's "danger" variant depends on --color-danger, which
// globals.css doesn't define, so risk color is applied this way instead —
// same pattern already used for per-instance color on MetricCard.)
const ACTIVE_TAB_STYLE: Record<RiskFilter, React.CSSProperties> = {
  all: { background: "var(--brand-gradient)", color: "var(--text-white)", borderColor: "transparent" },
  high: { background: "var(--text-red, #dc2626)", color: "var(--text-white)", borderColor: "transparent" },
  medium: { background: "var(--text-amber, #d97706)", color: "var(--text-white)", borderColor: "transparent" },
};

export function FilterBar({
  search,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  grade,
  onGradeChange,
  grades,
  resultCount,
}: Props) {
  const gradeOptions = [
    { value: "all", label: "All Grades" },
    ...grades.map((g) => ({ value: g, label: `Grade ${g}` })),
  ];

  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className={styles.riskTabs}>
          {TABS.map((tab) => (
            <Button
              key={tab.key}
              type="button"
              variant="secondary"
              size="sm"
              className={styles.riskTab}
              style={riskFilter === tab.key ? ACTIVE_TAB_STYLE[tab.key] : undefined}
              onClick={() => onRiskFilterChange(tab.key)}
              aria-pressed={riskFilter === tab.key}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <FilterSelect options={gradeOptions} value={grade} onChange={onGradeChange} />
      </div>

      <span className={styles.resultCount}>
        {resultCount} student{resultCount === 1 ? "" : "s"}
      </span>
    </div>
  );
}
