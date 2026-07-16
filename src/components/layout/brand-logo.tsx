import Link from "next/link";

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-0">
      <span
        className="text-5xl font-black tracking-tighter leading-none"
        style={{
          background: "linear-gradient(180deg, #4ade80 0%, #16a34a 50%, #15803d 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0px 2px 4px rgba(22, 163, 74, 0.2))",
        }}
      >
        Z
      </span>
      <span className="ml-1 text-2xl font-bold tracking-widest text-gray-900 uppercase italic">
        entra
      </span>
    </Link>
  );
}
