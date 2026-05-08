import { GoogleAdsLogo, SlackLogo, TrelloLogo } from "./icons/IntegrationLogos";
import styles from "./FeatureSection.module.css";

const INTEGRATIONS = [
  { name: "Google Ads", Logo: GoogleAdsLogo },
  { name: "Slack", Logo: SlackLogo },
  { name: "Trello", Logo: TrelloLogo },
];

function CheckBadge() {
  return (
    <span
      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)" }}
    >
      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function FeatureTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 shadow-sm">
      {label}
      <CheckBadge />
    </span>
  );
}

function SalesTrackingCard() {
  return (
    <div className={`${styles.card} relative rounded-2xl overflow-hidden p-6`}>
      <div className="flex items-center justify-between mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-violet-50">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Track By category
        </span>
      </div>

      <div className={`${styles.trackCard} rounded-xl p-4 mb-5`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm">
            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">Fashion</p>
            <p className="text-xs text-gray-400">Apr 11 - 30</p>
          </div>
          <svg className="w-4 h-4 text-gray-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-2xl font-extrabold text-gray-900">12.000</span>
          <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 mb-0.5">
            +17.5%
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 rounded-b-2xl overflow-hidden">
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)", opacity: 0.18 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)", opacity: 0.28 }} />
      </div>
    </div>
  );
}

function IntegrationCard() {
  return (
    <div className={`${styles.card} rounded-2xl p-6`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #8b5cf6)" }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900">Connected Integration</span>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-violet-50">
          <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>

      {INTEGRATIONS.map(({ name, Logo }) => (
        <div key={name} className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-sm font-medium text-gray-700">{name}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Connected
          </span>
        </div>
      ))}
    </div>
  );
}

export function FeatureSection() {
  return (
    <>
      {/* Work faster section */}
      <section className={`${styles.section} mx-auto max-w-7xl px-6 py-12 text-center`}>
        <div className={styles.dotBg} />
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl mb-6">
          Work 5x faster, Save your time
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-500 mb-10 leading-relaxed">
          Zentra gives you a faster working experience complemented by several features that can make
          it easier for you.
        </p>
        <a href="#" className="group inline-flex items-center text-violet-600 font-semibold hover:text-violet-800 transition-colors">
          Learn more
          <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      {/* Why choose us section */}
      <section className={`${styles.section} mx-auto max-w-7xl px-6 py-16`}>
        <div className={styles.dotBgDense} />

        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-500 border border-violet-200 rounded-full px-4 py-1.5 mb-4 bg-white/80">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Don&apos;t miss all of its features
          </h2>
        </div>

        {/* Row 1: text LEFT, card RIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
          <div className="flex flex-col justify-center py-4">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-xs font-semibold text-violet-500 tracking-widest uppercase">
                tracking your sales easily
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-snug">
              Your sales are well organized
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              now you can see the progress of all the items you sell more easily. by getting good data
              then you can determine the next step
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <FeatureTag label="Sales Tracking" />
              <FeatureTag label="Chart Visualize" />
            </div>
          </div>

          <SalesTrackingCard />
        </div>

        {/* Row 2: card LEFT, text RIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <IntegrationCard />

          <div className="flex flex-col justify-center py-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-100">
                <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-violet-500 tracking-widest uppercase">
                integration with multiple platforms
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-snug">
              Integration make work easier
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Integration makes everything easier, connect our platform with many platforms out there
              so you can collaborate together in building a business.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <FeatureTag label="Integration" />
              <FeatureTag label="Data Security" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}