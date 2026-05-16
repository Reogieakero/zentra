"use client";

import { useState, useMemo } from "react";
import { AttendanceCard } from "./attendancetable/AttendanceCard";
import { AttendanceOverlay } from "./attendancetable/AttendanceOverlay";
import {
  STUDENTS,
  GRADE_ORDER,
  GRADE_SECTIONS,
  toDateStrFromDate,
} from "./attendancetable/types";

interface AttendanceTableProps {
  selectedDate: Date | null;
}

export function AttendanceTable({ selectedDate }: AttendanceTableProps) {
  const [activeTab, setActiveTab] = useState("Absent");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<
    (typeof STUDENTS)[number] | null
  >(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsTab, setFsTab] = useState("All");
  const [fsGrade, setFsGrade] = useState("All");
  const [fsSection, setFsSection] = useState("All");
  const [fsDate, setFsDate] = useState<Date | null>(null); // ← new

  const handleRowClick = (student: (typeof STUDENTS)[number]) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleFsGradeChange = (grade: string) => {
    setFsGrade(grade);
    setFsSection("All");
  };

  const availableSections = useMemo<string[]>(() => {
    if (fsGrade === "All") return [];
    return GRADE_SECTIONS[fsGrade] ?? [];
  }, [fsGrade]);

  const dateStr = toDateStrFromDate(selectedDate);

  // Main card filter (uses the outer selectedDate prop)
  const filtered = useMemo(
    () =>
      STUDENTS.filter((s) => {
        const matchDate = dateStr ? s.date === dateStr : true;
        const matchTab = activeTab === "All" ? true : s.status === activeTab;
        return matchDate && matchTab;
      }),
    [dateStr, activeTab],
  );

  // Overlay filter — fsDate picker takes priority; falls back to parent’s selectedDate
  const fsDateStr = toDateStrFromDate(fsDate) ?? dateStr;
  const fsFiltered = useMemo(
    () =>
      STUDENTS.filter((s) => {
        const matchStatus  = fsTab     === "All" ? true : s.status  === fsTab;
        const matchGrade   = fsGrade   === "All" ? true : s.grade   === fsGrade;
        const matchSection = fsSection === "All" ? true : s.section === fsSection;
        const matchDate    = fsDateStr            ? s.date === fsDateStr : true;
        return matchStatus && matchGrade && matchSection && matchDate;
      }),
    [fsTab, fsGrade, fsSection, fsDateStr],
  );

  const fsGrouped = useMemo(() => {
    const groups: Record<string, (typeof STUDENTS)[number][]> = {};
    fsFiltered.forEach((s) => {
      if (!groups[s.grade]) groups[s.grade] = [];
      groups[s.grade].push(s);
    });
    return GRADE_ORDER.filter((g) => groups[g]).map((g) => ({
      grade: g,
      rows: groups[g],
    }));
  }, [fsFiltered]);

  const fsStats = useMemo(
    () => ({
      total:   fsFiltered.length,
      present: fsFiltered.filter((s) => s.status === "Present").length,
      late:    fsFiltered.filter((s) => s.status === "Late").length,
      absent:  fsFiltered.filter((s) => s.status === "Absent").length,
    }),
    [fsFiltered],
  );

  return (
    <>
      <AttendanceCard
        selectedDate={selectedDate}
        filtered={filtered}
        onOpenFullscreen={() => setIsFullscreen(true)}
        onRowClick={handleRowClick}
        isDrawerOpen={isDrawerOpen}
        selectedStudent={selectedStudent}
        onCloseDrawer={() => setIsDrawerOpen(false)}
      />

      {isFullscreen && (
        <AttendanceOverlay
          fsTab={fsTab}
          fsGrade={fsGrade}
          fsSection={fsSection}
          fsDate={fsDate}                    
          availableSections={availableSections}
          onFsTabChange={setFsTab}
          onFsGradeChange={handleFsGradeChange}
          onFsSectionChange={setFsSection}
          onFsDateChange={setFsDate}         
          fsGrouped={fsGrouped}
          fsStats={fsStats}
          onClose={() => setIsFullscreen(false)}
          onRowClick={handleRowClick}
        />
      )}
    </>
  );
}