"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { StudentAttendance } from "./components/StudentAttendance";
import { DatePicker } from "../overview/components/DatePicker";
import { AttendanceOverlay } from "./components/attendancetable/AttendanceOverlay";
import { StudentDrawer } from "./components/studentDrawer/StudentDrawer";
import { STUDENTS, GRADE_ORDER, GRADE_SECTIONS, toDateStrFromDate } from "./components/attendancetable/types";
import { useMemo } from "react";

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [activeTab, setActiveTab] = useState<"dashboard" | "report">("dashboard");

  // --- Drawer state (lifted from AttendanceTable) ---
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<(typeof STUDENTS)[number] | null>(null);

  // --- Fullscreen overlay state (lifted from AttendanceTable) ---
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsTab, setFsTab] = useState("All");
  const [fsGrade, setFsGrade] = useState("Grade 7");
  const [fsSection, setFsSection] = useState("Aguinaldo");
  const [fsDate, setFsDate] = useState<Date | null>(null);

  const handleRowClick = (student: (typeof STUDENTS)[number]) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleFsGradeChange = (grade: string) => {
    setFsGrade(grade);
    const sections = GRADE_SECTIONS[grade] ?? [];
    setFsSection(sections[0] ?? "");
  };

  const availableSections = useMemo<string[]>(() => {
    return GRADE_SECTIONS[fsGrade] ?? [];
  }, [fsGrade]);

  const dateStr = toDateStrFromDate(selectedDate);
  const fsDateStr = toDateStrFromDate(fsDate) ?? dateStr;

  const fsFiltered = useMemo(
    () =>
      STUDENTS.filter((s) => {
        const matchStatus  = fsTab     === "All" ? true : s.status === fsTab;
        const matchGrade   = s.grade   === fsGrade;
        const matchSection = s.section === fsSection;
        const matchDate    = fsDateStr ? s.date === fsDateStr : true;
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

  const formatHeader = (date: Date | null) => {
    if (!date) return "All Dates";
    return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const isDashboard = activeTab === "dashboard";

  return (
    <div className={styles.pageContainer}>
      <div
        className={`${styles.pageHeader} ${
          isDashboard ? styles.headerVisible : styles.headerHidden
        }`}
      >
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>Hello, Principal Reyes</h1>
          <p className={styles.pageSubtitle}>It&apos;s {formatHeader(selectedDate)}</p>
        </div>
        <div className={styles.headerActions}>
          <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
          <button className={styles.actionSecondary}>Flag Absence</button>
          <button className={styles.actionSecondary}>New Tracker</button>
          <button className={styles.actionPrimary}>Add Record</button>
        </div>
      </div>

      <div
        className={`${styles.mainContentLayout} ${
          isDashboard ? styles.shiftUpNormal : styles.shiftUpReport
        }`}
      >
        <StudentAttendance
          selectedDate={selectedDate}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenFullscreen={() => setIsFullscreen(true)}
          onRowClick={handleRowClick}
          isDrawerOpen={isDrawerOpen}
          selectedStudent={selectedStudent}
          onCloseDrawer={() => setIsDrawerOpen(false)}
        />
      </div>

      {/* Page-level fullscreen overlay — renders above everything */}
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

      {/* Page-level student drawer — renders above everything */}
      {isDrawerOpen && selectedStudent && (
        <StudentDrawer
          student={selectedStudent}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
}