import { forwardRef, type ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

const variantStyles: Record<string, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  outline: styles.outline,
  danger: styles.danger,
};

const sizeStyles: Record<string, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={`${styles.base} ${variantStyles[variant]} ${sizeStyles[size]}${className ? ` ${className}` : ""}`}
      {...props}
    />
  )
);
Button.displayName = "Button";