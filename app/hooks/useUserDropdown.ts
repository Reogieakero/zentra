"use client";

import { useState, useRef, useEffect } from "react";

export type Theme = "dark" | "light" | "classic-dark" | "system";

export function useUserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/principal-logout", { method: "POST" });
    window.location.href = "/principal-login";
  };

  return { isOpen, setIsOpen, theme, setTheme, dropdownRef, handleLogout };
}