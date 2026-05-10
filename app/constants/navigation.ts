export type NavChild = {
  label: string;
  href: string;
};

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  dropdown?: NavChild[];
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Docs",
    href: "/docs",
    external: true,
  },
  {
    label: "Solutions",
    href: "#",
    dropdown: [
      { label: "Enterprise", href: "/solutions/enterprise" },
      { label: "Startup", href: "/solutions/startups" },
      { label: "Solo Devs", href: "/solutions/solo-devs" },
      { label: "React Web Devs", href: "/solutions/react-web" },
    ],
  },
  { label: "Blog", href: "/blog" },
];
