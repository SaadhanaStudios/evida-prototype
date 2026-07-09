Evida — Company Brief
A high-level but detailed orientation to Evida: the problem, the product, the business, and where things stand. Written to bring a new team member, collaborator, or trusted advisor up to speed. Reflects status as of mid-2026 (pilot pre-launch). Some items are still being finalised and are flagged as such.

Competitors:
https://www.nekohealth.com/gb/en
https://dohealth.co/
https://rupa.pro/
https://www.welltheory.com/
https://www.functionhealth.com/
https://randoxhealth.com/en-GB/
https://www.thirdspace.london/
https://unbound.living/
https://withemerald.com/


1. In one paragraph
Evida is a UK preventive-health membership that combines clinician-led care with continuous data and AI. For a single annual fee, members get a comprehensive baseline health check (blood diagnostics plus wearables and history), a 45-minute virtual GP consultation that produces a personalised prevention plan, and ongoing support to actually act on it. The thesis: today's options are either clinical but reactive (NHS, private GPs) or data-rich but not clinically integrated (wearables, consumer health apps) — and nobody joins the two into a continuous, proactive pathway. Evida's tagline captures the positioning: "A healthier you. Powered by data. Led by experts."


2. The problem
People are living longer but spending more of those years in ill health. In England, average healthspan (years lived without significant illness) is drifting down even as lifespan edges up — roughly 47 healthy years against an 81-year lifespan for older cohorts, projected to worsen for younger generations. Much of the gap is driven by preventable conditions (e.g. hypertension affects ~1 in 3 UK adults, a large share undiagnosed).

The care landscape is siloed:

Traditional providers (NHS, Bupa, Nuffield, HCA, Circle) are treatment-focused and episodic — you show up when something is already wrong.
Emerging data players (Oura, Whoop, Function, Thriva, Zoe) generate continuous data but lack integrated clinical interpretation and follow-through.
Premium health-checks (Neko, Prenuvo, Emerald) give a great snapshot but are still one-off and expensive.

The result: risks that are visible in the data (a creeping HbA1c, a rising resting heart rate) go unactioned until they become diagnoses. Evida exists to close that loop.


3. What Evida is — the Evida Protocol (Track · Tailor · Act)
Evida's model is a continuous three-step loop rather than a one-off check:

Track — a baseline blood panel (via Randox), a medical/lifestyle questionnaire, and wearables data (via the Terra API: Garmin, Apple, Whoop, Oura), unified in one place.
Tailor — an AI-assisted summary preps the clinician; a 45-minute virtual GP consult (GP plus a health coach) interprets the data, addresses any presenting issues, and produces a personalised prevention plan and reports.
Act — ongoing engagement: a dashboard of insights, a living prevention plan with trackable actions, a non-clinical AI companion (Ask Evi), and periodic touchpoints (the included follow-up, optional consults).

The brand is deliberately warm-premium, not cold-clinical: evidence-based and data-led, but optimistic and empowering rather than fear-driven.


4. The product & pilot
The Evida Baseline membership is the launch product:

Single package, £320/year (a discounted pilot rate of £160 applies during the initial phase). Pricing was deliberately simplified down from earlier multi-tier options to remove decision friction.
Includes: the baseline diagnostics + the 45-minute GP/coach consult + a personalised prevention plan and reports + a 6-month follow-up + two included 15-minute consults across the membership year.
Diagnostics: Randox clinic visits for the pilot (nationwide, strongest in London; ~72-hour results). At-home test kits and nurse home visits (via the Haim partnership, as a paid upsell) are on the near-term roadmap and shown as "coming later."
The consult is virtual, GP-led then handed to a health coach, ending with an agreed plan and follow-up scheduling.
Output: a physical health-check report plus a lifestyle-medicine report, a summary letter to the patient's NHS GP, and prescriptions/referrals where clinically indicated.

A second offering — on-demand virtual GP consultations (15-minute, ~£30 for members / ~£45 for non-members) — is planned to follow (around September/October), bookable independently of the membership.

Pilot: targeting first patients in late June 2026, ~200 patients, web-first (mobile-friendly responsive web app; native app is post-launch). Status markers: tech platform built in-house, partners contracted, GPs ready, and CQC registration pending (anticipated in time for launch).


5. Who it's for
Primary segment: evidence-seeking health improvers — health-conscious professionals, roughly 25–45, higher-income, more mainstream than hardcore biohackers. Three working personas:

The Curious Health Optimiser — has scattered data from apps/wearables, wants it unified into clear, trustworthy, actionable insight; wants to stay ahead.
The Issue-Prompted Professional — has a nagging concern, wants reassurance and a clear path, finds the NHS hard to navigate.
The Overloaded Risk Manager — older, time-poor, has been told about an elevated marker (BP, cholesterol, pre-diabetes), wants one trusted place overseeing their health.

