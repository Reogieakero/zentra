import { forwardRef, type HTMLAttributes } from "react";
import styles from "./badge.module.css";

const variantStyles: Record<string, string> = {
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
  outline: styles.outline,
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variantStyles;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "default", ...props }, ref) => (
  <span ref={ref} className={`${styles.base} ${variantStyles[variant]}${className ? ` ${className}` : ""}`} {...props} />
));
Badge.displayName = "Badge";
