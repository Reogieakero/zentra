import styles from "./spinner.module.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap: Record<string, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <svg className={`${styles.base} ${sizeMap[size]}${className ? ` ${className}` : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className={styles.circle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className={styles.path} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
