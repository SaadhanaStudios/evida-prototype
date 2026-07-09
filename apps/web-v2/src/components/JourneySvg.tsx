export default function JourneySvg() {
  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label="Your health journey rising from Evida through Data, Insights and Action to confidence in your future health"
      className="hidden min-w-[45%] self-end md:block"
      style={{ width: "100%", height: "auto", maxWidth: 798, overflow: "visible" }}
    >
      <path d="M40 470 L170 470" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
      <path
        d="M170 470 L275 468 C360 464 430 430 495 380 C560 335 600 300 625 255 C665 190 695 130 720 70"
        stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none"
        strokeLinecap="round" strokeDasharray="2 8"
      />
      <path d="M275 462 L275 380" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2 7" />
      <path d="M495 374 L495 302" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2 7" />
      <path d="M625 249 L625 172" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2 7" />

      <rect x="166" y="466" width="8" height="8" fill="var(--color-amber-yellow)" rx="1" />
      <rect x="271" y="464" width="8" height="8" fill="var(--color-amber-yellow)" rx="1" />
      <rect x="491" y="376" width="8" height="8" fill="var(--color-amber-yellow)" rx="1" />
      <rect x="621" y="251" width="8" height="8" fill="var(--color-amber-yellow)" rx="1" />
      <rect x="716" y="66"  width="8" height="8" fill="var(--color-amber-yellow)" rx="1" />

      <text x="40"  y="444" textAnchor="start"   fill="#fff"                    style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20,   letterSpacing: "0.06em" }}>EVIDA</text>
      <text x="275" y="332" textAnchor="middle"   fill="#fff"                    style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20,   letterSpacing: "0.08em" }}>DATA</text>
      <text x="275" y="353" textAnchor="middle"   fill="rgba(255,255,255,0.62)" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}>Understand your</text>
      <text x="275" y="369" textAnchor="middle"   fill="rgba(255,255,255,0.62)" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}>health signals</text>
      <text x="495" y="252" textAnchor="middle"   fill="#fff"                    style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20,   letterSpacing: "0.08em" }}>INSIGHTS</text>
      <text x="495" y="273" textAnchor="middle"   fill="rgba(255,255,255,0.62)" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}>Personalised insights and</text>
      <text x="495" y="289" textAnchor="middle"   fill="rgba(255,255,255,0.62)" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}>recommendations</text>
      <text x="625" y="122" textAnchor="middle"   fill="#fff"                    style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 20,   letterSpacing: "0.08em" }}>ACTION</text>
      <text x="625" y="143" textAnchor="middle"   fill="rgba(255,255,255,0.62)" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}>Take the right</text>
      <text x="625" y="159" textAnchor="middle"   fill="rgba(255,255,255,0.62)" style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12.5 }}>next step</text>
      <text x="706" y="30"  textAnchor="middle"   fill="rgba(255,255,255,0.85)" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 13   }}>Confidence in your</text>
      <text x="706" y="47"  textAnchor="middle"   fill="rgba(255,255,255,0.85)" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 13   }}>future health</text>
    </svg>
  );
}
