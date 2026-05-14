"use client";

import React from "react";
import styles from "./QuickActions.module.css";
import * as Icons from "./Icons";

interface QuickAction {
  label: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const actions: QuickAction[] = [
  {
    label: "Upload SF10",
    description: "Digitalize permanent student records",
    icon: <Icons.FileTextIcon />,
  },
  {
    label: "View ADM Application",
    description: "Manage pending admission requests",
    icon: <Icons.UserGroupIcon />,
  },
  {
    label: "View SF10 Request",
    description: "Track document requests and status",
    icon: <Icons.BellIcon />,
  },
  {
    label: "Early Intervention",
    description: "Students requiring academic support",
    icon: <Icons.ShieldIcon />,
  },
];

export function QuickActions() {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Quick Actions</h2>
      <div className={styles.tileList}>
        {actions.map((action) => (
          <button
            key={action.label}
            className={styles.tileItem}
            onClick={action.onClick}
            type="button"
          >
            <div className={styles.iconCircle}>{action.icon}</div>
            <div className={styles.textContainer}>
              <span className={styles.tileLabel}>{action.label}</span>
              <span className={styles.tileDescription}>{action.description}</span>
            </div>
            {/* Chevron Right Arrow */}
            <div className={styles.chevron}>
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}