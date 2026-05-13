"use client";

import React from "react";
import styles from "./DatePicker.module.css";
import { useDatePicker } from "../../../hooks/useDatePicker";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const WEEKDAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

export function DatePicker({ selectedDate, onChange }: DatePickerProps) {
  const {
    ref,
    open,
    setOpen,
    viewYear,
    setViewYear,
    viewMonth,
    yearOptions,
    triggerLabel,
    footerLabel,
    shiftMonth,
    buildDays,
    selectDay,
    isSelected,
    isToday,
    goToday,
    clearSel,
  } = useDatePicker({ selectedDate, onChange });

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
            <span className={styles.footerNote}>{footerLabel}</span>
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