/*
 * Evi moment (S9) — a small chat-bubble vignette that humanises the
 * between-visits support. Illustrative conversation; keep it modest and
 * grounded (Evi is GP-monitored, never a diagnosing AI).
 */
export default function EviMoment() {
  return (
    <div className="card" aria-hidden>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-semibold text-cream">
          E
        </span>
        <div>
          <div className="text-sm font-semibold text-ink">Evi</div>
          <div className="text-xs text-ink-soft">GP-monitored support, between visits</div>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-teal-light/60 px-4 py-3 text-sm leading-relaxed text-teal-dark">
          Morning! Week three of your sleep window — your Oura data shows you&rsquo;ve
          kept it 5 nights out of 7. How is it feeling?
        </div>
        <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-surface px-4 py-3 text-sm leading-relaxed text-ink shadow-[0_1px_4px_rgba(34,49,47,0.08)]">
          Honestly, easier than I expected.
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-teal-light/60 px-4 py-3 text-sm leading-relaxed text-teal-dark">
          That&rsquo;s what the trend says too. I&rsquo;ll flag it for Dr Shah ahead
          of your six-month review.
        </div>
      </div>
    </div>
  );
}
