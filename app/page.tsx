"use client";

import Image from "next/image";

const NAV_LINKS = ["Discover", "Feature", "Resources", "Integration"];

const COMPANIES = [
  { name: "Airwallex", icon: (
    <svg viewBox="0 0 22 22" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2L2 20h18L11 2z" fill="#1a1a2e" />
    </svg>
  )},
  { name: "Razorpay", icon: (
    <svg viewBox="0 0 22 22" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="18" height="18" rx="4" fill="#1a1a2e" />
      <path d="M7 7h5a3 3 0 010 6H9v4H7V7z" fill="white" />
    </svg>
  )},
  { name: "DocuSign", icon: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#1a1a2e" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 18H6v-8h2v8zm5 0h-2V6h2v12zm5 0h-2v-5h2v5z"/>
    </svg>
  )},
  { name: "classpass", icon: (
    <svg viewBox="0 0 22 22" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="9" stroke="#1a1a2e" strokeWidth="2.5" />
      <circle cx="11" cy="11" r="4" fill="#1a1a2e" />
    </svg>
  )},
  { name: "Lattice", icon: (
    <svg viewBox="0 0 22 22" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="8" height="8" rx="1" fill="#1a1a2e" />
      <rect x="12" y="12" width="8" height="8" rx="1" fill="#1a1a2e" />
    </svg>
  )},
];

export default function Home() {
  return (
    <div
      className="min-h-screen w-full font-sans overflow-hidden"
      style={{
        backgroundColor: "#f5f3ff",
        backgroundImage: "linear-gradient(160deg, #f0edff 0%, #ede9fe 30%, #f5f3ff 60%, #ffffff 100%)",
        position: "relative",
      }}
    >
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "5%", left: "15%", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(124, 58, 237, 0.4)", filter: "blur(80px)", boxShadow: "0 0 120px 40px rgba(124, 58, 237, 0.3)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(167, 139, 250, 0.3)", filter: "blur(100px)", boxShadow: "0 0 150px 60px rgba(167, 139, 250, 0.25)" }} />
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "140%", height: "160%", background: "repeating-linear-gradient(-52deg, transparent, transparent 48px, rgba(139,92,246,0.03) 48px, rgba(139,92,246,0.03) 50px)" }} />
      </div>

      <nav style={{ position: "relative", zIndex: 10 }} className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center">
          <span className="text-5xl font-black tracking-tighter leading-none" style={{ background: "linear-gradient(180deg, #a78bfa 0%, #7c3aed 50%, #4c1d95 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0px 2px 4px rgba(124, 58, 237, 0.2))" }}>Z</span>
          <span className="ml-1 text-2xl font-bold tracking-widest text-gray-900 uppercase italic">entra</span>
        </div>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href="#" className="text-sm text-gray-600 hover:text-violet-700 transition-colors">{link}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-gray-600 hover:text-violet-700 transition-colors">Login</a>
          <a href="#" className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>Sign up</a>
        </div>
      </nav>

      <section style={{ position: "relative", zIndex: 10 }} className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-8 pt-6 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl" style={{ color: "#5b21b6" }}>Zentra: Streamlining School <br /> Documentation and Records</h1>
        <p className="mt-5 max-w-sm text-base leading-7 text-gray-500">Platform that provides a centralized school records management system designed to improve efficiency and organization.</p>
        <div className="mt-8 flex w-full max-w-md items-center overflow-hidden rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-sm">
          <input type="email" placeholder="Your email@gmail.com" className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none" />
          <button className="m-1 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}>Join Newsletter</button>
        </div>
        <p className="mt-3 text-xs text-gray-400">Join the newsletter now &nbsp;◇&nbsp; No charge required</p>
        <div style={{ position: "relative", marginTop: "2.5rem", width: "100%", maxWidth: "1100px" }}>
          <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "0 30px 80px -10px rgba(124,58,237,0.18), 0 8px 24px -4px rgba(124,58,237,0.10)", border: "1px solid rgba(139,92,246,0.12)", position: "relative" }}>
            <Image src="/landing-dashboard.png" alt="Zentra Dashboard" width={1100} height={680} className="w-full object-cover" priority />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to bottom, transparent 0%, rgba(245,243,255,0.55) 40%, rgba(240,237,255,0.85) 65%, #f0edff 80%, #f5f3ff 90%, #ffffff 100%)", pointerEvents: "none" }} />
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10 }} className="mx-auto max-w-full pb-12 overflow-hidden">
        <p className="text-center text-sm font-medium text-gray-400 mb-8 uppercase tracking-widest">Trusted by top fintech companies around the world</p>
        <div className="relative flex whitespace-nowrap overflow-hidden">
          <div className="animate-scroll flex gap-24 items-center">
            {[...COMPANIES, ...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, index) => (
              <div key={index} className="flex items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                {company.icon}
                <span className="text-xl font-bold tracking-tight text-gray-800">{company.name}</span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f5f3ff] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#ffffff] to-transparent z-10" />
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center">
        <div className="absolute inset-0 -z-10 opacity-20" style={{ backgroundImage: "radial-gradient(#7c3aed 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl mb-6">Work 5x faster, Save your time</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-500 mb-10 leading-relaxed">Zentra gives you a faster working experience complemented by several features that can make it easier for you.</p>
        <a href="#" className="group inline-flex items-center text-violet-600 font-semibold hover:text-violet-800 transition-colors">
          Learn more 
          <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>
    </div>
  );
}