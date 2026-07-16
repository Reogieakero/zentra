"use client";

import React from "react";
import styles from "./AnecdotalTabs.module.css";

interface AnecdotalTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { key: "dashboard", label: "Dashboard" },
  { key: "behavior", label: "Behavior Reports" },
  { key: "guidance", label: "Guidance Notes" },
  { key: "incidents", label: "Incident Reports" },
  { key: "observations", label: "Student Observations" },
  { key: "archives", label: "Archives" },
];

export function AnecdotalTabs({ activeTab, setActiveTab }: AnecdotalTabsProps) {
  return (
    <div className={styles.tabsContainer}>
      <nav className={styles.tabs} aria-label="Anecdotal Navigation">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
