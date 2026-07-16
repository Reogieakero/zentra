import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./search-input.module.css";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => (
    <div className={`${styles.wrapper}${className ? ` ${className}` : ""}`}>
      <svg
        className={styles.icon}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input ref={ref} className={styles.input} {...props} />
    </div>
  )
);
SearchInput.displayName = "SearchInput";
