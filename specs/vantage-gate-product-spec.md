# Vantage Gate

## What it is

A UK-focused SaaS that lets companies see, at a glance, the state of every government security clearance held across their team, and reminds the right people before anything lapses.

## Who it's for

UK companies doing government-adjacent work: government digital consultancies, defence suppliers, cleared-IT recruitment firms, and specialist government cyber firms.

Typical customer profile: 20 to 200 person UK firm holding or bidding for government contracts requiring SC-level access.

The buyer is whoever is responsible for tracking clearances inside the company: security controller, personnel security controller, facility security officer, head of compliance, bid manager, or head of delivery.

## Clearances tracked

Each employee can hold one or more of the following simultaneously:

- BPSS (Baseline Personnel Security Standard)
- CTC (Counter Terrorist Check)
- SC (Security Check)
- eSC (enhanced SC)
- DV (Developed Vetting)
- eDV (enhanced DV)
- SAF (annual Security Appraisal Form, layered on an existing clearance)
- Right to Work (visa-linked expiry)

## Features

### Staff roster

- Summary strip showing total cleared staff, in good standing, needing attention, and unverified.
- Status filter pills: All, Overdue, Due soon, Active, Unverified.
- Search and add-employee actions.
- Table showing each employee's most urgent clearance rather than their highest-ranked. An employee with a healthy DV but an overdue SC shows "SC · Overdue".

### Person panel

- Full name and role, both editable.
- List of all clearances held by that person.
- Add-a-clearance form: level, review date, confirmation method.
- Confirmation history feed showing every verification event, with named attribution to the controller who made each entry.
- Save changes re-affirms the selected clearance with a "no changes reported" history entry.
- History entries are auto-generated only. Never manually typed. Immutable once written.

### Confirmation methods

Every clearance addition or update records how it was confirmed. Options:

- UKSV portal check
- Transferred from previous sponsor
- Internal security team confirmation
- Imported during onboarding (applied automatically to CSV imports, never selectable manually)

### CSV import during onboarding

- CSV upload available on the empty-state roster.
- Strict template with fixed columns: Full name, Role, Clearance level, Review date, and optionally Right to Work expiry.
- Preview before commit, with invalid rows flagged for correction.
- Every imported record is stamped "Imported during onboarding by [controller name] on [date]".

### Re-verification workflow

- Every imported record carries an Unverified badge until an independent verification event is added.
- Unverified is a distinct state from Overdue.
- Dedicated re-verification screen lists all Unverified records and allows the controller to work through them one at a time or in bulk, applying one confirmation method to multiple records at once.
- Unverified records are fully usable: searchable, filterable, present on the roster. They are excluded from the "in good standing" count.
- The Unverified badge shifts colour over time (neutral, then amber, then red) as records age past 30, 60, and 90 days.
- The state never blocks features or hides records.

### Weekly digest email

- One email per company, sent weekly to all users with a login.
- Not sent to tracked employees.
- Summarises Overdue and Due soon clearances at 90, 30, and 7 day thresholds.
- Deep-links into the roster.
- Sent via a transactional email provider with SPF, DKIM, and DMARC configured on a dedicated sending subdomain.

### Compound status handling

- Records can carry more than one state at once, for example an imported record that is both Unverified and Overdue.
- The roster surfaces the highest-urgency state as the primary badge, with secondary markers for other applicable states.

## What it does not do

- Does not run any checks. All vetting happens outside the app, via UKSV or the sponsoring organisation.
- Does not integrate with UKSV. No such API exists for third parties.
- Is not a DBS or right-to-work check provider.
- Does not track FSC or IPSA at the organisation level.
- Does not do resource allocation, availability tracking, or staffing decisions.
- Does not send notifications to individual tracked employees.
- Does not have a line-management or manager concept.

## Tech stack

To be confirmed at build time. Not committed.
