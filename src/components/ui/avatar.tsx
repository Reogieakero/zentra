import { getInitials } from "@/lib/utils";
import styles from "./avatar.module.css";

interface AvatarProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap: Record<string, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Avatar({ name, className, size = "md" }: AvatarProps) {
  return (
    <div className={`${styles.base} ${sizeMap[size]}${className ? ` ${className}` : ""}`}>
      {getInitials(name)}
    </div>
  );
}
