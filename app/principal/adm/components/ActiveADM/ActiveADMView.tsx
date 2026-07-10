"use client";

import React, { useState } from "react";
import styles from "./ActiveADMView.module.css";
import ActiveADMList from "./ActiveADMList";
import ActiveADMDetail from "./ActiveADMDetail";
import { activeADMStudents } from "../../data/mockData";

type ViewMode = "details" | "progress";

export default function ActiveADMView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>("details");

  const selected = activeADMStudents.find((s) => s.id === selectedId) || null;

  const handleViewDetails = (id: string) => {
    setSelectedId(id);
    setMode("details");
  };

  const handleViewProgress = (id: string) => {
    setSelectedId(id);
    setMode("progress");
  };

  return (
    <div className={styles.wrapper}>
      {selected ? (
        <ActiveADMDetail
          key={`${selected.id}-${mode}`}
          student={selected}
          initialMode={mode}
          onBack={() => setSelectedId(null)}
        />
      ) : (
        <ActiveADMList
          students={activeADMStudents}
          onViewDetails={handleViewDetails}
          onViewProgress={handleViewProgress}
        />
      )}
    </div>
  );
}
