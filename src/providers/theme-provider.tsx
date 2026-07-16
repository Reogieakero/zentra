"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("zentra-theme") as Theme) ?? "system";
    }
    return "system";
  });

  const resolved: "light" | "dark" = theme === "dark" || (theme === "system" && prefersDark) ? "dark" : "light";

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem("zentra-theme", t); } catch { /* noop */ }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [resolved]);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
