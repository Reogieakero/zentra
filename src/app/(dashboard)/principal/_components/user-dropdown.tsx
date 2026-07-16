"use client";

import Link from "next/link";
import { useUserDropdown, type Theme } from "@/hooks/useUserDropdown";
import styles from "./UserDropdown.module.css";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
  };
}

const THEMES: { value: Theme; label: string }[] = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "classic-dark", label: "Classic Dark" },
  { value: "system", label: "System" },
];

export function UserDropdown({ user }: UserDropdownProps) {
  const { isOpen, setIsOpen, theme, setTheme, dropdownRef, handleLogout } = useUserDropdown();

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <button
        className={styles.avatarTrigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="10" r="3" />
          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.header}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.emailText}>{user.email}</span>
          </div>

          <div className={styles.section}>
            <Link href="/principal/settings" className={styles.item} onClick={() => setIsOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Account preferences
            </Link>
            <Link href="/principal/previews" className={styles.item} onClick={() => setIsOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 3h15a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
                <path d="M12 12L7 7l5 5 5-5-5 5z"/>
              </svg>
              Feature previews
            </Link>
          </div>

          <div className={styles.section}>
            <div className={styles.label}>Theme</div>
            {THEMES.map((t) => (
              <button
                key={t.value}
                className={`${styles.item} ${theme === t.value ? styles.itemActive : ""}`}
                onClick={() => setTheme(t.value)}
              >
                {theme === t.value && <span className={styles.dot}>•</span>}
                {t.label}
              </button>
            ))}
          </div>

          <div className={styles.section}>
            <button className={`${styles.item} ${styles.itemDanger}`} onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}