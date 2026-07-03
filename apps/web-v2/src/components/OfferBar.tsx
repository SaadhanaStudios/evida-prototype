/*
 * Concrete-offer chip bar (S1) — sits directly under the hero and answers
 * "what am I actually buying?" before any scrolling. The July 3 transcript's
 * core worry: people can't diagnose the concrete piece being delivered.
 */

const OFFER = [
  {
    label: "100+ biomarkers",
    sub: "drawn at a Randox clinic",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      </svg>
    ),
  },
  {
    label: "Wearables synced",
    sub: "Apple · Oura · Whoop · Garmin",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="6" width="10" height="12" rx="3" />
        <path d="M9 6V3h6v3M9 18v3h6v-3" />
      </svg>
    ),
  },
  {
    label: "90 min of GP time",
    sub: "two unhurried 45-min consults",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    label: "A plan + follow-up",
    sub: "reviewed at six months",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
  },
];

export default function OfferBar() {
  return (
    <section aria-label="What's included" className="container-site pb-4">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {OFFER.map((item) => (
          <div key={item.label} className="flex items-center gap-4 bg-surface px-6 py-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-light text-teal-dark">
              {item.icon}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{item.label}</span>
              <span className="block text-xs text-ink-soft">{item.sub}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
