export function BrandLogo() {
  return (
    <div className="flex items-center">
      <span
        className="text-5xl font-black tracking-tighter leading-none"
        style={{
          background: "linear-gradient(180deg, #a78bfa 0%, #7c3aed 50%, #4c1d95 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0px 2px 4px rgba(124, 58, 237, 0.2))",
        }}
      >
        Z
      </span>
      <span className="ml-1 text-2xl font-bold tracking-widest text-gray-900 uppercase italic">
        entra
      </span>
    </div>
  );
}