"use client";

import React, { useState } from "react";
import styles from "./EndorsementsView.module.css";
import EndorsementsList from "./EndorsementsList";
import EndorsementDetail from "./EndorsementDetail";
import { endorsements as initialEndorsements, Endorsement, EndorsementStatus } from "../../data/mockData";

export default function EndorsementsView() {
  const [endorsements, setEndorsements] = useState<Endorsement[]>(initialEndorsements);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = endorsements.find((e) => e.id === selectedId) || null;

  const handleDecide = (id: string, status: EndorsementStatus, principalRemarks: string) => {
    setEndorsements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, principalRemarks } : e))
    );
  };

  return (
    <div className={styles.wrapper}>
      {selected ? (
        <EndorsementDetail
          endorsement={selected}
          onBack={() => setSelectedId(null)}
          onDecide={handleDecide}
        />
      ) : (
        <EndorsementsList endorsements={endorsements} onView={(id) => setSelectedId(id)} />
      )}
    </div>
  );
}
