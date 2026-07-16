export type DocItem = {
  label: string;
  href: string;
};

export type DocSection = {
  title: string;
  items: DocItem[];
};

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Introduction", href: "/docs/introduction" },
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "Authentication", href: "/docs/authentication" },
      { label: "Dashboard Overview", href: "/docs/dashboard" },
    ],
  },
  {
    title: "Student Records",
    items: [
      { label: "SF10 Management", href: "/docs/sf10" },
      { label: "Anecdotal Records", href: "/docs/anecdotal" },
      { label: "ADM Monitoring", href: "/docs/adm" },
      { label: "Student Risk Assessment", href: "/docs/risk-assessment" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { label: "Reports & Analytics", href: "/docs/reports" },
      { label: "Performance Charts", href: "/docs/performance" },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "User Roles & Permissions", href: "/docs/roles" },
      { label: "Settings", href: "/docs/settings" },
      { label: "Security", href: "/docs/security" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "FAQ", href: "/docs/faq" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
      { label: "System Updates", href: "/docs/updates" },
    ],
  },
];