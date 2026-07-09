import Link from "next/link";
import { LINKS, REASSURANCE } from "@/lib/site";

/*
 * Primary CTA + reassurance micro-copy (S8): defuses the three standing
 * objections (time, NHS relationship, wearable requirement) at exactly
 * the click moment. Used wherever the primary CTA appears.
 */
export default function CtaGroup({
  primaryLabel = "Get Started",
  secondaryLabel,
  secondaryHref,
  center = false,
}: {
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "flex flex-col items-center" : ""}>
      <div className={`flex flex-wrap items-center gap-4 ${center ? "justify-center" : ""}`}>
        {secondaryLabel && secondaryHref && (
          <Link href={secondaryHref} className="btn-secondary">
            {secondaryLabel}
          </Link>
        )}
        <a href={LINKS.book} className="btn-primary">
          {primaryLabel}
        </a>
      </div>
      <p className={`mt-3 text-xs text-ink-soft ${center ? "text-center" : ""}`}>{REASSURANCE}</p>
    </div>
  );
}
