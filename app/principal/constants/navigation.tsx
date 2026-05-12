import React from "react";

export interface SubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  subItems?: SubItem[];
}

export interface NavGroup {
  items: NavItem[];
}

export const NAV_LINKS: NavGroup[] = [
  {
    items: [
      {
        label: "School Overview",
        href: "/principal",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        ),
      },
      {
        label: "Students",
        href: "/principal/students",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        ),
      },
      {
        label: "Attendance",
        href: "/principal/attendance",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ),
      },
    ],
  },
  {
    items: [
      {
        label: "SF10",
        href: "/principal/sf10",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        ),
        subItems: [
          { label: "Dashboard", href: "/principal/sf10" },
          { label: "Student Records", href: "/principal/sf10/records" },
          { label: "Upload SF10", href: "/principal/sf10/upload" },
          { label: "Transfer Requests", href: "/principal/sf10/transfers" },
          { label: "Verification", href: "/principal/sf10/verification" },
          { label: "Archives", href: "/principal/sf10/archives" },
        ],
      },
      {
        label: "ADM",
        href: "/principal/adm",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        ),
        subItems: [
          { label: "Dashboard", href: "/principal/adm" },
          { label: "Enrollment Forms", href: "/principal/adm/forms" },
          { label: "Student Requirements", href: "/principal/adm/requirements" },
          { label: "Admission Status", href: "/principal/adm/status" },
          { label: "Admissions Monitoring", href: "/principal/adm/monitoring" },
          { label: "Archives", href: "/principal/adm/archives" },
        ],
      },
      {
        label: "Anecdotal",
        href: "/principal/anecdotal",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        ),
        subItems: [
          { label: "Dashboard", href: "/principal/anecdotal" },
          { label: "Behavior Reports", href: "/principal/anecdotal/behavior" },
          { label: "Guidance Notes", href: "/principal/anecdotal/guidance" },
          { label: "Incident Reports", href: "/principal/anecdotal/incidents" },
          { label: "Student Observations", href: "/principal/anecdotal/observations" },
          { label: "Archives", href: "/principal/anecdotal/archives" },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "Reports",
        href: "/principal/reports",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
      },
      {
        label: "Announcements",
        href: "/principal/announcements",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        ),
      },
      {
        label: "Users",
        href: "/principal/users",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        ),
      },
      {
        label: "Activity Logs",
        href: "/principal/activity-logs",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      },
      {
        label: "Settings",
        href: "/principal/settings",
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82" />
          </svg>
        ),
      },
    ],
  },
];