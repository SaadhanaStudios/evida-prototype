# Evida Prototype — v2 Scope

> UAT session: 10 June 2026 · Attendees: Aman, Abhishek, Dhruv, Sean, Johnny
> Deadline: Friday 13 June 2026

This document records every agreed change from the 10 June UAT session, organised by area. It is the implementation reference for the v2 prototype update.

---

## What changed vs v1

### Sign-up flow (unified)

**Problem:** Payment appeared in two places — the sign-up flow in `login.html` and the end of `booking.html`. This caused confusion about when to pay.

**Decision:** Remove payment from `login.html` entirely. One payment point: end of `booking.html`.

**New flow:**
1. Landing → "Join Evida" → Create account (single screen: name, email, password, phone, DOB, address, T&Cs)
2. "Create account →" redirects to `booking.html?flow=signup`
3. Booking skips plan selection (step 1), starts at clinic (step 3)
4. Membership shown as a line item in the cart (step 5)
5. Payment at step 6 → confirmation at step 7 with receipt reference `EV-XXXXXX`

**"Book first" alternative path:**
- Landing → "Book first, pay after →" → `booking.html?entry=bookfirst`
- Full booking flow; at confirmation, CTA changes to "Create your Evida account →"

**Pay later path (from step 5):**
- "Take me to the dashboard" → `dashboard.html?pending=payment`
- Account already exists; booking booked; payment deferred

**Date of birth input:** Changed from date picker (US-style, 34 clicks to reach 1990s) to typed text input `DD/MM/YYYY`.

---

### Dashboard (checklist front and centre)

**Problem:** The booking hero dominated the screen for new users who hadn't yet booked — they saw a sales pitch rather than a clear next step.

**Decision:** Move the pre-consult checklist ABOVE the booking hero. Reduce to 4 items.

**New checklist (4 items):**
1. Blood test booked (required)
2. ID verification complete (required)
3. Health questionnaire submitted (required)
4. Wearables connected (optional — not counted in % progress)

**Gamification:** "You're X% ready for your consultation" shown in both the checklist header and the status bar badge. Formula: `(completedItems / 3) * 100`. In post-consult state, badge shows "Your results are ready".

**Removed from checklist:** "Create account" (redundant — they're already logged in) and "Upload medical records" (post-launch feature).

---

### Profile — health questionnaire

**Decision:** Add a health questionnaire section to `profile.html`, after the ID verification section. Fields matching Simpl medical history form structure.

**Fields:**
- Pre-existing conditions (textarea)
- Current medications (textarea)
- Family medical history (textarea)
- Allergies (textarea)
- Lifestyle: smoking, alcohol, exercise (select inputs)

**Access via:** `profile.html#health-questionnaire` — linked from dashboard checklist and anchor-scrolls on load.

---

### Booking flow — info blocks

**Decision:** Add explanatory copy blocks on steps 3 and 4 of booking.

**Step 3 (blood test):**
- Allow 30 minutes · arrive 5 minutes early
- Tests: full blood panel, height, weight, blood pressure
- Results sent to Evida; GP reviews them with you in consultation

**Step 4 (GP consult):**
- Up to 45 minutes · Virtual · With a GP (not a health coach)
- July availability: Tuesdays and Fridays only
- You will NOT receive results beforehand — GP reviews them with you in session

---

### Contact Us (new page)

**Decision:** New `contact.html` page, accessible from a pinned entry at the top of the Messages thread list.

**Features:**
- Topic selector: General · Booking · Billing · Medical · Technical · Other
- Message textarea
- "Send message" CTA
- Support strip: "Book a 15-min call" + "Ask Evi for faster answers"
- Note: replies appear in Messages inbox

---

### Settings — expanded notifications + danger zone

**Notification toggles added (on top of existing Email/Push/SMS/Calendar):**
- Appointment SMS reminder (1 hr before)
- Appointment email reminder (24 hr before)
- Pre-consult checklist reminders
- Newsletter & health tips (opt-in)
- Promotional offers (opt-in, default OFF)

**Danger zone:** Delete account moved out of the About section into its own prominently bordered section. Includes CQC records retention policy (8 years) and a link to the privacy policy. Uses `confirmDeleteAccount()` confirmation dialog.

---

### Data Insights — tooltips + search stub

**`?` tooltips added on:**
- Steps today — "NHS recommends 10,000 steps/day…"
- Sleep (hours) — "7–9 hours is optimal for adults…"
- Heart rate (avg) — "Resting HR of 60–100 bpm is normal…"
- HRV (ms) — "Higher HRV indicates better cardiovascular fitness and recovery…"
- HbA1c — "Measures average blood glucose over 2–3 months…"
- Vitamin D — "Supports bone density, immune function, and mood…"

**Search bar stub:** Universal search input at the top of the insights page. On input, shows toast: "Search coming soon — Ask Evi for now".

---

### Copy corrections

| Location | Before | After |
|----------|--------|-------|
| `login.html` tagline | "More than just a health check" | "More than a health check" |
| `dashboard.html` booking hero | "More than just a health check" | "More than a health check" |
| Pay-later button | "I'll pay later — create my account" | "Take me to the dashboard" |
| GP consult description | "health coach" | "GP (not a health coach)" |

---

## What is NOT in v2

- GP-side platform (next major workstream)
- EMR ingestion pipeline (Dhruv to scope post-launch)
- Website sub-pages vs single scroll (separate Friday session)
- Pricing and cancellation policy (pre-launch discussion)
- Rescheduling workflow (no-show policy → Randox)
- Vercel deployment + backend wiring (Mark/Dhruv, one-time)
- Slot-holding policy at scale (post-pilot)
