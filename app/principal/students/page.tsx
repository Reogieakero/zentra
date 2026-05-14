"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Students.module.css";
import { Student, SectionTab } from "./types/student";
import { Sidebar } from "./components/Sidebar";
import { TabBar } from "./components/TabBar";
import { StudentsView } from "./components/StudentsView";
import { StudentDrawer } from "./components/StudentDrawer";

// ── Seed data ────────────────────────────────────────────────────────────────

const STUDENTS: Student[] = [
  { id:"1",  lrn:"123456789001", name:"Maria Santos",    firstName:"Maria",   lastName:"Santos",    grade:"10", section:"Rizal",     gender:"Female", status:"Enrolled", risk:"High",   absences:12, gpa:74, contact:"09171234501", guardian:"Rosa Santos",     address:"123 Mabini St, Davao City",    birthday:"2009-03-14", avatar:"MS" },
  { id:"2",  lrn:"123456789002", name:"Juan dela Cruz",  firstName:"Juan",    lastName:"dela Cruz", grade:"9",  section:"Bonifacio", gender:"Male",   status:"Enrolled", risk:"High",   absences:8,  gpa:71, contact:"09171234502", guardian:"Pedro dela Cruz", address:"45 Rizal Ave, Davao City",     birthday:"2010-07-22", avatar:"JD" },
  { id:"3",  lrn:"123456789003", name:"Ana Reyes",       firstName:"Ana",     lastName:"Reyes",     grade:"11", section:"Aguinaldo", gender:"Female", status:"Enrolled", risk:"Medium", absences:5,  gpa:78, contact:"09171234503", guardian:"Lito Reyes",      address:"78 Luna St, Davao City",       birthday:"2008-11-05", avatar:"AR" },
  { id:"4",  lrn:"123456789004", name:"Carlos Mendoza",  firstName:"Carlos",  lastName:"Mendoza",   grade:"10", section:"Luna",      gender:"Male",   status:"Enrolled", risk:"High",   absences:15, gpa:68, contact:"09171234504", guardian:"Nena Mendoza",    address:"90 Burgos St, Davao City",     birthday:"2009-01-30", avatar:"CM" },
  { id:"5",  lrn:"123456789005", name:"Liza Gomez",      firstName:"Liza",    lastName:"Gomez",     grade:"8",  section:"Mabini",    gender:"Female", status:"Enrolled", risk:"Medium", absences:4,  gpa:82, contact:"09171234505", guardian:"Ben Gomez",       address:"12 Del Pilar St, Davao City",  birthday:"2011-06-18", avatar:"LG" },
  { id:"6",  lrn:"123456789006", name:"Rico Villanueva", firstName:"Rico",    lastName:"Villanueva",grade:"12", section:"Burgos",    gender:"Male",   status:"Enrolled", risk:"High",   absences:10, gpa:70, contact:"09171234506", guardian:"Clara Villanueva",address:"34 Silang St, Davao City",     birthday:"2007-09-09", avatar:"RV" },
  { id:"7",  lrn:"123456789007", name:"Tricia Bautista", firstName:"Tricia",  lastName:"Bautista",  grade:"9",  section:"Silang",    gender:"Female", status:"Enrolled", risk:"Medium", absences:3,  gpa:85, contact:"09171234507", guardian:"Marco Bautista",  address:"56 Anda St, Davao City",       birthday:"2010-04-25", avatar:"TB" },
  { id:"8",  lrn:"123456789008", name:"Mark Aquino",     firstName:"Mark",    lastName:"Aquino",    grade:"11", section:"Del Pilar", gender:"Male",   status:"Enrolled", risk:"High",   absences:11, gpa:72, contact:"09171234508", guardian:"Linda Aquino",    address:"78 Pichon St, Davao City",     birthday:"2008-12-01", avatar:"MA" },
  { id:"9",  lrn:"123456789009", name:"Sofia Cruz",      firstName:"Sofia",   lastName:"Cruz",      grade:"10", section:"Rizal",     gender:"Female", status:"Enrolled", risk:null,     absences:1,  gpa:93, contact:"09171234509", guardian:"Jose Cruz",       address:"99 Claveria St, Davao City",   birthday:"2009-08-17", avatar:"SC" },
  { id:"10", lrn:"123456789010", name:"Ryan Flores",     firstName:"Ryan",    lastName:"Flores",    grade:"8",  section:"Mabini",    gender:"Male",   status:"Pending",  risk:null,     absences:0,  gpa:88, contact:"09171234510", guardian:"Alma Flores",     address:"11 Magsaysay St, Davao City",  birthday:"2011-02-28", avatar:"RF" },
  { id:"11", lrn:"123456789011", name:"Grace Lim",       firstName:"Grace",   lastName:"Lim",       grade:"12", section:"Aguinaldo", gender:"Female", status:"Enrolled", risk:null,     absences:2,  gpa:91, contact:"09171234511", guardian:"Tony Lim",        address:"22 San Pedro St, Davao City",  birthday:"2007-05-13", avatar:"GL" },
  { id:"12", lrn:"123456789012", name:"Dante Ramos",     firstName:"Dante",   lastName:"Ramos",     grade:"9",  section:"Bonifacio", gender:"Male",   status:"Dropped",  risk:null,     absences:30, gpa:65, contact:"09171234512", guardian:"Elena Ramos",     address:"33 Pelayo St, Davao City",     birthday:"2010-10-07", avatar:"DR" },
  { id:"13", lrn:"123456789013", name:"Jasmine Torres",  firstName:"Jasmine", lastName:"Torres",    grade:"11", section:"Luna",      gender:"Female", status:"Enrolled", risk:null,     absences:2,  gpa:89, contact:"09171234513", guardian:"Felix Torres",    address:"44 Ilustre St, Davao City",    birthday:"2008-07-19", avatar:"JT" },
  { id:"14", lrn:"123456789014", name:"Paolo Garcia",    firstName:"Paolo",   lastName:"Garcia",    grade:"10", section:"Burgos",    gender:"Male",   status:"Enrolled", risk:"Medium", absences:6,  gpa:77, contact:"09171234514", guardian:"Mila Garcia",     address:"55 C.M. Recto St, Davao City", birthday:"2009-11-11", avatar:"PG" },
  { id:"15", lrn:"123456789015", name:"Ella Navarro",    firstName:"Ella",    lastName:"Navarro",   grade:"8",  section:"Del Pilar", gender:"Female", status:"Enrolled", risk:null,     absences:1,  gpa:94, contact:"09171234515", guardian:"Roy Navarro",     address:"66 Uyanguren St, Davao City",  birthday:"2011-03-22", avatar:"EN" },
];

