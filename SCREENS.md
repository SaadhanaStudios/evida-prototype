# Evida Prototype — Screen & URL Reference

## Journey Maps

### 1. New User (Create Account → Booking → Onboarding)

```
login.html                  (landing screen)
login.html?s=signup         (sign-up form)
booking.html?flow=signup&step=3   (test selection)
booking.html?flow=signup&step=4   (GP appointment)
booking.html?flow=signup&step=5   (add-ons)
booking.html?flow=signup&step=6   (payment)
booking.html?flow=signup&step=7   (confirmation)
onboarding.html?step=1      (welcome tour — step 1)
onboarding.html?step=2      (welcome tour — step 2)
onboarding.html?step=3      (welcome tour — step 3 / setup checklist)
dashboard.html              (main dashboard)
```

### 2. Returning User (Sign In → Dashboard)

```
login.html
login.html?s=signin
dashboard.html
```

### 3. Existing User — Add Booking

```
dashboard.html
booking.html?step=1         (test selection)
booking.html?step=3         (test selection — MVP skips step 2)
booking.html?step=4         (GP appointment)
booking.html?step=5         (add-ons)
booking.html?step=6         (payment)
booking.html?step=7         (confirmation)
dashboard.html
```

---

## Screen Index

### `login.html` — Account Entry

| URL | Screen shown |
|-----|-------------|
| `login.html` | Landing (sign-in / create account choice) |
| `login.html?s=signin` | Sign-in form |
| `login.html?s=signup` | Sign-up form (step 1) |
| `login.html?s=verify-email` | Email verification holding screen |
| `login.html?s=success` | Account created success |
| `login.html?s=account-pending` | Account pending review |

URL updates live as the user navigates. `?s=` param is read on load to restore the correct screen.

---

### `booking.html` — Booking Flow

| URL | Step shown |
|-----|-----------|
| `booking.html` | Step 1 (test selection — returning user default) |
| `booking.html?step=1` | Step 1 — choose tests |
| `booking.html?step=3` | Step 3 — review selection |
| `booking.html?step=4` | Step 4 — GP appointment |
| `booking.html?step=5` | Step 5 — add-ons |
| `booking.html?step=6` | Step 6 — payment |
| `booking.html?step=7` | Step 7 — confirmation |
| `booking.html?flow=signup` | Signup flow — starts at step 3 |
| `booking.html?flow=signup&step=N` | Signup flow — deep-link to step N |

`?flow=signup` flag controls visible steps (3→4→5→6→7) and back-from-step-3 destination (`login.html`).  
`?step=N` is preserved when the flow param is present.

---

### `onboarding.html` — Welcome Tour

| URL | Step shown |
|-----|-----------|
| `onboarding.html` | Tour step 1 (or last saved step from localStorage) |
| `onboarding.html?step=1` | Welcome card |
| `onboarding.html?step=2` | Features card |
| `onboarding.html?step=3` | Setup checklist |

URL updates live. `?step=` on the URL is purely cosmetic for shareability — the authoritative restore source is localStorage (`EvidaStore.onboarding.tourStep()`).

---

### Other Screens

| File | Purpose |
|------|---------|
| `dashboard.html` | Main logged-in dashboard |
| `doc-blood-test.html` | Blood test results detail |
| `doc-gp-summary.html` | GP consultation summary |
| `booking-manage.html` | Manage / reschedule existing booking |

---

## UAT Quick-Links

| Scenario | Start URL |
|----------|-----------|
| Full new-user journey | `login.html` (use gear panel → "New user") |
| Jump to booking step 3 (signup) | `booking.html?flow=signup&step=3` |
| Jump to payment | `booking.html?flow=signup&step=6` |
| Jump to confirmation | `booking.html?flow=signup&step=7` |
| Onboarding tour start | `onboarding.html?step=1` |
| Onboarding setup checklist | `onboarding.html?step=3` |
| Dashboard (pre-seeded) | `dashboard.html` (use gear panel → "Baseline booked") |

---

## Demo Gear Panel (`_uat.js`)

Available on every screen via the gear (⚙) icon. Four presets:

| Label | Action |
|-------|--------|
| New user | `EvidaStore.clearAll()` → `login.html` |
| Baseline booked | Seeds booked state → `dashboard.html` |
| Pre-consult complete | Seeds consult state → `dashboard.html` |
| Post-consult | Seeds post-consult state → `dashboard.html` |
