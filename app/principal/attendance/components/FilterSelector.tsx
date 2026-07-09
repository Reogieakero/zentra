"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterSelector.module.css";

interface FilterSelectorProps {
  onFilterChange: (filters: { grade: string; section: string; timeframe: string }) => void;
}

const GRADES = ["All Grades", "G7", "G8", "G9", "G10", "G11", "G12"];
const SECTIONS = ["All Sections", "Section A", "Section B"];
const TIMEFRAMES = [
  { value: "today", label: "Today" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" }
];

export function FilterSelector({ onFilterChange }: FilterSelectorProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"grade" | "section" | "timeframe">("grade");
  
  const [grade, setGrade] = useState("All Grades");
  const [section, setSection] = useState("All Sections");
  const [timeframe, setTimeframe] = useState("today");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTriggerLabel = () => {
    const timeLabel = TIMEFRAMES.find(t => t.value === timeframe)?.label || "Today";
    return `${grade} • ${section} • ${timeLabel}`;
  };

  const handleSelectGrade = (selected: string) => {
    setGrade(selected);
    setStep("section");
  };

  const handleSelectSection = (selected: string) => {
    setSection(selected);
    setStep("timeframe");
  };

  const handleSelectTimeframe = (selected: string) => {
    setTimeframe(selected);
    setOpen(false);
    setStep("grade"); 
    onFilterChange({ grade, section, timeframe: selected });
  };

  const handleReset = () => {
    setGrade("All Grades");
    setSection("All Sections");
    setTimeframe("today");
    setStep("grade");
    setOpen(false);
    onFilterChange({ grade: "All Grades", section: "All Sections", timeframe: "today" });
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.triggerIcon}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        <span>{getTriggerLabel()}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          <div className={styles.nav}>
            {step !== "grade" && (
              <button className={styles.navBtn} onClick={() => setStep(step === "timeframe" ? "section" : "grade")}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            )}
            <div className={styles.stepTitle}>
              {step === "grade" && "Select Grade"}
              {step === "section" && "Select Section"}
              {step === "timeframe" && "Select Timeframe"}
            </div>
            <div style={{ width: 24 }} />
          </div>

          <div className={styles.optionsGrid}>
            {step === "grade" && GRADES.map((g) => (
              <button key={g} className={`${styles.optionItem} ${grade === g ? styles.optionSelected : ""}`} onClick={() => handleSelectGrade(g)}>{g}</button>
            ))}

            {step === "section" && SECTIONS.map((s) => (
              <button key={s} className={`${styles.optionItem} ${section === s ? styles.optionSelected : ""}`} onClick={() => handleSelectSection(s)}>{s}</button>
            ))}

            {step === "timeframe" && TIMEFRAMES.map((t) => (
              <button key={t.value} className={`${styles.optionItem} ${timeframe === t.value ? styles.optionSelected : ""}`} onClick={() => handleSelectTimeframe(t.value)}>{t.label}</button>
            ))}
          </div>

          <div className={styles.footer}>
            <span className={styles.footerNote}>Step {step === "grade" ? "1" : step === "section" ? "2" : "3"} of 3</span>
            <button className={styles.btnClear} onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}