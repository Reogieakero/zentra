"use client";

import { useState, useRef, useEffect } from "react";
import styles from "../register.module.css";

const EXTENSIONS = ["None", "Jr.", "Sr.", "II", "III", "IV", "V"];

export function ExtensionSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.inputField} ref={containerRef} style={{ flex: 1 }}>
      <div 
        className={`${styles.input} ${styles.customSelect} ${isOpen ? styles.selectActive : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selected ? styles.selectedValue : styles.placeholderHide}>
          {selected}
        </span>
        
        <div className={`${styles.selectArrow} ${isOpen ? styles.arrowRotate : ""}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <label className={`${styles.floatingLabel} ${(selected || isOpen) ? styles.labelFloated : ""}`}>
        Ext.
      </label>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {EXTENSIONS.map((ext) => (
            <li 
              key={ext} 
              className={styles.dropdownOption}
              onClick={() => {
                setSelected(ext === "None" ? "" : ext);
                setIsOpen(false);
              }}
            >
              {ext}
              {selected === ext && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}