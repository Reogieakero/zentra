"use client";

import { useState, useMemo } from "react";
import { AttendanceCard } from "./attendancetable/AttendanceCard";
import {
  STUDENTS,
  toDateStrFromDate,
} from "./attendancetable/types";

interface AttendanceTableProps {
  selectedDate: Date | null;
  onOpenFullscreen: () => void;
  onRowClick: (student: (typeof STUDENTS)[number]) => void;
  isDrawerOpen: boolean;
  selectedStudent: (typeof STUDENTS)[number] | null;
  onCloseDrawer: () => void;
}

export function AttendanceTable({
  selectedDate,
  onOpenFullscreen,
  onRowClick,
  isDrawerOpen,
  selectedStudent,
  onCloseDrawer,
}: AttendanceTableProps) {
  const [activeTab, setActiveTab] = useState("Absent");

  const dateStr = toDateStrFromDate(selectedDate);

  const filtered = useMemo(
    () =>
      STUDENTS.filter((s) => {
        const matchDate = dateStr ? s.date === dateStr : true;
        const matchTab = activeTab === "All" ? true : s.status === activeTab;
        return matchDate && matchTab;
      }),
    [dateStr, activeTab],
  );

  return (
    <AttendanceCard
      selectedDate={selectedDate}
      filtered={filtered}
      onOpenFullscreen={onOpenFullscreen}
      onRowClick={onRowClick}
      isDrawerOpen={isDrawerOpen}
      selectedStudent={selectedStudent}
      onCloseDrawer={onCloseDrawer}
    />
  );
}