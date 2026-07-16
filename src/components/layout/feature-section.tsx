import styles from "./FeatureSection.module.css";

const FEATURE_CARDS = [
  {
    index: "01",
    icon: (
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, #16a34a, #22c55e)",
    tag: "Centralized Platform",
    title: "Student Records Management",
    description:
      "Securely manage and organize every student's records in one centralized platform — accessible, structured, and always up to date.",
    highlights: [
      "Unified student profile for each learner",
      "Role-scoped visibility and secure storage",
      "Instant record lookup across all grade levels",
    ],
    tags: ["Student Profiles", "Secure Storage"],
    accentColor: "#16a34a",
  },
  {
    index: "02",
    icon: (
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    tag: "Paperless Workflow",
    title: "Digital Document Processing",
    description:
      "Eliminate manual paperwork entirely. Documents are processed, routed, and stored digitally — reducing delays and human error.",
    highlights: [
      "Automated document intake and processing",
      "e-Document generation with e-signature support",
      "Audit trail for every document action",
    ],
    tags: ["Auto Processing", "e-Documents"],
    accentColor: "#0ea5e9",
  },
  {
    index: "03",
    icon: (
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, #10b981, #34d399)",
    tag: "Behavioral Tracking",
    title: "Anecdotal Record Tracking",
    description:
      "Capture and monitor student behavioral and academic observations with structured logging — giving teachers a clear developmental picture.",
    highlights: [
      "Timestamped behavioral and academic notes",
      "Linked directly to each student's profile",
      "Exportable for parent-teacher conferences",
    ],
    tags: ["Observations", "Academic Notes"],
    accentColor: "#10b981",
  },
  {
    index: "04",
    icon: (
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    tag: "Academic Records",
    title: "SF10 Management",
    description:
      "Simplify the full lifecycle of SF10 forms — from creation and updating to archiving and retrieval — with zero manual effort.",
    highlights: [
      "Pre-filled SF10 templates per student",
      "Grade-level and section filtering",
      "Bulk retrieval for year-end processing",
    ],
    tags: ["SF10 Forms", "Quick Retrieval"],
    accentColor: "#f59e0b",
  },
  {
    index: "05",
    icon: (
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, #ec4899, #f472b6)",
    tag: "ADM Records",
    title: "ADM Monitoring",
    description:
      "Track and manage Alternative Delivery Mode records with full compliance visibility — keeping learners on record no matter how they study.",
    highlights: [
      "Individual ADM learner tracking",
      "DepEd compliance reporting built-in",
      "Status flags and intervention history",
    ],
    tags: ["ADM Tracking", "Compliance"],
    accentColor: "#ec4899",
  },
  {
    index: "06",
    icon: (
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, #6366f1, #818cf8)",
    tag: "Access Control",
    title: "Secure Role-Based Access",
    description:
      "Every user sees only what they need to. Granular role assignments protect sensitive data while keeping workflows efficient.",
    highlights: [
      "6 distinct roles: admin, registrar, principal, teacher, and more",
      "Permission sets per module and record type",
      "Login activity logs and session management",
    ],
    tags: ["Role Management", "Permissions"],
    accentColor: "#6366f1",
  },
  {
    index: "07",
    icon: (
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, #14b8a6, #2dd4bf)",
    tag: "Instant Lookup",
    title: "Fast Search & Retrieval",
    description:
      "Stop wasting time hunting through folders. Zentra's smart search surfaces exactly what you need in under a second.",
    highlights: [
      "Full-text search across all records and documents",
      "Filter by name, section, grade, or document type",
      "Results load in under 1 second on average",
    ],
    tags: ["Smart Search", "Instant Results"],
    accentColor: "#14b8a6",
  },
  {
    index: "08",
    icon: (
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    iconBg: "linear-gradient(135deg, #f97316, #fb923c)",
    tag: "Data Insights",
    title: "Analytics & Reports",
    description:
      "Turn raw data into decisions. Generate structured reports across enrollment, attendance, documents, and academic performance.",
    highlights: [
      "30+ pre-built report templates",
      "Exportable to PDF and spreadsheet formats",
      "Visual dashboards for at-a-glance insights",
    ],
    tags: ["Auto Reports", "Insights"],
    accentColor: "#f97316",
  },
];

function FeatureCard({ feature }: { feature: (typeof FEATURE_CARDS)[0] }) {
  return (
    <div
      className={styles.gridCard}
      style={{
        boxShadow: `0 8px 48px ${feature.accentColor}18, 0 2px 12px rgba(0,0,0,0.06)`,
        border: `1px solid ${feature.accentColor}22`,
      }}
    >
      {/* 3-dot chrome header */}
      <div
        className={styles.chromeHeader}
        style={{
          background: `${feature.accentColor}0c`,
          borderBottom: `1px solid ${feature.accentColor}18`,
        }}
      >
        <span className={`${styles.chromeDot} ${styles.chromeDotRed}`} />
        <span className={`${styles.chromeDot} ${styles.chromeDotYellow}`} />
        <span className={`${styles.chromeDot} ${styles.chromeDotGreen}`} />
        <div
          className={styles.chromeAddressBar}
          style={{ background: `${feature.accentColor}12` }}
        >
          <span
            className={styles.chromeAddressText}
            style={{ color: `${feature.accentColor}88` }}
          >
            zentra.app / {feature.tag.toLowerCase().replace(/\s/g, "-")}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.cardBody}>
        {/* Icon + title */}
        <div className={styles.cardBodyHeader}>
          <div className={styles.cardBodyIcon} style={{ background: feature.iconBg }}>
            {feature.icon}
          </div>
          <div>
            <p className={styles.cardBodyTag} style={{ color: feature.accentColor }}>
              {feature.tag}
            </p>
            <p className={styles.cardBodyTitle}>{feature.title}</p>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.cardDivider} style={{ background: `${feature.accentColor}18` }} />

        {/* Highlight rows */}
        <div className={styles.highlightRows}>
          {feature.highlights.map((h, i) => (
            <div
              key={h}
              className={styles.highlightRow}
              style={{
                background: i === 0 ? `${feature.accentColor}0e` : "transparent",
                border: i === 0 ? `1px solid ${feature.accentColor}22` : "1px solid transparent",
              }}
            >
              <span
                className={styles.highlightRowDot}
                style={{ background: i === 0 ? feature.accentColor : `${feature.accentColor}55` }}
              />
              <span className={styles.highlightRowText}>{h}</span>
            </div>
          ))}
        </div>

        {/* Bottom tag strip */}
        <div
          className={styles.cardTagStrip}
          style={{ borderTopColor: `${feature.accentColor}12` }}
        >
          {feature.tags.map((t) => (
            <span
              key={t}
              className={styles.cardTagPill}
              style={{
                color: feature.accentColor,
                background: `${feature.accentColor}0d`,
                borderColor: `${feature.accentColor}30`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureSection() {
  return (
    <>
      {/* ── Work faster banner ── */}
      <section className={styles.bannerSection}>
        <div className={styles.dotBg} />
        <p className={styles.bannerEyebrow}>Built for Education Institution</p>
        <h2 className={styles.bannerHeading}>
          Work 5× faster.<br /> Save your time.
        </h2>
        <p className={styles.bannerDesc}>
          Zentra gives school staff a faster, cleaner experience — with every feature built around
          real daily workflows.
        </p>
        <a href="#" className={styles.bannerLink}>
          Explore the full platform
          <svg className={styles.bannerLinkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      {/* ── Features grid ── */}
      <section className={styles.featuresSection}>
        <div className={styles.dotBgDense} />

        {/* Section header */}
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionEyebrow}>Zentra?</span>
            <h2 className={styles.sectionHeading}>
              Everything your school<br /> school needs
            </h2>
          </div>
          <p className={styles.sectionSubtext}>
            8 core modules. One system. Designed to replace every spreadsheet and paper folder in
            your office.
          </p>
        </div>

        {/* 4-column grid */}
        <div className={styles.cardsGrid}>
          {FEATURE_CARDS.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>
    </>
  );
}