"use client";

import React, { useMemo } from "react";
import styles from "./Sidebar.module.css";
import { TableIcon } from "./icons/Icons";
import { Student, SectionTab } from "../types/student";

interface SidebarProps {
  students: Student[];
  sections: string[];
  openTabs: SectionTab[];
  activeTabId: string;
  onOpenSection: (id: string) => void;
  // Removed width and onMouseDown props
}

export function Sidebar({
  students,
  sections,
  openTabs,
  activeTabId,
  onOpenSection,
}: SidebarProps) {
  const counts = useMemo(() => {
    const m: Record<string, number> = { all: students.length };
    sections.forEach(s => {
      m[s] = students.filter(st => st.section === s).length;
    });
    return m;
  }, [students, sections]);

  return (
    <nav className={styles.sidebar}> {/* Removed inline width style */}
      <div className={styles.header}>
        <span className={styles.title}></span>
      </div>

      <ul className={styles.list}>
        <li
          className={`${styles.item} ${activeTabId === "all" ? styles.itemActive : ""}`}
          onClick={() => onOpenSection("all")}
        >
          <span className={styles.itemIcon}><TableIcon /></span>
          <span className={styles.itemLabel}>All Students</span>
          <span className={styles.itemCount}>{counts.all}</span>
        </li>

        <div className={styles.divider} />
        <span className={styles.groupLabel}>By Section</span>

        {sections.map(sec => {
          const isActive = activeTabId === sec;
          const isOpen   = openTabs.some(t => t.id === sec) && !isActive;
          return (
            <li
              key={sec}
              className={[
                styles.item,
                isActive ? styles.itemActive : "",
                isOpen   ? styles.itemOpen   : "",
              ].join(" ")}
              onClick={() => onOpenSection(sec)}
            >
              <span className={styles.itemIcon}><TableIcon /></span>
              <span className={styles.itemLabel}>{sec}</span>
              <span className={styles.itemCount}>{counts[sec]}</span>
            </li>
          );
        })}
      </ul>
      {/* Resizer div removed from here */}
    </nav>
  );
}