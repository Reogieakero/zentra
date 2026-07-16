"use client";

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/layout/hero";
import { CoreModules } from "@/components/layout/core-modules";
import { FeatureSection } from "@/components/layout/feature-section";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full font-sans overflow-hidden"
      style={{
        backgroundColor: "#f0fdf4",
        backgroundImage:
          "linear-gradient(160deg, #dcfce7 0%, #bbf7d0 30%, #f0fdf4 60%, #ffffff 100%)",
        position: "relative",
      }}
    >
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
            background: "rgba(22, 163, 74, 0.4)",
            filter: "blur(80px)",
            boxShadow: "0 0 120px 40px rgba(22, 163, 74, 0.3)",
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
            background: "rgba(74, 222, 128, 0.3)",
            filter: "blur(100px)",
            boxShadow: "0 0 150px 60px rgba(74, 222, 128, 0.25)",
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
              "repeating-linear-gradient(-52deg, transparent, transparent 48px, rgba(34,197,94,0.03) 48px, rgba(34,197,94,0.03) 50px)",
          }}
        />
      </div>

      <Navbar />
      <Hero />
      <CoreModules />
      <FeatureSection />
    </div>
  );
}