const ALL_SECTIONS = Array.from(new Set(STUDENTS.map(s => s.section))).sort();
const DEFAULT_TABS: SectionTab[] = [{ id: "all", label: "All Students" }];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Students() {
  const [tabs, setTabs]          = useState<SectionTab[]>(DEFAULT_TABS);
  const [activeTabId, setActive] = useState("all");
  const [selected, setSelected]  = useState<Student | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const isDragging = useRef(false);

  const openSection = (id: string) => {
    if (!tabs.find(t => t.id === id)) {
      setTabs(prev => [...prev, { id, label: id === "all" ? "All Students" : id }]);
    }
    setActive(id);
  };

  const closeTab = (id: string) => {
    setTabs(prev => {
      const next = prev.filter(t => t.id !== id);
      if (activeTabId === id) {
        const idx = prev.findIndex(t => t.id === id);
        setActive(next[Math.max(0, idx - 1)]?.id ?? "all");
      }
      return next.length === 0 ? DEFAULT_TABS : next;
    });
  };

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setSidebarWidth(Math.max(160, Math.min(450, e.clientX)));
    };
    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

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
            onSelect={setActive}
            onClose={closeTab}
          />

          {tabs.map(tab => (
            <div key={tab.id} hidden={tab.id !== activeTabId}>
              <StudentsView
                students={STUDENTS}
                sectionFilter={tab.id === "all" ? null : tab.id}
                onSelectStudent={setSelected}
              />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <StudentDrawer student={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}