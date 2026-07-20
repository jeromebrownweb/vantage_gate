# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# The task

Build a single static landing page for Vantage Gate — a UK SaaS for tracking government security clearances. The page exists to validate interest before the product is built; success is measurable waitlist signups.

Three inputs, each with a distinct job:

| Input | Role |
| --- | --- |
| `design/landing_page.png` | **What it must look like, and what it must say.** The target design. |
| `specs/vantage-gate-landingpage-brief.md` | **How to build it** — build order, JS behaviour, MailerLite, deploy. |
| `specs/html-css-best-practices.md` | **Rules to follow while building** — semantics, BEM, a11y, responsive. |

`specs/vantage-gate-product-spec.md` is background on the future SaaS app, which does not exist. It is context for understanding the domain, not a build target — build only what the brief calls for.

# Every session please read for this project

@specs/html-css-best-practices.md
@specs/vantage-gate-landingpage-brief.md
@specs/vantage-gate-product-spec.md

**Also open `design/landing_page.png` at the start of any build or styling work.** It cannot be auto-imported like the markdown files above, so read it explicitly with the Read tool.

# The design is the source of truth for copy

All page copy already exists in `design/landing_page.png` — the overview paragraph, the three "How it works" cards, the six clearance captions, both testimonials, all three FAQ Q&As, and the final CTA. **Transcribe it from the design. Do not write new copy, and do not improve the existing wording.**

This matters most for:

- **Testimonials.** Two real quotes attributed to a "Security Controller, defence supplier" and a "Head of Delivery, digital consultancy". These came from actual conversations. Never invent, extend, or reword a testimonial.
- **Waitlist count** in the meta row. A real figure. Never invent or inflate it.

If the design genuinely does not cover something, ask rather than filling the gap.

# Design specifics

- Dark navy base, blue accent (`#2F6BFF`-ish), aurora/light-streak background, card-based layout on a centred max-width column.
- Meta row is five labelled stats: Status · Waitlist · Category · Region · Launch est.
- Carousel shows two screenshot cards side by side, captioned "Dashboard View" and "Viewing Employees", with prev/next arrows either side.
- `images/` holds five app screenshots (`Slide 16_9 - 1.png` … `5.png`) — the carousel and lightbox assets. The design shows two captioned slides but five files exist; confirm the intended slide order and captions before assuming.

# Repo state

Specs, design, and image assets only — no source code, no build system, no package manager, no tests. There are no build/lint/test commands; nothing has been scaffolded yet. Not yet a git repo (step 1 of the brief's hosting section).

Build at the repo root as plain `index.html` plus external CSS and JS, per the brief's vanilla-no-framework constraint. Verify by opening the file in a browser — there is no dev server.

Not yet decided, so ask: the MailerLite account and form ID for the embed snippet.

# Work flow

**Stop after each step and let me verify it in the browser before starting the next one.** Do not chain steps together.

### 1. Read the design first, not last

Pull the design through the Figma MCP before writing any markup:

- `get_metadata` — the frame tree and section order.
- `get_variable_defs` — colour, spacing, and type tokens.
- `get_design_context` — per section, for layout and the real copy strings.
- `download_assets` — the icon vectors.

### 2. Tokens become CSS variables verbatim

Put the design's own scale on `:root`. Never approximate a value off a screenshot.

### 3. `index.html`

Semantic sections, top to bottom:

header · meta row (as a `<dl>`) · overview · carousel · how it works · clearances · testimonials · FAQ · final CTA

Copy is pasted from the Figma text nodes, never retyped.

### 4. `css/styles.css`

- BEM naming.
- Grid for the card blocks, Flexbox for the header and meta row.
- Aurora background is a raster image (`design/page background image (1).png`), not gradients. Loaded as a `background-image` with `--vg-color-base` navy behind it. Move it into `images/` before deploy.

### 5. Responsive

Mobile-first, breakpoints at 48rem and 64rem. Reflow: meta row 5→2→1, clearances 3→2→1, carousel 2 slides→1.

### 6. `js/main.js`

- Carousel — arrows clamped at the ends, keyboard support.
- Lightbox — Esc, backdrop click, and close button; focus trapped while open and returned to the trigger on close.
- Degrades to a scrollable list without JS.

### 7. MailerLite

Account `1648557`. **Inline embedded form** (form `eADsYa`, container `#mlb2-43908534`) in the CTA — always visible. Switched to this from a popup because MailerLite pop-ups require an auto-show trigger and can't be made click-only; the leftover `EmmiiO` popup should be deactivated in the dashboard.

- Used the **HTML embed**, not the JS `ml-embedded` one, so MailerLite's `<style>` block could be stripped and the form styled from `css/styles.css` (section 16) — no `!important` fights. MailerLite class names, field names, hidden inputs and the container id are kept verbatim so `webforms.min.js` still validates/submits; that script + the success fn + the `takel` fetch sit before `</body>`.
- Fields: Email + Company + Your Role. **"Your Role" maps to MailerLite's `name` field** (`fields[name]`), so a subscriber's role shows in their Name column — intentional, given the form has no custom role field.
- Both `data-waitlist` buttons **scroll to `#waitlist` and focus the email input** (js/main.js), they no longer open a popup.
- **GDPR consent checkbox is NOT in the form** — the embed has an empty privacy-policy slot. Must be enabled in the MailerLite form builder (adds a checkbox to the markup → re-paste needed), or a consent line added. Double opt-in confirmed on.

### 8. Vercel

Analytics one-liner, `git init`, and push. I connect the repo in the browser myself.