"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./AtRiskStudents.module.css";

interface AtRiskStudent {
  id: string;
  name: string;
  grade: string;
  section: string;
  avatar: string;
  risk: "high" | "medium";
  flags: string[];
  absences: number;
  gpa: number;
}

const AT_RISK_STUDENTS: AtRiskStudent[] = [
  { id: "1", name: "Maria Santos",    grade: "10", section: "Rizal",   avatar: "MS", risk: "high",   flags: ["Absences", "GPA Drop"],      absences: 12, gpa: 74 },
  { id: "2", name: "Juan dela Cruz",  grade: "9",  section: "Bonifacio",avatar:"JD", risk: "high",   flags: ["Behavior", "Missing Work"],  absences: 8,  gpa: 71 },
  { id: "3", name: "Ana Reyes",       grade: "11", section: "Aguinaldo",avatar:"AR", risk: "medium", flags: ["GPA Drop"],                  absences: 5,  gpa: 78 },
  { id: "4", name: "Carlos Mendoza",  grade: "10", section: "Luna",    avatar: "CM", risk: "high",   flags: ["Absences", "Behavior"],      absences: 15, gpa: 68 },
  { id: "5", name: "Liza Gomez",      grade: "8",  section: "Mabini",  avatar: "LG", risk: "medium", flags: ["Missing Work", "GPA Drop"],  absences: 4,  gpa: 76 },
  { id: "6", name: "Rico Villanueva", grade: "12", section: "Burgos",  avatar: "RV", risk: "high",   flags: ["Absences", "GPA Drop"],      absences: 10, gpa: 70 },
  { id: "7", name: "Tricia Bautista", grade: "9",  section: "Silang",  avatar: "TB", risk: "medium", flags: ["Behavior"],                  absences: 3,  gpa: 79 },
  { id: "8", name: "Mark Aquino",     grade: "11", section: "Del Pilar",avatar:"MA", risk: "high",   flags: ["Absences", "Missing Work"],  absences: 11, gpa: 72 },
];

const SLIDE_INTERVAL = 3500;

export function AtRiskStudents() {
  const [current, setCurrent] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animState, setAnimState] = useState<"idle" | "exiting" | "entering">("idle");
  const [paused, setPaused] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = AT_RISK_STUDENTS.length;

  const triggerSlide = (nextIndex: number, slideDir: "next" | "prev") => {
    if (animState !== "idle") return;
    
    setDirection(slideDir);
    setAnimState("exiting");

    // After exit completes (300ms matches CSS transition), swap data & slide in
    setTimeout(() => {
      setCurrent(nextIndex);
      setDisplayIndex(nextIndex);
      setAnimState("entering");

      // Wrap up entering stage back to neutral idle
      setTimeout(() => {
        setAnimState("idle");
      }, 300);
    }, 300);
  };

  const handleNext = () => {
    const nextIndex = (current + 1) % total;
    triggerSlide(nextIndex, "next");
  };

  const handlePrev = () => {
    const prevIndex = (current - 1 + total) % total;
    triggerSlide(prevIndex, "prev");
  };

  const handleDotClick = (index: number) => {
    if (index === current || animState !== "idle") return;
    const slideDir = index > current ? "next" : "prev";
    triggerSlide(index, slideDir);
  };

  useEffect(() => {
    if (paused || animState !== "idle") return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, paused, animState]);

  const student = AT_RISK_STUDENTS[displayIndex];
  const isHigh = student.risk === "high";

  let animationClass = "";
  if (animState === "exiting") {
    animationClass = direction === "next" ? styles.slideOutLeft : styles.slideOutRight;
  } else if (animState === "entering") {
    animationClass = direction === "next" ? styles.slideInRight : styles.slideInLeft;
  } else {
    animationClass = styles.slideActive;
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.pulseRing} />
          <h2 className={styles.title}>At-Risk Students</h2>
        </div>
        <span className={styles.badge}>{total} flagged</span>
      </div>

      <div
        className={styles.carousel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={`${styles.slide} ${animationClass}`}>
          <div className={styles.studentTop}>
            <div className={`${styles.avatar} ${isHigh ? styles.avatarHigh : styles.avatarMed}`}>
              {student.avatar}
            </div>
            <div className={styles.studentInfo}>
              <p className={styles.studentName}>{student.name}</p>
              <p className={styles.studentMeta}>Grade {student.grade} — {student.section}</p>
            </div>
            <span className={`${styles.riskBadge} ${isHigh ? styles.riskHigh : styles.riskMed}`}>
              {isHigh ? "High" : "Medium"}
            </span>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{student.absences}</span>
              <span className={styles.statLabel}>Absences</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${student.gpa < 75 ? styles.statDanger : styles.statWarn}`}>
                {student.gpa}
              </span>
              <span className={styles.statLabel}>GPA</span>
            </div>
          </div>

          <div className={styles.flags}>
            {student.flags.map((f) => (
              <span key={f} className={styles.flag}>{f}</span>
            ))}
          </div>
        </div>

        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={handlePrev} aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={handleNext} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <div className={styles.dots}>
        {AT_RISK_STUDENTS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to student ${i + 1}`}
          />
        ))}
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ 
            animationDuration: `${SLIDE_INTERVAL}ms`, 
            animationPlayState: (paused || animState !== "idle") ? "paused" : "running" 
          }}
          key={`${current}-${paused}-${animState !== "idle"}`}
        />
      </div>
    </section>
  );
}