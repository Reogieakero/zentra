"use client";

import React, { useState, useEffect } from "react";
import styles from "./adm.module.css";

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */

const statCards = [
  {
    label: "Total Applications",
    value: "342",
    change: "+28 from last month",
    trend: "up",
    primary: true,
  },
  {
    label: "Approved Applicants",
    value: "218",
    change: "+14 from last month",
    trend: "up",
    primary: false,
  },
  {
    label: "Under Review",
    value: "87",
    change: "+6 from last month",
    trend: "up",
    primary: false,
  },
  {
    label: "Pending Documents",
    value: "37",
    change: "Requires action",
    trend: "down",
    primary: false,
  },
];

// Daily applications submitted (S M T W T F S)
const weeklyData = [
  { day: "S", count: 14 },
  { day: "M", count: 38 },
  { day: "T", count: 52 },
  { day: "W", count: 47, highlight: true },
  { day: "T", count: 29 },
  { day: "F", count: 21 },
  { day: "S", count: 9  },
];

const upcomingDeadline = {
  title: "Grade 7 Enrollment Cut-off",
  date: "May 25, 2025",
  time: "05:00 pm",
  slots: 12,
};

const pendingRequirements = [
  { id: "ADM-0201", name: "Form 138 / Report Card", icon: "📄", color: "#7c3aed", bg: "#f5f3ff" },
  { id: "ADM-0202", name: "PSA Birth Certificate",   icon: "📋", color: "#0ea5e9", bg: "#e0f2fe" },
  { id: "ADM-0203", name: "Medical Certificate",     icon: "🏥", color: "#10b981", bg: "#d1fae5" },
  { id: "ADM-0204", name: "Good Moral Certificate",  icon: "🎖️", color: "#f59e0b", bg: "#fef3c7" },
  { id: "ADM-0205", name: "2×2 ID Photo (2 copies)", icon: "🖼️", color: "#ec4899", bg: "#fce7f3" },
];

const recentApplicants = [
  { name: "Maria Santos",   task: "Submitted Form 138",                     status: "Approved",  statusClass: "badgeApproved",  initials: "MS", color: "#7c3aed" },
  { name: "Juan dela Cruz", task: "Missing PSA Birth Certificate",           status: "Pending",   statusClass: "badgePending",   initials: "JC", color: "#0ea5e9" },
  { name: "Ana Reyes",      task: "Completed all requirements",              status: "Approved",  statusClass: "badgeApproved",  initials: "AR", color: "#10b981" },
  { name: "Carlo Mendoza",  task: "Under evaluation by registrar",           status: "Review",    statusClass: "badgeReview",    initials: "CM", color: "#f59e0b" },
  { name: "Sofia Lim",      task: "Waiting for medical cert submission",     status: "Pending",   statusClass: "badgePending",   initials: "SL", color: "#ec4899" },
];

const admissionDeadlines = [
  { name: "Grade 7 Enrollment",       date: "Due: May 25, 2025",  icon: "📚" },
  { name: "Grade 11 SHS Admission",   date: "Due: May 30, 2025",  icon: "🎓" },
  { name: "Transfer Student Cutoff",  date: "Due: Jun 3, 2025",   icon: "🔄" },
  { name: "Late Enrollment Window",   date: "Due: Jun 10, 2025",  icon: "⏰" },
];

// Admission progress (approved / in-review / pending)
const admissionProgress = { approved: 64, review: 25, pending: 11 };

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ImportIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const FileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

/* ═══════════════════════════════════════
   TABS
═══════════════════════════════════════ */
type Tab = "dashboard" | "forms" | "requirements" | "status" | "monitoring" | "archives";

const tabs: { id: Tab; label: string }[] = [
  { id: "dashboard",    label: "Dashboard" },
  { id: "forms",        label: "Enrollment Forms" },
  { id: "requirements", label: "Student Requirements" },
  { id: "status",       label: "Admission Status" },
  { id: "monitoring",   label: "Admissions Monitoring" },
  { id: "archives",     label: "Archives" },
];

