# Evida Member App — Product Requirements Document (Prototype)

> **Version:** 1.0 (Prototype)  
> **Audience:** Engineering, Design, QA, Product  
> **Scope:** `apps/prototype/screens/` — member-facing app only (not marketing website)  
> **Language:** UK English (personalised, colour, mmol/L, behaviour)  
> **Brand:** "Member" (not user/patient), "Evida Protocol", "Biomarker", "Prevention Plan", "Check-in"

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Member Persona](#2-member-persona)
3. [Journey 1: New Member — Sign Up → Booking → Onboarding → Dashboard](#3-journey-1-new-member)
4. [Journey 2: Returning Member — Sign In → Dashboard](#4-journey-2-returning-member)
5. [Journey 3: Existing Member — Re-booking](#5-journey-3-existing-member-re-booking)
6. [Screen State Reference](#6-screen-state-reference)
7. [Edge Case Register](#7-edge-case-register)
8. [Data Model Reference](#8-data-model-reference)
9. [UAT Scenarios](#9-uat-scenarios)
10. [Future Considerations (v2)](#10-future-considerations)

---

## 1. Product Overview

### 1.1 The Evida Protocol

Evida is a preventive-health membership. The core journey is **Track → Tailor → Act**:

| Phase | What happens | Member sees |
|-------|-------------|-------------|
| **Track** | Blood test (42 biomarkers at Randox clinic) + wearable sync + health questionnaire | Booking flow, wearable connection, questionnaire |
| **Tailor** | GP consultation (45 min virtual) + AI analysis | Health report, biomarker results, prevention plan |
| **Act** | Personalised prevention plan + ongoing monitoring | Dashboard, check-ins, messages, ask Evi |

### 1.2 Pricing

- **Standard membership:** £320/year
- **Pilot pricing (discount code `EVIDA160`):** £160/year (applied at checkout via discount code field, pre-filled in prototype)
- **Other codes:** `EARLY100` (−£100), `NHS50` (NHS staff, −£160)
- **14-day cooling-off period:** Full refund if cancelled within 14 days
- **Add-ons (future, shown in data model but not MVP):** Home nurse visit (£70), Hormone panel upgrade (£85)

### 1.3 Key Principles

- **State-driven UI:** Every screen reads `EvidaStore` to determine what to show. No hardcoded lifecycle.
- **Emphemeral flows:** Booking uses `?step=N` in URL for shareable states. Login uses `?s=STATE_NAME`.
- **No backend:** All state is localStorage via `EvidaStore`. The store.js file IS the data-model contract.
- **UAT harness:** 4 demo buttons at `/screens/_uat.js` seed store state for testing.
- **Discouraged patterns (from DESIGN-HANDOFF):** No pure `<div>` buttons, no inline `<br>` tags, no hardcoded dimensions, no `!important` overrides.

---

## 2. Member Persona

**Primary persona:** James Chen, 38, London professional

- Works in finance/tech, time-poor but health-conscious
- Has worn an Apple Watch for 2+ years but never done anything structured with the data
- Motivated by "I want to understand my body before something goes wrong"
- Comfortable with apps and online booking (compares to dental/haircut booking)
- Expects clear pricing, knows what "preventive health" means
- Price-sensitive: £320/year is a considered purchase; discount codes matter
- Wants clear next steps at every stage (never "what do I do now?")

**Secondary persona:** Returning member (post-consult)

- Has completed baseline (blood test + GP consult)
- Received prevention plan and biomarker results
- Uses dashboard for ongoing tracking
- May want to book follow-up appointments
- Engages with health coach messages and check-ins

---

## 3. Journey 1: New Member

### Overview

```
Landing → Sign Up → Booking (5 step wizard) → Confirmation → Onboarding (3 step tour) → Dashboard
```

**Total screens touched:** 5 (login.html, booking.html, onboarding.html, dashboard.html — various internal states)

---

### 3.1 Entry: Landing Screen

**Screen:** `login.html?s=landing`

**Purpose:** First impression — explain membership value, capture sign-up or sign-in intent.

**States:**

| State | Trigger | Key elements |
|-------|---------|--------------|
| Default | Direct load, no `?s=` param | Hero logo + "Preventive health, powered by data" headline, £320/year, 4 benefits (B/G/P/I), CTA "Create account", "Already a member? Sign in", trust badges (CQC, GMC, GDPR), "Cancel within 14 days" |

**Transitions:**
- "Create account" → show `screen-signup` (startMembership())
- "Sign in" → show `screen-signin`
- No other navigation on this screen (no bottom nav useful)

**Edge cases:**
- None — purely informational

**Acceptance Criteria:**

```
GIVEN a visitor who has not yet created an account
WHEN they visit login.html
THEN they see the membership landing page
AND the price "£320/year" is prominently displayed
AND a "Create account" button invites sign-up
AND trust badges (CQC, GMC, GDPR) are visible
AND the 14-day cancellation policy is displayed
```

---

### 3.2 Sign Up

**Screen:** `login.html?` → `showScreen('screen-signup')`

**States:**

| State | Trigger | Key elements |
|-------|---------|--------------|
| Empty form | Fresh navigation to signup | Name, Email + "Verify email" inline button, Password with strength meter, Phone + "Verify phone", DOB, Address, Terms checkbox |
| Email sent | User taps "Verify email" | Button changes to "Sent ✓", code input appears with placeholder EV-0000 |
| Phone sent | User taps "Verify phone" | SMS code input appears |
| Code verified | User enters valid code | Code input hidden, button shows "✓ Verified" |
| Partial resume | `EvidaStore.account.partial()` returns data | "Resume your signup?" banner appears on sign-in screen |
| Locked account | Email = `locked@evida.co.uk` | Error banner: "This account has been temporarily locked" |

**Key behaviours:**
- Demo pre-fill: All fields auto-populated for testing
- `handleCreateAccount()` saves to `EvidaStore.account.save()` then redirects to `booking.html?flow=signup`
- Password strength: 5 requirements (lowercase, uppercase, number, symbol, 8+ chars) — visual only, doesn't block
- Email verification code: `EV-2847` (shown in toast)
- SMS verification code: `482719`
- "Didn't receive the code?" → resend via toast
- Phone is optional; DOB and address required
- Terms & Privacy Policy modals inline

**Edge cases:**
- Partial signup resume: Banner only shows if `account.partial()` exists (set by previous visit where user filled some fields but didn't complete)
- Back button from signup → landing; from verify-email → signup

**Acceptance Criteria:**

```
GIVEN a visitor tapping "Create account"
WHEN the sign-up form is displayed
THEN all required fields are shown (name, email, password, DOB, address)
AND optional fields are marked (phone)
AND the email inline-verify button triggers a code input
AND password strength indicators update in real-time
AND terms must be checked before create-account proceeds

GIVEN a visitor who previously started signup but did not complete
WHEN they return and tap "Sign in"
THEN a "Resume your signup?" banner is shown
AND tapping it pre-fills the signup form with their previous data
```

---

### 3.3 Booking Wizard (5-step)

**Screen:** `booking.html`

**Entry points:**
- `booking.html?flow=signup` — new member flow (back button → login.html)
- `booking.html` — existing member (back button → dashboard.html)
- `booking.html?flow=signup&resume=payment` — returning to pay

**Overview:** 5-step progress wizard (steps 3–7 in code; steps 1–2 were Plan and Add-ons but removed from MVP — only 3 visible steps: Blood test, GP consult, Pay).

**States:**

| # | Step | State | Trigger | Key elements |
|---|------|-------|---------|-------------|
| 3 | Blood test | Default | `?step=3` | Clinic cards (3 Randox locations), postcode filter, date grid, time grid |
| 3 | Blood test | Clinic selected | Tap location card | Card highlighted, date/time section appears below |
| 3 | Blood test | Date selected | Tap date | Date highlighted, available times shown |
| 3 | Blood test | Time selected | Tap time | Time highlighted, "Book Blood Test" button active |
| 3 | Blood test | Skip | Tap "Skip for now" | Redirects to onboarding.html (defer entire booking) |
| 4 | GP consult | Default (gated) | `?step=4` | Info card showing blood test date + 4–5 day gap, date grid (disabled before min date) |
| 4 | GP consult | Date selected | Tap eligible date | Date highlighted, times shown |
| 4 | GP consult | Booked | Both date + time picked | "Book Virtual GP" active |
| 5 | Review & Pay | Default | `?step=5` | Cart: £320 membership, blood slot (edit), GP slot (edit), 2× GP credits, 6-mo follow-up |
| 5 | Review & Pay | Discount applied | Enter code + "Apply" | Cart updates discount row, total recalculates |
| 5 | Review & Pay | Slot hold active | Step 5 entered | Amber hold banner: "Slots held for 14:58" countdown |
| 5 | Review & Pay | Payment in progress | Tap "Pay £X — Activate membership" | Button shows spinner, disabled, 2-second delay simulating processing |
| 5 | Review & Pay | Payment failed | `evida:demo:fail-payment` flag is set | Error banner "Payment declined — slots still held", retry timer remaining, one-shot flag consumed |
| 5 | Review & Pay | Skip payment | Tap "I'll pay later" | Redirects to `dashboard.html?pending=payment` |
| 7 | Confirmation | Success | Payment succeeds | Welcome message, blood test + GP consult detail cards, "Add to calendar" buttons, receipt ref, "Continue to onboarding →" |
| — | Slot released | Hold expired | Timer reaches 0:00 | "Your slot was released" — choose new slot button → step 3 |
| — | Payment failed recovery | Payment declined | `evida:demo:fail-payment` flag triggered | "Payment unsuccessful — slots still held for X:XX", retry or choose new slots |

**Key behaviours:**
- **Clinics:** 3 Randox clinics (Oxford Circus, Holborn, Liverpool St) with postcode filter
- **Dates:** Generated dynamically from tomorrow (5 clinic days for blood, 8 weekdays for GP) — never stale
- **Fasting reminder:** Pre-filled banner about fasting requirement; checkbox on confirmation to add calendar reminder
- **Discount codes:** Pre-filled `EVIDA160` at step 5 — applies −£160 (50%) automatically in prototype
- **Slot hold timer:** 15 minutes (900 seconds), shown on sticky pay bar and hold banner
- **Payment simulation:** Deterministic — succeeds by default; set `evida:demo:fail-payment` flag to trigger failure (one-shot, consumed on use). The `_uat.js` gear panel provides a "Fail next payment" toggle.
- **Confetti:** 300ms after confirmation screen, confetti canvas animation fires
- **Invoice download:** Generates branded HTML invoice in print/Save-as-PDF view
- **Receipt reference:** `EV-XXXXXX` (6 random digits)
- **URL param:** `?step=N` reflects current step for direct navigation

**Edge cases:**
- GP consultation gated: Must be 4–5 working days after blood test (dates before min date are disabled with tooltip)
- Changing blood date after GP date selected: GP date resets if it falls before new min date
- Skip blood test: `skipBloodBooking()` redirects to `onboarding.html` (defers entire booking)
- Back from confirmation → step previous; back from step 3 → login (signup flow) or dashboard (existing)
- Pre-filled discount `EVIDA160` always applied in prototype but suggests where the real offer lives
- GP auto-select: Step 4 auto-selects first bookable date/time in prototype for demo convenience; production would require explicit member selection

**Acceptance Criteria:**

```
GIVEN a new member who just created an account
WHEN they are redirected to booking.html?flow=signup
THEN step 3 (Blood test) is shown first
AND 3 Randox clinic locations are displayed with postcode filter
AND selecting a clinic reveals date/time pickers
AND dates are dynamically generated from tomorrow

GIVEN a member who selected a blood test date
WHEN they proceed to step 4 (GP consult)
THEN the info card shows the blood test date and the earliest bookable GP date (4–5 working days later)
AND GP dates before the minimum are visually disabled with a tooltip

GIVEN a member on step 5 (Review & Pay)
WHEN the cart is displayed
THEN the membership price of £320 is shown
AND the selected blood test and GP consult slots appear with "Edit" links
AND any applied discount code is reflected in the total
AND a 15-minute slot hold timer is counting down from 14:58

GIVEN a member enters a valid discount code
WHEN they tap "Apply"
THEN the total is recalculated with the discount reflected

GIVEN a member completes payment successfully
WHEN the confirmation screen appears
THEN a welcome message is shown
AND appointment details (blood test date/time/location, GP date/time) are displayed
AND a receipt reference is generated
AND "Continue to onboarding →" is the primary CTA
AND confetti animation plays after 300ms
```

---

### 3.4 Onboarding (3-step Tour)

**Screen:** `onboarding.html`

**Purpose:** Welcome tour + setup checklist before first dashboard visit.

**States:**

| # | Step | State | Key elements |
|---|------|-------|-------------|
| 1 | Welcome | Tour default | "Welcome to Evida" — 3 feature cards (Dashboard, Blood Test, GP Consult), "Next →" CTA, "Skip tour" link |
| 2 | Protocol | From step 1 | "The Evida Protocol" — Track/Tailor/Act explanation, "← Back" + "Next →", "Skip tour" |
| 3 | Setup | From step 2 or skip | Progress summary (0/5 tasks), 5 setup task cards: Book Baseline, Connect Wearable, Upload Records, Health Questionnaire, Verify Identity |
| 3 | Setup | Inline ID verification | Tapping "Verify →" opens inline section: file upload for profile photo (optional) + photo ID (required), "Save verification" button |
| 3 | Setup | All 5 tasks done | Celebration: "All tasks complete! Taking you to your dashboard" toast → redirect to dashboard |
| 3 | Setup | Pending membership | `?pending=1` param — amber banner: "Membership pending — complete payment to unlock..." |

**Key behaviours:**
- **No bottom nav** during onboarding (focused flow, no app navigation)
- "Restart" button clears tour and setup tasks
- "Go to dashboard →" link in header for early exit
- Setup tasks sync with real EvidaStore state: booking confirmation, wearable connection, questionnaire completion, ID verification all count
- `EvidaStore.onboarding.markCompleted()` called when all 5 tasks done
- `onboarding.completedAt()` timestamp used by dashboard to show 30-second celebration banner

**Edge cases:**
- Skip payment: `?pending=1` banner displayed during onboarding
- Tour step restored from localStorage (`EvidaStore.onboarding.tourStep()`)
- `?restart=1` clears tour
- Back from step 3 → step 2; back from step 2 → step 1
- If member navigates away mid-tour, step is persisted

**Acceptance Criteria:**

```
GIVEN a member who just completed booking
WHEN they tap "Continue to onboarding →"
THEN the 3-step tour begins with the Welcome screen
AND no bottom navigation is displayed

GIVEN a member on the Welcome step
WHEN they tap "Next →"
THEN they see the Protocol explanation (Track/Tailor/Act)
AND "Skip tour" redirects to the setup checklist

GIVEN a member on the Setup step
WHEN they view the setup checklist
THEN 5 tasks are listed with completion status
AND tasks completed elsewhere (booking, wearables, etc.) are reflected
AND tapping a task navigates to the relevant screen

GIVEN a member completes all 5 setup tasks
WHEN the last task is marked done
THEN EvidaStore.onboarding is marked as completed
AND they are redirected to dashboard.html
```

---

### 3.5 Dashboard (Post-Onboarding)

**Screen:** `dashboard.html`

**Purpose:** Central hub — adapts to member lifecycle stage.

**States (4 lifecycle stages):**

| State | Trigger | Key differences from default |
|-------|---------|------------------------------|
| **Pre-booking** | No `booking.isConfirmed()`, no `consultations.hadConsultation()` | Booking hero card ("Book your Membership Baseline") prominent, checklist absent, no appointments, empty stats |
| **Post-booking / Pre-consult** | `booking.isConfirmed()` true | Checklist card (3/5 tasks), ID reminder, booking hero hidden, appointment rows with dates, amber "Results pending" badge |
| **Post-consult** | `consultations.hadConsultation()` true | Checklist card hidden, celebration banner (30s), badge "Your results are ready" → links to post-consult, sub-heading changed, appts show "Completed"/"Results ready", Documents panel shows reports with dates |
| **Pending payment** | `?pending=1` added to dashboard URL | Amber alert: "Membership pending. Complete payment..." with "Pay now" CTA |

**Universal elements (all states):**
- Search bar (redirects to Ask Evi after 700ms)
- Status bar (personalised greeting from `EvidaStore.account.saved()`, avatar initials)
- 4 bottom nav items: Dashboard | Data & Insights | Ask Evi | Appointments
- "More" sheet: Wearables, Documents, Messages, FAQ, Profile, Settings
- Inline alerts: onboarding reminder, ID verification reminder, celebration banner
- Dark mode toggle in header

**Key behaviours:**
- `initStatusBar()` runs on every load — reads real store state
- Checklist: 3 required tasks from 4 items (wearables is optional) — circular progress ring, aria-label for a11y
- If `onboarding.completedAt()` < 30 seconds ago → celebration banner shown
- All 4 stat cards: steps avg, sleep avg, blood tests (empty until post-consult), health score (locked)
- Trust badges row always visible

**Edge cases:**
- `locked@evida.co.uk` → error on sign-in (not dashboard)
- Partial signup resume detected on login, not dashboard
- Onboarding completion celebration only shows for 30s window

**Acceptance Criteria:**

```
GIVEN a member who has not yet booked
WHEN they land on the dashboard
THEN the booking hero card is prominently displayed
AND the checklist card is hidden
AND no appointments are shown
AND stat cards show empty states for blood tests and health score

GIVEN a member who has booked but not had their consultation
WHEN they land on the dashboard
THEN the booking hero is hidden
AND the pre-consult checklist is shown with tasks reflecting real state
AND appointment rows show upcoming dates with "Results pending" badge
AND an ID verification reminder is shown if ID not yet uploaded

GIVEN a member who has completed their consultation
WHEN they land on the dashboard
THEN the checklist is hidden
AND the status badge reads "Your results are ready"
AND tapping the badge navigates to post-consult.html
AND stat cards for blood tests and health score are populated
AND document dates reflect the consultation date
```

---

## 4. Journey 2: Returning Member

### Overview

```
Sign In → Dashboard (post-consult state) → Explore app (Post-Consult, Insights, Messages, etc.)
```

**Screens touched:** login.html → dashboard.html → (any other screen)

---

### 4.1 Sign In

**Screen:** `login.html?s=signin`

**States:**

| State | Trigger | Key elements |
|-------|---------|--------------|
| Default | Tap "Sign in" from landing | Email + Password fields, "Forgot password?" link, "Sign in" button |
| Locked account | Email = `locked@evida.co.uk` | Error banner: "This account has been temporarily locked" |
| Demo pre-fill | Page load (prototype) | Email `james.chen@gmail.com`, Password `MyHealth2026!` pre-filled |
| Resume payment | `?resume=payment` | Immediately redirects to `booking.html?flow=signup&resume=payment` |

**Key behaviours:**
- Successful sign-in: 800ms loading spinner, then redirect to `dashboard.html`
- "Forgot password?" shows toast (simulated)

**Acceptance Criteria:**

```
GIVEN a returning member
WHEN they visit login.html and tap "Sign in"
THEN the sign-in form is shown with email and password fields
AND demo credentials are pre-filled for testing

GIVEN a member with email "locked@evida.co.uk"
WHEN they attempt to sign in
THEN an error banner explains the account is locked
AND the sign-in does not proceed

GIVEN valid credentials
WHEN the member taps "Sign in"
THEN a loading spinner is shown for 800ms
AND they are redirected to dashboard.html
```

---

### 4.2 Post-Consult Screen

**Screen:** `post-consult.html`

**Purpose:** Health report, prevention plan, biomarker data, and reminders — unlocked after first consultation.

**States:**

| State | Trigger | Key elements |
|-------|---------|--------------|
| Empty (pre-consult) | `!EvidaStore.consultations.hadConsultation()` | "No consultation yet" message, "Book a consultation" CTA, "Simulate completed consultation" demo link |
| Post-consult | `consultations.hadConsultation()` true | 4 tabs: Reports, Prevention Plan, Biomarkers, Reminders |

**Tab contents:**

| Tab | Contents |
|-----|----------|
| Reports | "Consult completed" card with date, 3-month check-in CTA, 3 report items (Physical Health, Lifestyle Medicine, Blood Test Results), download/share buttons, share summary/refer a friend |
| Prevention Plan | "Cardiovascular Health Plan" with 35% progress, 6 plan items (2 done, 4 pending/in progress/new), share with GP CTA |
| Biomarkers | 8-key biomarker table: HbA1c (normal), LDL (borderline, 3.8), HDL (normal), Vitamin D (low, 22), Fasting Glucose (normal), Triglycerides (normal), CRP (normal), Ferritin (normal) — with reference ranges and status badges |
| Reminders | 5 toggle-able reminders: Vitamin D, 30-min walk, LDL re-check (3mo), Health coach check-in (30d), 6-month follow-up GP |

**Edge cases:**
- Dates derived from actual booking data (blood date, GP date)
- 3-month check-in due date → GP date + 3 months
- LDL re-check due → GP date + 3 months
- Health coach check-in → GP date + 30 days
- 6-month follow-up → GP date + 6 months
- All dates localised to en-GB format

**Acceptance Criteria:**

```
GIVEN a member before their consultation
WHEN they navigate to post-consult.html
THEN they see the empty state with a CTA to book

GIVEN a member after their consultation
WHEN they navigate to post-consult.html
THEN they see the Reports tab by default
AND the consultation date is displayed
AND 3 report types are listed (Physical Health, Lifestyle Medicine, Blood Test)
AND the Prevention Plan tab shows 6 items with progress tracking
AND the Biomarkers tab shows 8 biomarkers with values, ranges, and statuses
AND the Reminders tab shows 5 toggle-able reminders with dates derived from the GP consultation date
```

---

## 5. Journey 3: Existing Member Re-booking

### Overview

```
Dashboard → Booking (reboot) → Step 3–5 → Confirmation → Dashboard
```

**Same screens as Journey 1, with differences:**

| Aspect | New member | Existing member |
|--------|------------|----------------|
| Entry | `?flow=signup` | No param |
| Back from step 3 | → login.html | → dashboard.html |
| Pre-filled data | Auto-selected defaults (first clinic, first blood slot) | Auto-selected defaults (same as new member; prototype does not restore previous booking) |
| Cart shows | "Evida Membership (12 months)" | Same — second year |

---

## 6. Screen State Reference

### Complete State Table

| Screen | States count | States |
|--------|-------------|--------|
| `login.html` | 6 | landing, signin, signup, verify-email, account-created, account-pending |
| `booking.html` | 7+ | step3 (blood), step4 (gp), step5 (pay), step7 (confirmation), slot-released, payment-failed, skip-to-onboarding |
| `onboarding.html` | 3 | tour1 (welcome), tour2 (protocol), tour3 (setup + ID verification inline + pending banner) |
| `dashboard.html` | 4 | pre-booking, post-booking/pre-consult, post-consult, pending-payment |
| `post-consult.html` | 2 | empty, post-consult (with 4 sub-tabs) |
| `insights.html` | 2 | overview default, activity/sleep/heart/biomarkers sub-views |
| `ask-evi.html` | 2 | initial suggestions, active conversation |
| `messages.html` | 2 | thread list, detail overlay |
| `wearables.html` | 3 | empty, device list, connect modal |
| `profile.html` | 3 | info view, ID verification, health questionnaire (3 steps) |
| `settings.html` | 6+ | membership card, payment history, privacy, security, notifications, account management |
| `faq.html` | 2 | expanded category, search results |
| `contact.html` | 2 | topic selector, message form |
| `documents.html` | 2 | document list (with 5 doc viewers) |
| `questionnaire.html` | 3 | step1 (conditions/medications), step2 (family history/allergies), step3 (lifestyle) |
| `search.html` | 1 | search results |

---

## 7. Edge Case Register

| # | Edge case | Where handled | Behaviour |
|---|-----------|--------------|-----------|
| 1 | Partial signup resume | `login.html` | Banner shown on sign-in if `EvidaStore.account.partial()` exists |
| 2 | Locked account | `login.html` | Email `locked@evida.co.uk` → error modal, sign-in blocked |
| 3 | Payment failure | `booking.html` step-payment-failed | Slots held for remaining hold time; retry or choose new slots |
| 4 | Slot hold expiry | `booking.html` step-recovery | "Your slot was released" screen → choose new slot back to step 3 |
| 5 | GP date before blood test + 5 days | `booking.html` step 4 | Disabled dates with tooltip explaining lab turnaround |
| 6 | Change blood date after GP date selected | `booking.html` | GP date resets if it falls before new minimum |
| 7 | Skip blood test | `booking.html` | "Skip for now" → step 5 without blood slot |
| 8 | Skip payment | `booking.html` | "I'll pay later" → redirects to onboarding with `?pending=1` |
| 9 | Pending membership during onboarding | `onboarding.html` | Amber banner with "Pay now" link |
| 10 | Tour resumed from stored state | `onboarding.html` | `onboarding.tourStep()` restored on load |
| 11 | Restart tour | `onboarding.html` | `?restart=1` clears all tour + setup state |
| 12 | Demo payment failure | `_uat.js` | Setting `evida:demo:fail-payment` flag guarantees ~20% failure becomes 100% |
| 13 | Empty dashboard (pre-booking) | `dashboard.html` | Booking hero CTA shown, checklist hidden, stat cards empty |
| 14 | Celebration banner timing | `dashboard.html` | Only shown for 30s after `onboarding.completedAt()` |
| 15 | Wearables as optional task | `dashboard.html` | Checklist: 3/4 tasks count (wearables excluded from denominator) |
| 16 | Dark mode persistence | `_nav-helpers.js` | `prefs.darkMode()` stored as `'1'`/`'0'` under legacy key `evida_dark_mode` |
| 17 | No consultation → post-consult | `post-consult.html` | Empty state shown; hidden demo link to simulate completion for testing |
| 18 | No wearable connected → insights | `insights.html`, `dashboard.html` | "No devices connected — connect one" message |
| 19 | Ask Evi disclaimer | `ask-evi.html` | Inline notice: "General health information only — not medical advice" (`ask-evi.html:119`) |
| 20 | Contact form submit | `contact.html` | Shows toast confirmation (simulated, no backend) |
| 21 | Document viewer fallback | `documents.html` / doc-* viewers | Static demo content, no real backend data |
| 22 | Profile form always editable | `profile.html` | No lock/save state for ID verification submission |
| 23 | UAT state collisions | `_uat.js` | Running multiple demo buttons without clearing can mix states |
| 24 | Invoice download | `booking.html` | Opens new window with HTML invoice → browser's Save as PDF |
| 25 | Phone verification | `login.html` | `6-digit code` 482719 must be entered correctly; invalid codes show error |

---

## 8. Data Model Reference

### EvidaStore Namespaces

All state is centralised in `store.js`. This is the data-model contract for backend development.

| Namespace | Key prefix | Methods | Backend resource |
|-----------|-----------|---------|-----------------|
| `wearables` | `evida:wearable:devices` | `list()`, `set()`, `connect()`, `disconnect()`, `isConnected()`, `clear()` | `GET/POST /me/devices` (Terra) |
| `booking` | `evida:booking:confirmed` | `isConfirmed()`, `confirm(details)`, `details()`, `clear()` | `POST /me/bookings` |
| `consultations` | `evida:consultations:had` + `:last` | `hadConsultation()`, `completedAt()`, `markCompleted()`, `reset()` | `GET /me/consultations` |
| `onboarding` | `evida:onboarding:completed` + `:tour` + `:setup:tasks` | `isCompleted()`, `completedAt()`, `markCompleted()`, `tourStep()`, `setTourStep()`, `setupTasks()`, `completeTask()`, `isTaskDone()`, `clearTour()`, `clearSetupTasks()` | `PATCH /me { onboardedAt }` |
| `questionnaire` | `evida:medical:questionnaire` | `get()`, `isCompleted()`, `save(data)`, `clear()` | `PUT /me/questionnaire` |
| `account` | `evida:account:saved` + `evida:partial:account` | `saved()`, `save()`, `partial()`, `setPartial()`, `clearPartial()` | `POST /auth/signup` |
| `profile` | `evida:profile:saved` | `get()`, `save(data)`, `clear()` | `GET/PUT /me/profile` |
| `prefs` | `evida_notif_count` + `evida_dark_mode` + `evida:prefs:notif:channels` | `notifCount()`, `setNotifCount()`, `darkMode()`, `setDarkMode()`, `notifChannel()`, `setNotifChannel()` | `GET/PATCH /me/preferences` |
| `idVerification` | `evida:profile:id-verified` | `isVerified()`, `setVerified()`, `clear()` | `POST /me/id-verification` |

### Key Shapes

```typescript
interface Device {
  id: string
  name: string
  brand?: string
  connectedAt?: string  // ISO date
}

interface Booking {
  confirmed: boolean
  clinic?: string       // 'oxford' | 'holborn' | 'liverpool'
  bloodDate?: string    // ISO date YYYY-MM-DD
  bloodTime?: string    // 'HH:MM'
  gpDate?: string       // ISO date YYYY-MM-DD
  gpTime?: string       // 'HH:MM'
}

interface Consultation {
  hadConsultation: boolean
  completedAt: number | null  // epoch ms
}

interface Onboarding {
  completedAt: number | null  // epoch ms
  tourStep: number            // 1-based
  setupTasks: string[]        // 'booking' | 'wearables' | 'records' | 'questionnaire' | 'verify'
}

interface Questionnaire {
  conditions: string
  medications: string
  familyHistory: string
  allergies: string
  smoking: string     // 'never' | 'ex' | 'occasional' | 'daily'
  alcohol: string     // 'none' | 'light' | 'moderate' | 'heavy'
  exercise: string    // 'sedentary' | 'light' | 'moderate' | 'active'
  completedAt: string // ISO
}

interface Account {
  name: string
  email: string
  savedAt: string  // ISO
}

interface Profile {
  name: string
  email: string
  phone: string
  dob: string
  address: string
}

interface Preferences {
  notifCount: number          // default 3
  darkMode: boolean
  notificationChannels: {
    email: boolean
    push: boolean
    sms: boolean
    calendar: boolean
    'appt-sms': boolean
    'appt-email': boolean
    'checklist-email': boolean
    newsletter: boolean
    promo: boolean
  }
}
```

---

## 9. UAT Scenarios

### UAT Harness (`_uat.js`)

A gear-button panel in the bottom-left corner of every screen exposes 7 controls. The first 4 seed `EvidaStore` journey states; 3 are utility buttons.

| Button | Seed state | Expected app behaviour |
|--------|-----------|----------------------|
| **New user** | `EvidaStore.clearAll()` → `login.html` | Fresh account — no booking. Login screen shown. |
| **Baseline booked** | `seedBooked()` (booking confirmed, future dates) → `dashboard.html` | Dashboard shows post-booking/pre-consult state (checklist with 0/3, appointment rows with upcoming dates, "Results pending") |
| **Pre-consult complete** | `seedBooked()` + questionnaire + ID verification + 1 wearable → `dashboard.html` | All onboarding tasks done (100%), awaiting consultation. Dashboard shows completed checklist, connected device. |
| **Post-consult** | `seedBooked(past)` + questionnaire + ID verification + 1 wearable + `markCompleted()` → `post-consult.html` | Dashboard shows post-consult state (checklist hidden, "Your results are ready" badge, completed appointments, populated stats); post-consult.html shows all 4 tabs |
| **Fail next payment** | Sets `evida:demo:fail-payment` flag (one-shot, consumed by `booking.html`) | Booking step 5 will always fail payment → shows payment-failed recovery screen |
| **View website ↗** | `window.location.href = '/'` | Leaves the patient app for the marketing site |
| **↩ Reset to zero** | `EvidaStore.clearAll()` → `login.html` | Wipes all state, returns to login |

### Testing Flows

| Test scenario | Steps | Expected result |
|--------------|-------|----------------|
| New member full flow | 1. Open any screen 2. Tap demo gear → "New user" 3. Create account 4. Complete booking 5. Complete onboarding | Dashboard shows post-booking/pre-consult state |
| Returning member | 1. Run "Baseline booked" demo 2. Navigate to dashboard | Dashboard shows bookings, checklist, appointments |
| Post-consult view | 1. Run "Post-consult" demo 2. Go to dashboard 2. Tap badge or navigate to post-consult.html | Health report with all 4 tabs populated |
| Payment failure recovery | 1. Run "Baseline booked" 2. Run "Fail next payment" 3. Go to booking?step=5 4. Tap Pay | Payment fails → recovery screen → retry or new slots |
| Pre-booking state | 1. Run "New user" 2. Navigate to dashboard | Empty booking hero, no checklist, no appointments |
| Locked account | 1. Navigate to login 2. Sign in with `locked@evida.co.uk` | Error banner "This account has been temporarily locked" |
| Pending membership | 1. Run "Baseline booked" 2. Navigate to booking?flow=signup 3. Skip payment 4. Complete onboarding | Dashboard shows pending payment banner |

---

## 10. Future Considerations (v2)

Items the prototype hints at but does not fully implement:

| Feature | Where hinted | v2 scope |
|---------|-------------|----------|
| Add-ons | `booking.html` step 2 (commented out) | Home nurse visit (£70), Hormone panel upgrade (£85), Combined (£140) |
| Reschedule appointments | `dashboard.html` "Reschedule" button shows toast | Full appointment rescheduling flow |
| Real search results | `dashboard.html` search → redirects to Ask Evi | Dedicated search results page |
| Terra wearable integration | `wearables.html` connect modal | Real OAuth flow for Apple Watch, Garmin, Whoop, Oura |
| Real-time biomarker charts | `insights.html` tabs | Historical trends, charts, comparisons |
| Notification inbox | `messages.html` thread list | Real push notifications with inbox |
| 2FA / authenticator app | `settings.html` | Real TOTP setup flow |
| Passkey / biometric auth | `settings.html` | WebAuthn passkey registration |
| Payment methods management | `settings.html` payment history | Saved cards, PayPal, refunds |
| Family / referral sharing | `post-consult.html` "Refer a friend" | Full referral programme |
| Evi AI chat backend | `ask-evi.html` | Real LLM integration with biomarker context |
| Uploaded document viewer | `documents.html` with doc-upload-viewer.html | Real file storage and rendering |
| Full invoice generation | `booking.html` `downloadInvoice()` | Server-side PDF generation |
