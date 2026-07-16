"use client";

import Link from "next/link";
import { useState } from "react";
import { DOC_SECTIONS } from "../_constants/docs";
import styles from "./DocsSidebar.module.css";

interface DocsSidebarProps {
  activeHref: string;
}

export function DocsSidebar({ activeHref }: DocsSidebarProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggle(title: string) {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <div className={styles.logoMark}>Z</div>
        <div className={styles.logoInfo}>
          <span className={styles.logoName}>ZENTRA</span>
          <span className={styles.logoBadge}>Docs</span>
        </div>
      </div>

      <div className={styles.searchHint}>
        <svg className={styles.searchIcon} width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Search</span>
        <kbd className={styles.kbd}>⌘K</kbd>
      </div>

      <nav className={styles.nav}>
        {DOC_SECTIONS.map((section) => {
          const isCollapsed = collapsed[section.title];
          return (
            <div key={section.title} className={styles.section}>
              <button
                className={styles.sectionToggle}
                onClick={() => toggle(section.title)}
                aria-expanded={!isCollapsed}
              >
                <span>{section.title}</span>
                <svg
                  className={`${styles.chevron} ${isCollapsed ? styles.chevronCollapsed : ""}`}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {!isCollapsed && (
                <ul className={styles.itemList}>
                  {section.items.map((item) => {
                    const isActive = activeHref === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                        >
                          {isActive && <span className={styles.activeDot} />}
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <a href="/dashboard" className={styles.footerLink}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Dashboard
        </a>
        <a href="/docs/updates" className={styles.footerLink}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Changelog
        </a>
      </div>
    </aside>
  );
}