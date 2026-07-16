"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocsSidebar } from "./_components/docs-sidebar";
import styles from "./page.module.css";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <Button className={styles.copyBtn} onClick={handleCopy} variant="ghost" size="sm">
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.accordionItem}>
      <Button className={styles.accordionTrigger} onClick={() => setOpen(!open)} variant="ghost" size="sm">
        <span>{question}</span>
        <svg
          className={`${styles.accordionChevron} ${open ? styles.accordionChevronOpen : ""}`}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
      {open && <div className={styles.accordionBody}>{answer}</div>}
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className={styles.wrapper}>
      <DocsSidebar activeHref="/docs/introduction" />

      <main className={styles.main}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Platform Documentation
          </div>
          <h1 className={styles.heroHeading}>
            ZENTRA <span>Documentation</span>
          </h1>
          <p className={styles.heroSub}>
            Everything you need to understand, manage, and navigate the ZENTRA
            platform — the intelligent student records and monitoring system for
            modern schools.
          </p>
          <div className={styles.heroSearch}>
            <svg className={styles.heroSearchIcon} width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5.25" stroke="currentColor" strokeWidth="1.4" />
              <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              className={styles.heroSearchInput}
              type="text"
              placeholder="Search documentation..."
            />
            <span className={styles.heroSearchKbd}>⌘K</span>
          </div>
          <div className={styles.heroActions}>
            <a href="#introduction" className={styles.btnPrimary}>
              Get Started
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8.5 3.5L12 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#sf10" className={styles.btnSecondary}>
              Explore Modules
            </a>
          </div>
        </section>

        {/* ── Breadcrumb ── */}
        <nav className={styles.breadcrumb}>
          <a href="/docs">Docs</a>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Getting Started</span>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Introduction</span>
        </nav>

        {/* ════════════════════════════════
            A. INTRODUCTION
        ════════════════════════════════ */}
        <section id="introduction">
          <h2 className={styles.sectionHeading}>Introduction</h2>
          <p className={styles.sectionSub}>
            Welcome to ZENTRA — the centralized intelligent platform for managing
            student records, monitoring academic performance, and improving school
            administrative workflows.
          </p>

          <div className={styles.callout}>
            <svg className={styles.calloutIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p className={styles.calloutText}>
              New to ZENTRA? Begin with the{" "}
              <a href="#getting-started">Getting Started</a> section to have
              your first module running in minutes.
            </p>
          </div>

          <div className={styles.prose}>
            <h2>What is ZENTRA?</h2>
            <p>
              ZENTRA is a full-stack school management platform that consolidates
              student data, behavioral records, attendance, and risk analytics
              into one unified interface. It is designed for registrars,
              principals, teachers, and guidance counselors to collaborate
              efficiently.
            </p>
            <h2>Core capabilities</h2>
            <p>
              The platform covers <code>SF10 record management</code>,{" "}
              <code>anecdotal logging</code>, <code>ADM monitoring</code>,{" "}
              <code>risk assessment</code>, and deep{" "}
              <code>reports & analytics</code> — all secured behind role-based
              access control.
            </p>
          </div>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={`${styles.cardIcon} ${styles.cardIconViolet}`}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 10h6M7 7h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.cardTitle}>SF10 Records</div>
              <div className={styles.cardDesc}>Upload, verify, and manage student Form 10 records with approval workflows.</div>
            </div>
            <div className={styles.card}>
              <div className={`${styles.cardIcon} ${styles.cardIconSky}`}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 7v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.cardTitle}>ADM Monitoring</div>
              <div className={styles.cardDesc}>Track attendance, dropouts, and enrollment movement in real time.</div>
            </div>
            <div className={styles.card}>
              <div className={`${styles.cardIcon} ${styles.cardIconEmerald}`}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L3 7v11h14V7L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <rect x="7" y="11" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className={styles.cardTitle}>Risk Assessment</div>
              <div className={styles.cardDesc}>AI-assisted early intervention alerts for at-risk student identification.</div>
            </div>
            <div className={styles.card}>
              <div className={`${styles.cardIcon} ${styles.cardIconAmber}`}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M3 14l4-5 3 3 3-4 4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className={styles.cardTitle}>Analytics</div>
              <div className={styles.cardDesc}>Exportable reports, performance charts, and school-wide statistics.</div>
            </div>
            <div className={styles.card}>
              <div className={`${styles.cardIcon} ${styles.cardIconPink}`}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3.5 17c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className={styles.cardTitle}>Role Management</div>
              <div className={styles.cardDesc}>Fine-grained permissions for registrars, teachers, and administrators.</div>
            </div>
            <div className={styles.card}>
              <div className={`${styles.cardIcon} ${styles.cardIconIndigo}`}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.cardTitle}>Anecdotal Logs</div>
              <div className={styles.cardDesc}>Log behavioral observations and student incident records with a timeline view.</div>
            </div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            B. AUTHENTICATION
        ════════════════════════════════ */}
        <section id="authentication">
          <h2 className={styles.sectionHeading}>Authentication & Login</h2>
          <p className={styles.sectionSub}>
            ZENTRA uses a secure, role-based authentication system to ensure
            each user accesses only what they are authorized for.
          </p>

          <div className={styles.workflow}>
            {[
              { title: "Navigate to Login", desc: "Go to your school's ZENTRA portal URL and click Sign In." },
              { title: "Enter credentials", desc: "Input your institutional email and password assigned by your administrator." },
              { title: "Role detection", desc: "The system reads your assigned role and routes you to the appropriate dashboard view." },
              { title: "Session established", desc: "A secure JWT session is created. Sessions expire after 8 hours of inactivity." },
              { title: "Password recovery", desc: "Click Forgot Password on the login screen. A reset link is sent to your registered email within 2 minutes." },
            ].map((step, i, arr) => (
              <div key={i} className={styles.workflowStep}>
                <div className={styles.workflowLine}>
                  <div className={styles.workflowNum}>{i + 1}</div>
                  {i < arr.length - 1 && <div className={styles.workflowConnector} />}
                </div>
                <div className={styles.workflowContent}>
                  <div className={styles.workflowTitle}>{step.title}</div>
                  <div className={styles.workflowDesc}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.prose}>
            <h2>Role-based access</h2>
            <p>
              Access is enforced at both the route and data level. A{" "}
              <code>Teacher</code> cannot view another teacher's records, and a{" "}
              <code>Guidance Counselor</code> sees only counseling-relevant data.
              Administrators can manage all roles from the{" "}
              <code>Settings → User Management</code> panel.
            </p>
          </div>

          <div className={styles.codeBlock}>
            <div className={styles.codeBlockHeader}>
              <span className={styles.codeBlockLang}>TypeScript</span>
              <CopyButton text={`import { getServerSession } from 'next-auth';\nimport { authOptions } from '@/lib/auth';\n\nconst session = await getServerSession(authOptions);\nif (!session) redirect('/login');`} />
            </div>
            <pre>
              <span className="keyword">import</span>{" "}{"{ getServerSession }"}{" "}
              <span className="keyword">from</span>{" "}
              <span className="string">'next-auth'</span>;{"\n"}
              <span className="keyword">import</span>{" "}{"{ authOptions }"}{" "}
              <span className="keyword">from</span>{" "}
              <span className="string">'@/lib/auth'</span>;{"\n\n"}
              <span className="keyword">const</span> session ={" "}
              <span className="keyword">await</span>{" "}
              <span className="fn">getServerSession</span>(authOptions);{"\n"}
              <span className="keyword">if</span> (!session){" "}
              <span className="fn">redirect</span>(
              <span className="string">'/login'</span>);
            </pre>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            C. SF10 MANAGEMENT
        ════════════════════════════════ */}
        <section id="sf10">
          <h2 className={styles.sectionHeading}>SF10 Management</h2>
          <p className={styles.sectionSub}>
            Upload, edit, verify, and organize student Form 10 records with a
            structured approval workflow.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>1,284</div>
              <div className={styles.statLabel}>Total Records</div>
              <div className={styles.statDelta}>↑ 12%</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>47</div>
              <div className={styles.statLabel}>Pending Review</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>1,201</div>
              <div className={styles.statLabel}>Approved</div>
              <div className={styles.statDelta}>↑ 5%</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>36</div>
              <div className={styles.statLabel}>Flagged</div>
            </div>
          </div>

          <div className={styles.uploadCard}>
            <div className={styles.uploadIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 13V4M6.5 7.5L10 4l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 14v1a2 2 0 002 2h8a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.uploadTitle}>Upload SF10 Records</div>
            <div className={styles.uploadSub}>Drag & drop PDF or Excel files here, or click to browse. Max 25 MB per file.</div>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Grade & Section</th>
                  <th>Uploaded</th>
                  <th>Status</th>
                  <th>Verified By</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2024-001", "Maria Santos", "Grade 10 — Rizal", "May 2, 2025", "Approved", "R. Cruz"],
                  ["2024-002", "Juan dela Cruz", "Grade 9 — Bonifacio", "May 3, 2025", "Pending", "—"],
                  ["2024-003", "Ana Reyes", "Grade 11 — STEM A", "May 4, 2025", "Flagged", "L. Torres"],
                  ["2024-004", "Carlo Mendoza", "Grade 10 — Mabini", "May 5, 2025", "Approved", "R. Cruz"],
                  ["2024-005", "Sofia Garcia", "Grade 12 — ABM B", "May 6, 2025", "Pending", "—"],
                ].map(([id, name, section, date, status, by]) => (
                  <tr key={id}>
                    <td><code style={{ fontSize: "12px" }}>{id}</code></td>
                    <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{name}</td>
                    <td>{section}</td>
                    <td>{date}</td>
                    <td>
                      <span className={`${styles.badge} ${
                        status === "Approved" ? styles.badgeGreen :
                        status === "Pending"  ? styles.badgeYellow :
                        styles.badgeRed
                      }`}>{status}</span>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            D. ANECDOTAL RECORDS
        ════════════════════════════════ */}
        <section id="anecdotal">
          <h2 className={styles.sectionHeading}>Anecdotal Records</h2>
          <p className={styles.sectionSub}>
            Log behavioral observations, incidents, and counseling notes against
            individual student timelines.
          </p>

          <div className={styles.prose}>
            <h2>Observation logging</h2>
            <p>
              Teachers and guidance counselors can create timestamped anecdotal
              entries linked to a student's profile. Entries support rich text,
              severity tags (<code>info</code>, <code>warning</code>,{" "}
              <code>critical</code>), and attachment uploads.
            </p>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Incident</th>
                  <th>Logged By</th>
                  <th>Severity</th>
                  <th>Follow-up</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Apr 28", "Maria Santos", "Repeated tardiness (3x this week)", "Ms. Lim", "warning", "Scheduled"],
                  ["Apr 29", "Juan dela Cruz", "Verbal altercation in corridor", "Mr. Ramos", "critical", "Completed"],
                  ["Apr 30", "Ana Reyes", "Excellent participation in class debate", "Ms. Lim", "info", "None"],
                  ["May 2", "Carlo Mendoza", "Missing 2 consecutive homework submissions", "Mr. Santos", "warning", "Pending"],
                ].map(([date, student, incident, by, sev, fu], i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{date}</td>
                    <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{student}</td>
                    <td>{incident}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{by}</td>
                    <td>
                      <span className={`${styles.badge} ${
                        sev === "critical" ? styles.badgeRed :
                        sev === "warning"  ? styles.badgeYellow :
                        styles.badgeBlue
                      }`}>{sev}</span>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${
                        fu === "Completed" ? styles.badgeGreen :
                        fu === "Scheduled" ? styles.badgePurple :
                        fu === "Pending"   ? styles.badgeYellow :
                        styles.badgeGray
                      }`}>{fu}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            E. ADM MONITORING
        ════════════════════════════════ */}
        <section id="adm">
          <h2 className={styles.sectionHeading}>ADM Monitoring</h2>
          <p className={styles.sectionSub}>
            Track attendance, dropouts, transfers, and enrollment movement across
            all grade levels and sections in real time.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>3,412</div>
              <div className={styles.statLabel}>Enrolled</div>
              <div className={styles.statDelta}>↑ 3%</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>94.2%</div>
              <div className={styles.statLabel}>Attendance Rate</div>
              <div className={styles.statDelta}>↑ 1.1%</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>18</div>
              <div className={styles.statLabel}>Dropouts (YTD)</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>41</div>
              <div className={styles.statLabel}>Transfers In</div>
              <div className={styles.statDelta}>↑ 8%</div>
            </div>
          </div>

          <div className={styles.prose}>
            <h2>Attendance monitoring</h2>
            <p>
              Daily attendance is synced from the class record module. The ADM
              dashboard highlights students with attendance below{" "}
              <code>85%</code> and triggers automated alerts to their assigned
              guidance counselor.
            </p>
            <h2>Dropout tracking</h2>
            <p>
              When a student is marked <code>dropped</code>, the system logs the
              reason code, last date of attendance, and notifies the registrar
              for official ADM record update.
            </p>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            F. RISK ASSESSMENT
        ════════════════════════════════ */}
        <section id="risk-assessment">
          <h2 className={styles.sectionHeading}>Student Risk Assessment</h2>
          <p className={styles.sectionSub}>
            AI-assisted risk scoring helps identify at-risk students early so
            counselors can intervene before issues escalate.
          </p>

          <div className={styles.riskGrid}>
            <div className={`${styles.riskCard} ${styles.riskLow}`}>
              <div className={styles.riskLabel}>Low Risk</div>
              <div className={styles.riskCount}>2,841</div>
              <div className={styles.riskDesc}>On track academically and behaviorally</div>
              <div className={styles.riskBar}><div className={styles.riskBarFill} /></div>
            </div>
            <div className={`${styles.riskCard} ${styles.riskMedium}`}>
              <div className={styles.riskLabel}>Medium Risk</div>
              <div className={styles.riskCount}>387</div>
              <div className={styles.riskDesc}>Minor flags; monitoring recommended</div>
              <div className={styles.riskBar}><div className={styles.riskBarFill} /></div>
            </div>
            <div className={`${styles.riskCard} ${styles.riskHigh}`}>
              <div className={styles.riskLabel}>High Risk</div>
              <div className={styles.riskCount}>149</div>
              <div className={styles.riskDesc}>Multiple risk factors detected</div>
              <div className={styles.riskBar}><div className={styles.riskBarFill} /></div>
            </div>
            <div className={`${styles.riskCard} ${styles.riskCrit}`}>
              <div className={styles.riskLabel}>Critical</div>
              <div className={styles.riskCount}>35</div>
              <div className={styles.riskDesc}>Immediate intervention required</div>
              <div className={styles.riskBar}><div className={styles.riskBarFill} /></div>
            </div>
          </div>

          <div className={styles.callout}>
            <svg className={styles.calloutIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L1.5 13.5h13L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M8 7v3M8 11.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p className={styles.calloutText}>
              Students flagged as <strong>Critical</strong> automatically
              trigger an alert to the assigned Guidance Counselor and Principal.
              Alerts appear in the notification panel and via email within 60
              seconds of detection.
            </p>
          </div>

          <div className={styles.prose}>
            <h2>Risk scoring model</h2>
            <p>
              The scoring engine weighs attendance rate, grade performance trend,
              behavioral incident count, and socio-economic flags to produce a
              composite risk score from <code>0</code> (no risk) to{" "}
              <code>100</code> (critical). Thresholds are configurable by the
              school administrator.
            </p>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            G. REPORTS & ANALYTICS
        ════════════════════════════════ */}
        <section id="reports">
          <h2 className={styles.sectionHeading}>Reports & Analytics</h2>
          <p className={styles.sectionSub}>
            Generate, filter, and export school-wide reports in multiple formats.
            All reports update in real time as underlying data changes.
          </p>

          <div className={styles.exportRow}>
          <Button className={`${styles.exportBtn} ${styles.exportBtnPdf}`} variant="outline" size="sm">
              Export PDF
            </Button>
            <Button className={`${styles.exportBtn} ${styles.exportBtnExcel}`} variant="outline" size="sm">
              Export Excel
            </Button>
            <Button className={`${styles.exportBtn} ${styles.exportBtnCsv}`} variant="outline" size="sm">
              Export CSV
            </Button>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>98.1%</div>
              <div className={styles.statLabel}>Retention Rate</div>
              <div className={styles.statDelta}>↑ 0.4%</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>87.4</div>
              <div className={styles.statLabel}>Avg. GWA</div>
              <div className={styles.statDelta}>↑ 2.1</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>312</div>
              <div className={styles.statLabel}>Reports Generated</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>6</div>
              <div className={styles.statLabel}>Active Quarters</div>
            </div>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            H. USER ROLES & PERMISSIONS
        ════════════════════════════════ */}
        <section id="roles">
          <h2 className={styles.sectionHeading}>User Roles & Permissions</h2>
          <p className={styles.sectionSub}>
            ZENTRA uses a five-tier role model. Each role has precisely scoped
            access to modules and data.
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.permTable}>
              <thead>
                <tr>
                  <th>Permission</th>
                  <th>Registrar</th>
                  <th>Principal</th>
                  <th>Teacher</th>
                  <th>Guidance</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["View SF10 Records",       true,  true,  true,  true,  true ],
                  ["Upload SF10 Records",     true,  false, false, false, true ],
                  ["Approve SF10",            true,  true,  false, false, true ],
                  ["Log Anecdotal Records",   false, false, true,  true,  true ],
                  ["View Anecdotal Records",  false, true,  false, true,  true ],
                  ["ADM Monitoring",          true,  true,  false, false, true ],
                  ["Risk Assessment View",    false, true,  false, true,  true ],
                  ["Export Reports",          true,  true,  false, false, true ],
                  ["Manage Users",            false, false, false, false, true ],
                  ["System Settings",         false, false, false, false, true ],
                ].map(([perm, reg, pri, tea, gui, adm], i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{perm as string}</td>
                    {[reg, pri, tea, gui, adm].map((v, j) => (
                      <td key={j} style={{ textAlign: "center" }}>
                        {v
                          ? <span className={styles.permCheck}>✓</span>
                          : <span className={styles.permX}>—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            I. FAQ
        ════════════════════════════════ */}
        <section id="faq">
          <h2 className={styles.sectionHeading}>Frequently Asked Questions</h2>
          <p className={styles.sectionSub}>
            Common questions about the ZENTRA platform.
          </p>

          <div className={styles.accordion}>
            {[
              {
                question: "How do I reset a student's SF10 record after it has been approved?",
                answer: "Only a Registrar or Administrator can revert an approved SF10. Navigate to SF10 Management → find the record → click 'Request Revision'. The record is placed back into Pending status and the approver is notified.",
              },
              {
                question: "Can teachers view risk assessment scores?",
                answer: "No. Risk assessment data is restricted to Guidance Counselors and the Principal by default. Administrators can grant elevated read access to specific teachers from the User Roles panel.",
              },
              {
                question: "How often does the risk model re-evaluate students?",
                answer: "The AI scoring engine re-evaluates all active students nightly at 2:00 AM. Counselors can also trigger a manual re-evaluation at any time from the Risk Assessment dashboard.",
              },
              {
                question: "What file formats are accepted for SF10 upload?",
                answer: "ZENTRA accepts PDF, XLSX, and DOCX files up to 25 MB per upload. Bulk uploads of up to 50 files can be done via the batch import tool under SF10 Management → Bulk Upload.",
              },
              {
                question: "Is data backed up automatically?",
                answer: "Yes. ZENTRA performs encrypted incremental backups every 6 hours and a full snapshot every 24 hours. Backup retention is 90 days. Restore requests can be submitted via the Support portal.",
              },
              {
                question: "How do I add a new school year cohort?",
                answer: "Administrators can initialize a new school year from Settings → Academic Year → New Year Setup. This creates a fresh enrollment roster while preserving all historical records.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            J. TROUBLESHOOTING
        ════════════════════════════════ */}
        <section id="troubleshooting">
          <h2 className={styles.sectionHeading}>Troubleshooting</h2>
          <p className={styles.sectionSub}>
            Common issues and their solutions.
          </p>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Likely Cause</th>
                  <th>Solution</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cannot log in", "Wrong credentials or locked account", "Use Forgot Password or contact your Administrator to unlock the account."],
                  ["SF10 upload fails", "File exceeds 25 MB or unsupported format", "Compress the file or convert to PDF before uploading."],
                  ["Dashboard shows no data", "School year not initialized", "Go to Settings → Academic Year and activate the current school year."],
                  ["Risk scores not updating", "Nightly job may have failed", "Trigger a manual re-evaluation from the Risk Assessment page or contact support."],
                  ["Report export is empty", "No data matches selected filters", "Widen the date range or clear grade/section filters and retry."],
                  ["Cannot see anecdotal records", "Insufficient role permissions", "Request access from your Administrator under User Roles & Permissions."],
                  ["Session expires too quickly", "Browser is blocking cookies", "Allow cookies for your ZENTRA portal domain in browser settings."],
                ].map(([issue, cause, sol], i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500, color: "var(--text-primary)", whiteSpace: "nowrap" }}>{issue}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "13px" }}>{cause}</td>
                    <td>{sol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* ════════════════════════════════
            K. SYSTEM UPDATES / CHANGELOG
        ════════════════════════════════ */}
        <section id="updates">
          <h2 className={styles.sectionHeading}>System Updates</h2>
          <p className={styles.sectionSub}>
            A changelog of all major ZENTRA platform releases.
          </p>

          <div className={styles.timeline}>
            {[
              {
                version: "v1.3.0",
                date: "May 2025",
                items: [
                  "AI Risk Assessment engine upgraded with improved multi-factor scoring",
                  "Anecdotal records now support file attachments up to 10 MB",
                  "New bulk SF10 import tool (up to 50 files per batch)",
                  "Performance improvements: dashboard loads 40% faster",
                ],
              },
              {
                version: "v1.2.0",
                date: "February 2025",
                items: [
                  "Introduced ADM Monitoring module with real-time dropout alerts",
                  "Added Excel and CSV export options to Reports",
                  "Role management UI redesigned for clarity",
                  "Fixed: session timeout not resetting on activity",
                ],
              },
              {
                version: "v1.1.0",
                date: "November 2024",
                items: [
                  "SF10 approval workflow with multi-level sign-off",
                  "Guidance Counselor dashboard with intervention tracker",
                  "Email notifications for critical risk alerts",
                  "Added dark mode support",
                ],
              },
              {
                version: "v1.0.0",
                date: "August 2024",
                items: [
                  "Initial launch of ZENTRA platform",
                  "SF10 Management module",
                  "Anecdotal Records with timeline view",
                  "Basic Analytics Dashboard",
                  "Role-based access control (5 roles)",
                ],
              },
            ].map((entry) => (
              <div key={entry.version} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineVersion}>{entry.version}</div>
                <div className={styles.timelineDate}>{entry.date}</div>
                <ul className={styles.timelineList}>
                  {entry.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Page nav ── */}
        <nav className={styles.pageNav}>
          <a href="/docs" className={styles.pageNavCard}>
            <span className={styles.pageNavLabel}>← Previous</span>
            <span className={styles.pageNavTitle}>Overview</span>
          </a>
          <a href="/docs/getting-started" className={`${styles.pageNavCard} ${styles.next}`}>
            <span className={styles.pageNavLabel}>Next →</span>
            <span className={styles.pageNavTitle}>Getting Started</span>
          </a>
        </nav>

        {/* ════════════════════════════════
            FOOTER
        ════════════════════════════════ */}
        <footer className={styles.footer}>
          <div className={styles.footerCta}>
            <div>
              <div className={styles.footerCtaText}>Need more help?</div>
              <div className={styles.footerCtaSub}>Contact the ZENTRA support team — we respond within one business day.</div>
            </div>
            <div className={styles.footerCtaBtns}>
              <a href="/support" className={styles.btnPrimary}>Contact Support</a>
              <a href="/dashboard" className={styles.btnSecondary}>Return to Dashboard</a>
            </div>
          </div>

          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogoRow}>
                <div className={styles.footerLogoMark}>Z</div>
                <span className={styles.footerLogoName}>ZENTRA</span>
              </div>
              <p className={styles.footerTagline}>
                Intelligent student records and monitoring management for modern schools.
              </p>
              <div className={styles.footerSocials}>
                <a href="#" className={styles.footerSocial} aria-label="Facebook">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M9.5 3H11V1h-1.5C7.57 1 6.5 2.07 6.5 3.5V5H5v2h1.5v8h2V7H10l.5-2H8.5V3.5c0-.28.22-.5.5-.5H9.5z" />
                  </svg>
                </a>
                <a href="#" className={styles.footerSocial} aria-label="Twitter">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.5 3a5.36 5.36 0 01-1.54.42A2.7 2.7 0 0013.14 2a5.41 5.41 0 01-1.7.65A2.69 2.69 0 008 5.17 7.63 7.63 0 012.5 2.5a2.69 2.69 0 00.83 3.59A2.67 2.67 0 012 5.68v.03a2.69 2.69 0 002.16 2.64 2.7 2.7 0 01-1.22.05 2.69 2.69 0 002.52 1.87A5.4 5.4 0 012 11.29 7.62 7.62 0 005.77 12.5c4.92 0 7.61-4.08 7.61-7.61l-.01-.35A5.44 5.44 0 0015 3.1a5.36 5.36 0 01-1.5.41z" />
                  </svg>
                </a>
                <a href="#" className={styles.footerSocial} aria-label="GitHub">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a7 7 0 00-2.21 13.64c.35.06.48-.15.48-.34v-1.2C4.1 13.57 3.7 12 3.7 12a2.17 2.17 0 00-.9-1.2c-.74-.5.06-.49.06-.49a1.72 1.72 0 011.26.85 1.74 1.74 0 002.38.68 1.74 1.74 0 01.52-1.09c-1.82-.21-3.73-.91-3.73-4.04a3.16 3.16 0 01.84-2.19 2.93 2.93 0 01.08-2.16s.69-.22 2.25.84a7.76 7.76 0 014.1 0c1.56-1.06 2.24-.84 2.24-.84a2.93 2.93 0 01.08 2.16 3.15 3.15 0 01.84 2.19c0 3.14-1.91 3.83-3.73 4.03a1.95 1.95 0 01.55 1.51v2.24c0 .19.13.41.48.34A7 7 0 008 1z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Documentation</div>
              <ul className={styles.footerColLinks}>
                <li><a href="/docs/introduction">Introduction</a></li>
                <li><a href="/docs/getting-started">Getting Started</a></li>
                <li><a href="/docs/authentication">Authentication</a></li>
                <li><a href="/docs/sf10">SF10 Management</a></li>
                <li><a href="/docs/reports">Reports</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Platform</div>
              <ul className={styles.footerColLinks}>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/docs/roles">User Roles</a></li>
                <li><a href="/docs/settings">Settings</a></li>
                <li><a href="/docs/security">Security</a></li>
                <li><a href="/docs/updates">Changelog</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Support</div>
              <ul className={styles.footerColLinks}>
                <li><a href="/docs/faq">FAQ</a></li>
                <li><a href="/docs/troubleshooting">Troubleshooting</a></li>
                <li><a href="/support">Contact Support</a></li>
                <li><a href="/docs/updates">System Status</a></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span className={styles.footerCopyright}>© 2025 ZENTRA. All rights reserved.</span>
            <div className={styles.footerBottomLinks}>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/security">Security</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}