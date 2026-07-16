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