/* ═══════════════════════════════════════
   GAUGE SVG
═══════════════════════════════════════ */
function AdmissionGauge({ approved, review, pending }: { approved: number; review: number; pending: number }) {
  const cx = 90, cy = 90, r = 70;
  const circumference = Math.PI * r; // half-circle
  const total = approved + review + pending;

  const toArc = (pct: number) => (pct / total) * circumference;
  const approvedArc = toArc(approved);
  const reviewArc   = toArc(review);
  const pendingArc  = toArc(pending);

  // Stripes pattern for pending
  return (
    <svg viewBox="0 0 180 100" className={styles.gaugeSvg}>
      <defs>
        <pattern id="stripePattern" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#d1d5db" strokeWidth="3"/>
        </pattern>
      </defs>
      {/* Track */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="#f3f4f6" strokeWidth="14" strokeLinecap="round"
      />
      {/* Approved arc */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="#7c3aed" strokeWidth="14" strokeLinecap="round"
        strokeDasharray={`${approvedArc} ${circumference}`}
        strokeDashoffset={0}
      />
      {/* Review arc */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="#a78bfa" strokeWidth="14" strokeLinecap="butt"
        strokeDasharray={`${reviewArc} ${circumference}`}
        strokeDashoffset={-approvedArc}
      />
      {/* Pending arc — striped feel via lighter color */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke="#e5e7eb" strokeWidth="14" strokeLinecap="round"
        strokeDasharray={`${pendingArc} ${circumference}`}
        strokeDashoffset={-(approvedArc + reviewArc)}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════
   COUNTDOWN TIMER
═══════════════════════════════════════ */
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(targetDate + " 17:00:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft({ h: 0, m: 0, s: 0 }); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(timeLeft.h)}:${pad(timeLeft.m)}:${pad(timeLeft.s)}`;
}

/* ═══════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════ */
export default function ADMPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const countdown = useCountdown("2025-05-25");

  const maxBar = Math.max(...weeklyData.map((d) => d.count));

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.pageTitle}>ADM Dashboard</h1>
            <p className={styles.pageSubtitle}>Manage admissions, track applicants, and monitor enrollment with ease.</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnPrimary}><PlusIcon /> Add Applicant</button>
            <button className={styles.btnOutline}><ImportIcon /> Import Data</button>
          </div>
        </div>

        <nav className={styles.tabs} aria-label="ADM sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Body ── */}
      <main className={styles.body}>
        {activeTab === "dashboard" && (
          <>
            {/* ── ROW 1: Stat cards ── */}
            <div className={styles.statsGrid}>
              {statCards.map((s) => (
                <div
                  key={s.label}
                  className={`${styles.statCard} ${s.primary ? styles.statCardPrimary : ""}`}
                >
                  <button
                    className={`${styles.statCardLink} ${s.primary ? "" : styles.statCardLinkMuted}`}
                    aria-label={`Go to ${s.label}`}
                  >
                    <ArrowUpRight />
                  </button>
                  <p className={`${styles.statLabel} ${s.primary ? styles.statLabelLight : ""}`}>
                    {s.label}
                  </p>
                  <div className={`${styles.statValue} ${s.primary ? styles.statValueLight : ""}`}>
                    {s.value}
                  </div>
                  <div
                    className={`${styles.statChange} ${
                      s.primary
                        ? styles.statChangeLightUp
                        : s.trend === "up"
                        ? styles.statChangeUp
                        : styles.statChangeDown
                    }`}
                  >
                    {s.trend === "up" ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    )}
                    {s.change}
                  </div>
                </div>
              ))}
            </div>

            {/* ── ROW 2: Analytics | Deadline Reminder | Requirements ── */}
            <div className={styles.mainGrid}>

              {/* Analytics — weekly applications bar chart */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Application Analytics</h2>
                </div>
                <div className={styles.analyticsChart}>
                  {weeklyData.map((d, i) => (
                    <div key={i} className={styles.barWrap}>
                      <div
                        className={`${styles.bar} ${d.highlight ? styles.barToday : styles.barNormal}`}
                        style={{ height: `${Math.round((d.count / maxBar) * 90)}px` }}
                      >
                        {d.highlight && (
                          <span className={styles.barTooltip}>{d.count}</span>
                        )}
                      </div>
                      <span className={styles.barLabel}>{d.day}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "var(--space-3) var(--space-5)", borderTop: "1px solid var(--border-base)", display: "flex", gap: "var(--space-4)" }}>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                    Peak day: <strong style={{ color: "var(--brand-primary)" }}>Tuesday (52)</strong>
                  </span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                    Weekly total: <strong style={{ color: "var(--text-primary)" }}>210</strong>
                  </span>
                </div>
              </div>

              {/* Enrollment Deadline Reminder */}
              <div className={`${styles.reminderCard}`}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Enrollment Deadline</h2>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.reminderTitle}>{upcomingDeadline.title}</p>
                  <p className={styles.reminderMeta}>
                    <span className={styles.reminderMetaIcon}>
                      <ClockIcon /> {upcomingDeadline.date} · {upcomingDeadline.time}
                    </span>
                    <br />
                    <span style={{ marginTop: "2px", display: "inline-block" }}>
                      🪑 {upcomingDeadline.slots} slots remaining
                    </span>
                  </p>
                  <button className={styles.btnAction}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    View Full Schedule
                  </button>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Requirements</h2>
                  <button className={styles.btnSmall}><PlusIcon /> Add</button>
                </div>
                <div className={styles.pendingList}>
                  {pendingRequirements.map((req) => (
                    <div key={req.id} className={styles.pendingItem}>
                      <div className={styles.pendingItemLeft}>
                        <div
                          className={styles.pendingDot}
                          style={{ background: req.bg, color: req.color }}
                        >
                          {req.icon}
                        </div>
                        <div>
                          <p className={styles.pendingItemName}>{req.name}</p>
                          <p className={styles.pendingItemSub}>{req.id}</p>
                        </div>
                      </div>
                      <ArrowUpRight />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ROW 3: Applicants | Progress Gauge | Deadline Tracker ── */}
            <div className={styles.bottomGrid}>

              {/* Recent Applicants */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Recent Applicants</h2>
                  <button className={styles.btnSmall}><PlusIcon /> Add Applicant</button>
                </div>
                <div className={styles.applicantList}>
                  {recentApplicants.map((a, i) => (
                    <div key={i} className={styles.applicantItem}>
                      <div
                        className={styles.avatar}
                        style={{ background: a.color }}
                      >
                        {a.initials}
                      </div>
                      <div className={styles.applicantInfo}>
                        <p className={styles.applicantName}>{a.name}</p>
                        <p className={styles.applicantTask}>
                          <span className={styles.applicantTaskLink}>{a.task}</span>
                        </p>
                      </div>
                      <span className={`${styles.badge} ${styles[a.statusClass as keyof typeof styles]}`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admission Progress Gauge */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Admission Progress</h2>
                </div>
                <div className={styles.gaugeWrap}>
                  <AdmissionGauge {...admissionProgress} />
                  <div className={styles.gaugePct}>{admissionProgress.approved}%</div>
                  <p className={styles.gaugeSubtitle}>Fully Approved</p>
                  <div className={styles.gaugeLegend}>
                    <div className={styles.legendItem}>
                      <div className={styles.legendDot} style={{ background: "#7c3aed" }} />
                      Approved ({admissionProgress.approved}%)
                    </div>
                    <div className={styles.legendItem}>
                      <div className={styles.legendDot} style={{ background: "#a78bfa" }} />
                      In Review ({admissionProgress.review}%)
                    </div>
                    <div className={styles.legendItem}>
                      <div className={styles.legendDotStriped} />
                      Pending ({admissionProgress.pending}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Deadline Tracker — dark card */}
              <div className={styles.deadlineCard}>
                <div className={styles.deadlineCardHeader}>
                  <h2 className={styles.deadlineCardTitle}>Deadline Tracker</h2>
                </div>
                <div className={styles.deadlineTimer}>{countdown}</div>
                <p className={styles.deadlineTimerLabel}>Until Grade 7 Cutoff</p>
                <div className={styles.deadlineActions}>
                  <button className={`${styles.deadlineBtn} ${styles.deadlineBtnPause}`} aria-label="Pause">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  </button>
                  <button className={`${styles.deadlineBtn} ${styles.deadlineBtnStop}`} aria-label="Stop">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
                  </button>
                </div>
                <div className={styles.deadlineList}>
                  {admissionDeadlines.map((d, i) => (
                    <div key={i} className={styles.deadlineListItem}>
                      <div className={styles.deadlineListIcon}>{d.icon}</div>
                      <div>
                        <p className={styles.deadlineListName}>{d.name}</p>
                        <p className={styles.deadlineListDate}>{d.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Placeholder for unbuilt tabs ── */}
        {activeTab !== "dashboard" && (
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}><FileIcon /></div>
            <h3 className={styles.placeholderTitle}>{tabs.find((t) => t.id === activeTab)?.label}</h3>
            <p className={styles.placeholderSub}>This section is ready to be built out.</p>
          </div>
        )}
      </main>
    </div>
  );
}