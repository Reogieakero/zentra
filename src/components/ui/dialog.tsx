"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import styles from "./dialog.module.css";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onClose, children, className }: DialogProps) {
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); document.body.style.overflow = ""; }, 200);
  }, [onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  if (!open && !closing) return null;

  const overlayClass = `${styles.overlay}${closing ? ` ${styles.overlayHidden}` : ` ${styles.overlayVisible}`}`;
  const panelClass = `${styles.panel}${closing ? ` ${styles.panelHidden}` : ` ${styles.panelVisible}`}${className ? ` ${className}` : ""}`;

  return (
    <div ref={overlayRef} className={overlayClass} onClick={handleClose}>
      <div className={panelClass} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
