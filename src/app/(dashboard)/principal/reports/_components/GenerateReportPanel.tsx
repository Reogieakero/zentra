"use client";

import React, { useState } from "react";
import styles from "./GenerateReportPanel.module.css";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/ui/filter-select";
import { SparkleIcon, SpinnerIcon } from "./ReportIcons";

const RANGE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "quarter", label: "This Quarter" },
  { value: "year", label: "This School Year" },
];

const FORMAT_OPTIONS = [
  { value: "pdf", label: "PDF" },
  { value: "xlsx", label: "Excel (.xlsx)" },
  { value: "csv", label: "CSV" },
];

interface GenerateReportPanelProps {
  selectedTypeLabel: string;
  isGenerating: boolean;
  onGenerate: (range: string, rangeLabel: string, format: string) => void;
}

export function GenerateReportPanel({
  selectedTypeLabel,
  isGenerating,
  onGenerate,
}: GenerateReportPanelProps) {
  const [range, setRange] = useState("month");
  const [format, setFormat] = useState("pdf");

  const rangeLabel = RANGE_OPTIONS.find((r) => r.value === range)?.label ?? "This Month";

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Generate Report</h2>
          <p className={styles.subtitle}>
            Building a <strong>{selectedTypeLabel}</strong> report
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Date Range</span>
          <FilterSelect options={RANGE_OPTIONS} value={range} onChange={setRange} />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Format</span>
          <FilterSelect options={FORMAT_OPTIONS} value={format} onChange={setFormat} />
        </div>

        <Button
          className={styles.generateBtn}
          variant="primary"
          size="md"
          disabled={isGenerating}
          onClick={() => onGenerate(range, rangeLabel, format)}
        >
          {isGenerating ? (
            <>
              <span className={styles.spinning}>
                <SpinnerIcon />
              </span>
              Generating...
            </>
          ) : (
            <>
              <SparkleIcon />
              Generate Report
            </>
          )}
        </Button>
      </div>
    </section>
  );
}
