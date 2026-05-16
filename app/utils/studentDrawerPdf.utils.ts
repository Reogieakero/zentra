import { AttendanceBar, AttendanceDay } from "../principal/attendance/components/studentDrawer/studentDrawer.types";

export function getBarColor(type: AttendanceBar["type"]): string {
  if (type === "present") return "#6366f1";
  if (type === "late")    return "#f59e0b";
  if (type === "absent")  return "#ef4444";
  if (type === "break")   return "#d1d5db";
  return "#6366f1";
}

export function getShortLabel(type: AttendanceBar["type"], label: string): string {
  if (type === "break")  return "Break";
  if (type === "absent") return label.includes("AM") ? "Absent AM" : "Absent PM";
  if (label.includes("AM")) return "AM";
  if (label.includes("PM")) return "PM";
  return label;
}

export function computeStats(days: AttendanceDay[]) {
  return {
    totalDays:   days.length,
    presentDays: days.filter(d => d.bars.some(b => b.type === "present") && d.clockIn !== "-").length,
    absentDays:  days.filter(d => d.clockIn === "-").length,
    lateDays:    days.filter(d => d.late).length,
  };
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