Primary research behind this: 30+ customer interviews, 15+ doctor interviews, and focus groups. Recurring motivations: peace of mind, more daily energy, catching issues early, and investing in the future.


6. Business model
Revenue: annual membership (£320/yr standard), with planned add-ons (on-demand consults) to expand annual customer value.
Go-to-market: D2C first (current focus), with B2B affiliates near-term and B2B employers on the roadmap.
Market context: prevention-led healthcare is a fast-growing consumer category in the UK (wearables, premium gyms/supplements, health media, private health checks all expanding), with a sizable serviceable market among health-conscious higher earners.
The economic model assumes healthy gross margins on the membership, with the partner ecosystem (diagnostics, telemedicine, prescriptions) handled through contracted providers.

(Specific financial projections exist in internal materials; treat figures here as directional.)


7. Technology & partners
Built in-house on AWS. Data flows: wearables come in via the Terra API through Lambda, get normalised, and feed a dashboard service; the app runs on ECS; raw data in S3, working data in RDS (Postgres); data passed as JSON.

Key partners / stack:

Randox — blood diagnostics (clinic-based for pilot; manual portal initially, API at higher volume).
Semble — the clinical/telemedicine platform GPs work in (patient records, appointments, questionnaires). It is invisible to patients — Evida creates and links accounts in the background. Reports are pre-populated via an ambient scribe (Heidi/Tandem) and reviewed by the GP. Long-term, Evida intends to migrate to its own clinical stack.
Terra — wearables integration (Garmin, Apple, Whoop, Oura; smart scales and glucose monitors on the roadmap).
Stripe — payments. Healistic — e-prescriptions. Zendesk — patient messaging. Haim — nurse home visits (roadmap).

AI & compliance: AI is used for data synthesis and document unification — never for diagnosis (a firm regulatory line). Deployment uses a UK/EU-region Azure setup with hosted models to keep health data appropriately governed; lighter-weight/local options are on the radar for scale. A clinician-facing AI assist tool was explored but parked on regulatory grounds.


8. Team
A multidisciplinary core spanning commercial, clinical, and technology:

Abhishek Kumar — Founder & CEO (commercial).
Dr Jonathan Andrews — Co-Founder & Medical Director (clinical).
Dr Dominique O'Sullivan — GP, lifestyle medicine. Dr Alexandra Davidson — GP, functional medicine.
Mark Woodward — CTO (technology). Dhruv Gupta — AI/Product.
Plus product and associate support, with backgrounds across consulting, healthcare, tech, and finance, and ties to London Business School and Cambridge.

The team blends practising clinicians with product/AI engineering — central to the "experts + AI" thesis.


9. Positioning & long-term moats
Evida positions itself in the upper-right of a 2x2 — proactive/continuous and clinician-led + data/AI-integrated — a quadrant where it argues no incumbent sits: traditional providers are reactive; data players aren't clinically integrated; premium checks aren't continuous.

Durable advantages it's building toward:

Longitudinal health data unique to each member (compounding over time).
A trusted, evidence-based brand in a noisy wellness market.
An integrated partner ecosystem (diagnostics + telemedicine + prescriptions + wearables) stitched into one pathway.

Underlying bets: convenience wins (fewest clicks, seamless experience) and experts + AI wins (clinicians augmented by AI outperform either alone).


10. Current status & roadmap
Now (pilot, ~June 2026): membership Baseline, web-first, ~200 patients, Randox clinic diagnostics, Terra wearables, Semble-backed clinical workflow, manual-but-compliant ID and some manual back-office steps by design at low volume.

Near-term: on-demand virtual GP consults; at-home diagnostics and nurse home visits; deeper wearables (scales, glucose); richer AI-assisted insights and report automation; engagement features (progress tracking, reminders, light gamification).

Longer-term: B2B channels (affiliates, employers); broader integrations; migration off Semble to an Evida-native clinical stack; data-driven efficacy research; geographic expansion beyond the UK.

Audacious goal: add 1 billion healthy years across 100 million lives.


11. Key risks & open questions
Regulatory: CQC registration must land in time; the no-AI-diagnosis line constrains some product ambitions.
Integration: the Semble two-way data-sharing architecture (especially getting wearable data in front of the GP) is the main open technical decision.
Engagement / "Act": the long-term post-consult engagement model is the least-defined area and the hardest behavioural problem (adherence is genuinely difficult); the goal is high-value, low-nag mechanics rather than duplicating what wearables already do.
Operational scaling: several pilot processes are deliberately manual and will need automation as volume grows.



Companion artifacts: the patient design brief (Evida_Design_Brief.md), the end-to-end flow diagrams (Evida_MVP_Patient_Flow.html), and the full decisions/open-questions log (Evida_MVP_Clarifications.md).

