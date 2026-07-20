# Vantage Gate — Landing Page Build Brief

**Goal:** A single static landing page to validate interest before building the product. Success = measurable waitlist signups.

**Stack:** Vanilla HTML + CSS + JS. No framework. One page.

---

## Build steps (in order)

1. **Structure** — semantic HTML for all sections (see Sections below).
2. **Style** — CSS to match the approved app-store design: dark navy base, blue accent, aurora/light-streak background, card-based layout.
3. **Responsive** — mobile-first. Test at 320px, 768px, 1024px, 1440px. No horizontal scroll. Meta stats row and clearance grid must reflow.
4. **JS interactions** — carousel + lightbox (see below).
5. **MailerLite forms** — inline + popup (see below).
6. **Analytics** — add Vercel Analytics (one line).
7. **Deploy** — Vercel via GitHub (see below).

---

## Sections (top to bottom)

- Header: app icon, "Vantage Gate", subtitle "Security Clearance Tracking Software", **Join Waitlist** button.
- Meta row: Status · Waitlist count · Category · Region · Launch est.
- Overview paragraph.
- Screenshot carousel: "Dashboard View" + "Viewing Employees" (arrows, clickable to open lightbox).
- How it works: 3 icon cards.
- Clearances tracked: 6 cards (BPSS, CTC, SC, eSC, DV, eDV) with captions.
- People we've spoken to: 2 testimonial cards.
- FAQ: 3 Q&As.
- Final CTA: "Have an early say" + **Join Waitlist**.

---

## JS interactions

- **Carousel:** next/prev arrows. Keyboard arrow support. Loop or clamp at ends.
- **Lightbox:** click a screenshot to open it full-size as an overlay. Close on Esc, on backdrop click, and via a close button. Trap focus while open.
- Respect `prefers-reduced-motion` for all animation.

---

## MailerLite

- Use MailerLite embed snippet — no backend needed.
- **Inline form** under the final CTA (always visible) **+ popup form** triggered by "Join Waitlist" buttons.
- Turn on **double opt-in** in MailerLite.
- Add one **optional field** (role or company size) so signups show *who* cares.
- Add a one-line **GDPR consent note** by the form (UK users).

---

## Hosting (Vercel, free)

1. Init git repo, push to GitHub.
2. Connect repo in Vercel once (browser login — do this manually).
3. Auto-deploys on every `git push`. Free `*.vercel.app` domain is fine for now.
4. Enable **Vercel Analytics** to track visits → signup ratio (the real interest signal).

---

## Definition of done

- [ ] Matches approved design on desktop + mobile
- [ ] Carousel + lightbox work with mouse and keyboard
- [ ] Both MailerLite forms submit to the list; double opt-in on
- [ ] GDPR consent line present
- [ ] Live on Vercel, analytics tracking
