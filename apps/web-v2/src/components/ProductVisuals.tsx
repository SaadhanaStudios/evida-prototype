/*
 * CSS-built product visuals. Deliberate choice from the July 3 review:
 * no stock "smiling doctor" photos, no generic running-lady video — show
 * the actual product surface (biomarkers, wearable data, GP plan) instead.
 * These are stand-ins for real dashboard screenshots when ready.
 */

function Sparkline({ points, stroke = "#216A73" }: { points: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-full" preserveAspectRatio="none" aria-hidden>
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardCard() {
  return (
    <div className="card relative overflow-hidden" aria-hidden>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Your baseline</div>
          <div className="h-display mt-1 text-2xl">104 biomarkers analysed</div>
        </div>
        <span className="rounded-full bg-teal-light px-3 py-1 text-xs font-semibold text-teal-dark">
          Reviewed by Dr Shah
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-line bg-cream p-4">
          <div className="text-xs text-ink-soft">HbA1c</div>
          <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-teal-dark">34 mmol/mol</div>
          <Sparkline points="0,26 20,24 40,25 60,20 80,18 100,14 120,12" />
          <div className="mt-1 text-xs font-medium text-teal">Improving since baseline</div>
        </div>
        <div className="rounded-xl border border-line bg-cream p-4">
          <div className="text-xs text-ink-soft">Resting heart rate · Oura</div>
          <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-teal-dark">58 bpm</div>
          <Sparkline points="0,14 20,16 40,12 60,15 80,11 100,12 120,9" stroke="#C8862F" />
          <div className="mt-1 text-xs font-medium text-amber">7-day trend, synced today</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-cream p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-ink-soft">Prevention plan · sleep focus</div>
          <span className="font-mono text-xs font-semibold tabular-nums text-teal">3 of 5 weeks</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-teal-light">
          <div className="h-full w-3/5 rounded-full bg-teal" />
        </div>
      </div>
    </div>
  );
}

export function DataSourcesCard() {
  const rows = [
    { label: "Blood panel — Randox clinic", meta: "100+ biomarkers", tone: "text-teal" },
    { label: "Wearable — Apple, Oura, Whoop, Garmin", meta: "syncs daily", tone: "text-amber" },
    { label: "Medical history questionnaire", meta: "one record", tone: "text-teal" },
  ];
  return (
    <div className="card" aria-hidden>
      <div className="text-xs font-semibold uppercase tracking-wider text-ink-soft">One health record</div>
      <ul className="mt-4 space-y-3">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-4 rounded-xl border border-line bg-cream px-4 py-3">
            <span className="text-sm font-medium text-ink">{r.label}</span>
            <span className={`shrink-0 text-xs font-semibold ${r.tone}`}>{r.meta}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-teal-light/60 px-4 py-3 text-sm font-medium text-teal-dark">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Joined up and shared with your GP before you meet
      </div>
    </div>
  );
}

export function ConsultCard() {
  return (
    <div className="card" aria-hidden>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-lg font-semibold text-cream">
          45
        </div>
        <div>
          <div className="text-sm font-semibold text-ink">Baseline consultation</div>
          <div className="text-xs text-ink-soft">45 minutes · video · lifestyle-medicine GP</div>
        </div>
      </div>
      <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
        <li className="flex gap-2.5"><span className="text-teal">—</span> Your results, explained in plain language</li>
        <li className="flex gap-2.5"><span className="text-teal">—</span> Wearable trends read against your bloods</li>
        <li className="flex gap-2.5"><span className="text-teal">—</span> A prevention plan agreed together</li>
      </ul>
      <div className="mt-5 rounded-xl border border-line bg-cream px-4 py-3 text-xs text-ink-soft">
        Plus a 15-minute follow-up at six months, and two optional 15-minute check-ins
        whenever you need them.
      </div>
    </div>
  );
}

export function PlanCard() {
  const items = [
    { t: "Morning zone-2 sessions", s: "3× a week · from your Whoop data", done: true },
    { t: "Vitamin D 1000 IU", s: "retest at six months", done: true },
    { t: "Sleep window 23:00–07:00", s: "Evi checks in weekly", done: false },
  ];
  return (
    <div className="card" aria-hidden>
      <div className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Your prevention plan</div>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i.t} className="flex items-start gap-3 rounded-xl border border-line bg-cream px-4 py-3">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                i.done ? "bg-teal text-cream" : "border-2 border-line bg-surface"
              }`}
            >
              {i.done && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </span>
            <span>
              <span className="block text-sm font-medium text-ink">{i.t}</span>
              <span className="block text-xs text-ink-soft">{i.s}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
