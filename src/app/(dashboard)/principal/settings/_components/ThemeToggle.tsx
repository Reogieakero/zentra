"use client";

import React, { useState } from "react";
import styles from "./ThemeToggle.module.css";
import { SunIcon, MoonIcon, MonitorIcon } from "./SettingsIcons";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeToggleProps {
  value?: ThemeMode;
  defaultValue?: ThemeMode;
  onChange?: (theme: ThemeMode) => void;
}

const OPTIONS: Array<{ value: ThemeMode; label: string; icon: React.ReactNode }> = [
  { value: "light", label: "Light", icon: <SunIcon /> },
  { value: "dark", label: "Dark", icon: <MoonIcon /> },
  { value: "system", label: "System", icon: <MonitorIcon /> },
];

/**
 * Presentational Light / Dark / System segmented control.
 * Uncontrolled by default (manages its own selected state) — pass `value`
 * + `onChange` if you want to control it from a parent or wire it up to a
 * real theme system later.
 */
export function ThemeToggle({ value, defaultValue = "system", onChange }: ThemeToggleProps) {
  const [internalValue, setInternalValue] = useState<ThemeMode>(defaultValue);
  const selected = value ?? internalValue;

  const handleSelect = (next: ThemeMode) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div className={styles.segmented} role="radiogroup" aria-label="Theme">
      {OPTIONS.map((opt) => {
        const isActive = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`${styles.segment} ${isActive ? styles.segmentActive : ""}`}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
