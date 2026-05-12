"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const WEEKDAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export function DatePicker({ selectedDate, onChange }: DatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function shiftMonth(dir: number) {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setViewMonth(m);
    setViewYear(y);
  }

  function buildDays() {
    const first = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();
    const cells: { day: number; month: "prev" | "curr" | "next" }[] = [];

    for (let i = first - 1; i >= 0; i--) {
      cells.push({ day: daysInPrev - i, month: "prev" });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ day: i, month: "curr" });
    }
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ day: i, month: "next" });
    }
    return cells;
  }

  function selectDay(day: number, month: "prev" | "curr" | "next") {
    let y = viewYear;
    let m = viewMonth;
    if (month === "prev") { m--; if (m < 0) { m = 11; y--; } }
    if (month === "next") { m++; if (m > 11) { m = 0; y++; } }
    onChange(new Date(y, m, day));
    setViewYear(y);
    setViewMonth(m);
    setOpen(false);
  }

  function isSelected(day: number, month: "prev" | "curr" | "next") {
    if (!selectedDate) return false;
    let y = viewYear, m = viewMonth;
    if (month === "prev") { m--; if (m < 0) { m = 11; y--; } }
    if (month === "next") { m++; if (m > 11) { m = 0; y++; } }
    return selectedDate.getFullYear() === y && selectedDate.getMonth() === m && selectedDate.getDate() === day;
  }

  function isToday(day: number, month: "prev" | "curr" | "next") {
    if (month !== "curr") return false;
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
  }

  function goToday() {
    const t = new Date();
    setViewYear(t.getFullYear());
    setViewMonth(t.getMonth());
    onChange(t);
    setOpen(false);
  }

  function clearSel() {
    onChange(null);
    setOpen(false);
  }

  const yearOptions = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i);

  const triggerLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Select date";

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open date picker"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.triggerIcon}>
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>{triggerLabel}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className={styles.calendar}>
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={() => shiftMonth(-1)} aria-label="Previous month">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className={styles.monthYear}>
              <span className={styles.monthLabel}>{MONTHS[viewMonth]}</span>
              <select
                className={styles.yearSelect}
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
              >
                {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button className={styles.navBtn} onClick={() => shiftMonth(1)} aria-label="Next month">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          <div className={styles.weekdays}>
            {WEEKDAYS.map((d) => <span key={d} className={styles.weekday}>{d}</span>)}
          </div>

          <div className={styles.daysGrid}>
            {buildDays().map((cell, i) => (
              <button
                key={i}
                onClick={() => selectDay(cell.day, cell.month)}
                className={[
                  styles.day,
                  cell.month !== "curr" ? styles.dayOtherMonth : "",
                  isSelected(cell.day, cell.month) ? styles.daySelected : "",
                  isToday(cell.day, cell.month) && !isSelected(cell.day, cell.month) ? styles.dayToday : "",
                ].join(" ")}
              >
                {cell.day}
              </button>
            ))}
          </div>

          <div className={styles.footer}>
            <span className={styles.footerNote}>
              {selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "No date selected"}
            </span>
            <div className={styles.footerActions}>
              <button className={styles.btnClear} onClick={clearSel}>Clear</button>
              <button className={styles.btnToday} onClick={goToday}>Today</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}