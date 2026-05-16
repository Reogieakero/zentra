export interface Student {
  lrn: string;
  name: string;
  grade: string;
  status: "Present" | "Late" | "Absent";
}

export interface AttendanceBar {
  type: "present" | "late" | "absent" | "break";
  flex: number;
  label: string;
}

export interface AttendanceDay {
  label: string;
  clockIn: string;
  clockOut: string;
  duration: string;
  approved?: boolean;
  late?: boolean;
  bars: AttendanceBar[];
}

export const ATTENDANCE_DAYS: AttendanceDay[] = [
  {
    label: "Today",
    clockIn: "07:30 AM",
    clockOut: "04:30 PM",
    duration: "8h 00m",
    bars: [
      { type: "present", flex: 270, label: "Class Time (AM)" },
      { type: "break",   flex: 60,  label: "Break" },
      { type: "present", flex: 210, label: "Class Time (PM)" },
    ],
  },
  {
    label: "Thursday, 18",
    clockIn: "07:30 AM",
    clockOut: "12:00 PM",
    duration: "4h 30m",
    bars: [
      { type: "present", flex: 270, label: "Class Time (AM)" },
      { type: "break",   flex: 60,  label: "Break" },
      { type: "absent",  flex: 210, label: "Absent (PM)" },
    ],
  },
  {
    label: "Wednesday, 17",
    clockIn: "-",
    clockOut: "-",
    duration: "-",
    approved: true,
    bars: [
      { type: "absent", flex: 270, label: "Absent (AM)" },
      { type: "break",  flex: 60,  label: "Break" },
      { type: "absent", flex: 210, label: "Absent (PM)" },
    ],
  },
  {
    label: "Tuesday, 16",
    clockIn: "08:15 AM",
    clockOut: "04:30 PM",
    duration: "8h 00m",
    late: true,
    bars: [
      { type: "late",    flex: 270, label: "Class Time (AM)" },
      { type: "break",   flex: 60,  label: "Break" },
      { type: "present", flex: 210, label: "Class Time (PM)" },
    ],
  },
  {
    label: "Monday, 15",
    clockIn: "07:30 AM",
    clockOut: "04:30 PM",
    duration: "8h 00m",
    bars: [
      { type: "present", flex: 270, label: "Class Time (AM)" },
      { type: "break",   flex: 60,  label: "Break" },
      { type: "present", flex: 210, label: "Class Time (PM)" },
    ],
  },
];

export const TIME_TICKS = ["7:30", "12:00", "1:00", "4:30"];