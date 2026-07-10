"use client";

import React, { useState } from "react";
import styles from "./ReintegrationView.module.css";
import ReintegrationList from "./ReintegrationList";
import ReintegrationDetail from "./ReintegrationDetail";
import { reintegrationCases as initialCases, ReintegrationCase, ReintegrationStatus } from "../../data/mockData";

export default function ReintegrationView() {
  const [cases, setCases] = useState<ReintegrationCase[]>(initialCases);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = cases.find((c) => c.id === selectedId) || null;

  const handleDecide = (id: string, status: ReintegrationStatus, principalRemarks: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, principalRemarks } : c))
    );
  };

  return (
    <div className={styles.wrapper}>
      {selected ? (
        <ReintegrationDetail
          reintegrationCase={selected}
          onBack={() => setSelectedId(null)}
          onDecide={handleDecide}
        />
      ) : (
        <ReintegrationList cases={cases} onView={(id) => setSelectedId(id)} />
      )}
    </div>
  );
}
