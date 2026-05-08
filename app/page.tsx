"use client";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustedCompanies } from "./components/TrustedCompanies";
import { FeatureSection } from "./components/FeatureSection";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full font-sans overflow-hidden"
      style={{
        backgroundColor: "#f5f3ff",
        backgroundImage:
          "linear-gradient(160deg, #f0edff 0%, #ede9fe 30%, #f5f3ff 60%, #ffffff 100%)",
        position: "relative",
      }}
    >
      {/* Background blobs & grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "15%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(124, 58, 237, 0.4)",
            filter: "blur(80px)",
            boxShadow: "0 0 120px 40px rgba(124, 58, 237, 0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(167, 139, 250, 0.3)",
            filter: "blur(100px)",
            boxShadow: "0 0 150px 60px rgba(167, 139, 250, 0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "140%",
            height: "160%",
            background:
              "repeating-linear-gradient(-52deg, transparent, transparent 48px, rgba(139,92,246,0.03) 48px, rgba(139,92,246,0.03) 50px)",
          }}
        />
      </div>

      <Navbar />
      <Hero />
      <TrustedCompanies />
      <FeatureSection />
    </div>
  );
}