"use client";

import { useState, useRef } from "react";
import { useClickOutside } from "./use-click-outside";

export function useUserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogout = async () => {
    await fetch("/api/principal-logout", { method: "POST" });
    window.location.href = "/principal-login";
  };

  return { isOpen, setIsOpen, dropdownRef, handleLogout };
}
