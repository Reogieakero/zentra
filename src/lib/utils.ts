export function formatDate(date: Date | null, format?: "full" | "short" | "month-year"): string {
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = {
    ...(format === "full" && { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    ...(format === "short" && { month: "short", day: "numeric", year: "numeric" }),
    ...(format === "month-year" && { month: "long", year: "numeric" }),
    ...(!format && { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  };
  return date.toLocaleDateString("en-US", options);
}

export function toDateStr(date: Date | null): string | null {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export function getGeneratedDate(): string {
  return new Date().toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
