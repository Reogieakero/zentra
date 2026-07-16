import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`${styles.input}${error ? ` ${styles.inputError}` : ""}${className ? ` ${className}` : ""}`}
        {...props}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
