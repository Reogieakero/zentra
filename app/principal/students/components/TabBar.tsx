"use client";

import React from "react";
import styles from "./TabBar.module.css";
import { TableIcon, XIcon } from "./icons/Icons";
import { SectionTab } from "../types/student";

interface TabBarProps {
  tabs: SectionTab[];
  activeTabId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}

export function TabBar({ tabs, activeTabId, onSelect, onClose }: TabBarProps) {
  return (
    <div className={styles.tabBar}>
      <div className={styles.tabList}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${tab.id === activeTabId ? styles.tabActive : ""}`}
            onClick={() => onSelect(tab.id)}
          >
            <span className={styles.tabIcon}><TableIcon /></span>
            <span className={styles.tabLabel}>{tab.label}</span>
            {tab.id !== "all" && (
              <span
                className={styles.tabClose}
                onClick={e => { e.stopPropagation(); onClose(tab.id); }}
                aria-label={`Close ${tab.label}`}
              >
                <XIcon />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}