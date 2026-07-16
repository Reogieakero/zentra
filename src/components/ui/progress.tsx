import styles from "./progress.module.css";

interface ProgressProps {
  value: number;
  className?: string;
  barClassName?: string;
}

export function Progress({ value, className, barClassName }: ProgressProps) {
  return (
    <div className={`${styles.track}${className ? ` ${className}` : ""}`}>
      <div
        className={`${styles.bar}${barClassName ? ` ${barClassName}` : ""}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
