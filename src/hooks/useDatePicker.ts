"use client";

import { useState, useRef, useEffect } from "react";

interface UseDatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

export function useDatePicker({ selectedDate, onChange }: UseDatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    } else {
      const now = new Date();
      setViewYear(now.getFullYear());
      setViewMonth(now.getMonth());
    }
  }, [selectedDate]);

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
    const now = new Date();
    return now.getFullYear() === viewYear && now.getMonth() === viewMonth && now.getDate() === day;
  }

  function goToday() {
    const t = new Date();
    setViewYear(t.getFullYear());
    setViewMonth(t.getMonth());
    onChange(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
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

  const footerLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "No date selected";

  return {
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
  };
}