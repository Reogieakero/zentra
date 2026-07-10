"use client";

import React from "react";
import styles from "./TabsNav.module.css";

interface TabsNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { key: "dashboard", label: "Dashboard" },
  { key: "endorsements", label: "Endorsements" },
  { key: "approvals", label: "Active ADM" },
  { key: "reintegration", label: "Reintegration" },
  { key: "reports", label: "Reports" },
];

export default function TabsNav({ activeTab, setActiveTab }: TabsNavProps) {
  return (
    <div className={styles.tabsContainer}>
      <nav className={styles.tabs} aria-label="ADM Navigation Sections">
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
