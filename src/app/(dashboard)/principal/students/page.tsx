"use client";

import React, { useState, useEffect } from "react";
import styles from "./students.module.css";
import { Student, SectionTab } from "./_types/student";
import { Sidebar } from "./_components/Sidebar";
import { TabBar } from "./_components/TabBar";
import { StudentsView } from "./_components/StudentsView";
import { StudentDrawer } from "./_components/StudentDrawer";

const STUDENTS: Student[] = [
  { id: "1", lrn: "123456789001", name: "Maria Santos", firstName: "Maria", lastName: "Santos", grade: "10", section: "Rizal", gender: "Female", status: "Enrolled", risk: "High", absences: 12, gpa: 74, contact: "09171234501", guardian: "Rosa Santos", address: "123 Mabini St, Davao City", birthday: "2009-03-14", avatar: "MS" },
  { id: "2", lrn: "123456789002", name: "Juan dela Cruz", firstName: "Juan", lastName: "dela Cruz", grade: "9", section: "Bonifacio", gender: "Male", status: "Enrolled", risk: "High", absences: 8, gpa: 71, contact: "09171234502", guardian: "Pedro dela Cruz", address: "45 Rizal Ave, Davao City", birthday: "2010-07-22", avatar: "JD" },
];

const ALL_SECTIONS = ["Rizal", "Bonifacio", "Aguinaldo", "Mabini", "Luna", "Del Pilar"];
const TABS_STORAGE_KEY = "zentra_tab_order";

export default function StudentsPage() {
  const [tabs, setTabs] = useState<SectionTab[]>([]);
  const [activeTabId, setActiveTabId] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showLrn, setShowLrn] = useState(true);

  useEffect(() => {
    const savedTabs = localStorage.getItem(TABS_STORAGE_KEY);
    if (savedTabs) {
      try {
        const parsed = JSON.parse(savedTabs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTabs(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setTabs([{ id: "all", label: "All Students" }]);
  }, []);

  const persistTabs = (newTabs: SectionTab[]) => {
    setTabs(newTabs);
    localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(newTabs));
  };

  const openSection = (id: string) => {
    const exists = tabs.find((t) => t.id === id);
    if (!exists) {
      const label = id === "all" ? "All Students" : id;
      const updated = [...tabs, { id, label }];
      persistTabs(updated);
    }
    setActiveTabId(id);
  };

  const closeTab = (id: string) => {
    const updated = tabs.filter((t) => t.id !== id);
    persistTabs(updated);
    if (activeTabId === id) {
      setActiveTabId(updated.length > 0 ? updated[updated.length - 1].id : "all");
    }
  };

  const handleReorder = (newTabs: SectionTab[]) => {
    persistTabs(newTabs);
  };

  return (
    <div className={styles.root}>
      <Sidebar
        students={STUDENTS}
        sections={ALL_SECTIONS}
        openTabs={tabs}
        activeTabId={activeTabId}
        onOpenSection={openSection}
      />

      <div className={styles.main}>
        <div className={styles.tabArea}>
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onSelect={setActiveTabId}
            onClose={closeTab}
            onReorder={handleReorder}
          />

          {tabs.map((tab) => (
            <div key={tab.id} hidden={tab.id !== activeTabId}>
              <StudentsView
                students={STUDENTS}
                sectionFilter={tab.id === "all" ? null : tab.id}
                onSelectStudent={setSelectedStudent}
                showLrn={showLrn}
                onToggleLrn={() => setShowLrn(!showLrn)}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedStudent && (
        <StudentDrawer
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          showLrn={showLrn}
        />
      )}
    </div>
  );
}