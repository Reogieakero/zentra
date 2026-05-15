"use client";

import React, { useState } from "react";
import styles from "./TabBar.module.css";
import { TableIcon, XIcon } from "./icons/Icons";
import { SectionTab } from "../types/student";

interface TabBarProps {
  tabs: SectionTab[];
  activeTabId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onReorder: (newTabs: SectionTab[]) => void;
}

export function TabBar({ tabs, activeTabId, onSelect, onClose, onReorder }: TabBarProps) {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (draggedItemId === overId || !draggedItemId) return;

    const draggedIndex = tabs.findIndex((t) => t.id === draggedItemId);
    const overIndex = tabs.findIndex((t) => t.id === overId);

    const newTabs = [...tabs];
    const [removed] = newTabs.splice(draggedIndex, 1);
    newTabs.splice(overIndex, 0, removed);

    onReorder(newTabs);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
  };

  return (
    <div className={styles.tabBar}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            draggable
            onDragStart={(e) => handleDragStart(e, tab.id)}
            onDragOver={(e) => handleDragOver(e, tab.id)}
            onDragEnd={handleDragEnd}
            className={`
              ${styles.tab} 
              ${tab.id === activeTabId ? styles.tabActive : ""} 
              ${draggedItemId === tab.id ? styles.isDragging : ""}
            `}
            onClick={() => onSelect(tab.id)}
          >
            <span className={styles.tabIcon}>
              <TableIcon />
            </span>
            <span className={styles.tabLabel}>{tab.label}</span>
            
            {tab.id !== "all" && (
              <span
                className={styles.tabClose}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
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