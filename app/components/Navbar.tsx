import { BrandLogo } from "./icons/Brand";
import { NAV_LINKS } from "../constants/navigation";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <nav className={`${styles.nav} mx-auto flex max-w-7xl items-center justify-between px-6 py-5`}>
      <BrandLogo />

      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-gray-600 hover:text-violet-700 transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <a href="#" className="text-sm text-gray-600 hover:text-violet-700 transition-colors">
          Login
        </a>
        <a
          href="#"
          className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
        >
          Sign up
        </a>
      </div>
    </nav>
  );
}