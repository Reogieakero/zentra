"use client";

import { useState } from "react";

export function useDashboardDate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const displayDate = (selectedDate ?? new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return { selectedDate, setSelectedDate, displayDate };
}