# Wellness Physiotherapy & Rehabilitation Center — Demo Website

A premium, responsive demo website for a physiotherapy and rehabilitation clinic in Surat,
Gujarat. Built with **React + Vite + JavaScript (JSX)** and **Lucide** icons.

> **This is a demo.** The clinic's phone number, WhatsApp number, address, opening hours, map
> link, team details and service availability have **not** been verified. The site labels these
> as pending rather than inventing them. The appointment form does not send or store anything.

---

## Quick start

Requires **Node.js 20.19+** or **22.12+** (Vite 8 requirement) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview the production build (http://localhost:4173)
npm run preview

# Optional: lint
npm run lint
```

---

## What's included

| Section | Notes |
| --- | --- |
| Demo bar + demo badges | Persistent "Demo website" label so the preview can't be mistaken for the live site |
| Navbar | Sticky, blurs on scroll, active-section highlight, accessible mobile drawer (Esc, scroll lock, focus return), appointment CTA |
| Hero | "Move Better. Recover Stronger. Live Healthier." + CTAs + care-pathway card |
| About | General physiotherapy explanation, focus areas, honesty note about unverified clinic details |
| Services | 8 service cards driven by config; "Enquire about this service" pre-fills the form |
| Why choose us | Dark teal section, four care principles, explicit no-guarantee note |
| How it works | Contact → discuss → confirm, with a note that nothing books automatically |
| Appointment enquiry | Client-side validation, date bounds, demo-only result panel, no sensitive fields |
| Contact | Clearly labelled placeholders for phone/WhatsApp/address/hours/map + map artwork |
| Footer | Nav, care areas, contact placeholders, medical disclaimer, image credit |
| Floating WhatsApp | Marked as pending; opens an explanatory panel until a verified number exists |

All business information is centralised in [`src/config/clinic.js`](src/config/clinic.js).

---

## Project structure

```
src/
  assets/
    fonts/                 Self-hosted Fraunces + Manrope (no runtime Google Fonts requests)
    images/                Optimised Pexels placeholder photography
  components/              One component + colocated CSS per section
    icons/WhatsAppIcon.jsx Custom WhatsApp glyph (Lucide has no brand icon)
  config/clinic.js         Clinic name, contacts, hours, maps, services, form behaviour
  data/navigation.js       Shared nav + footer links
  hooks/useScrollReveal.js IntersectionObserver reveal, respects reduced motion
  lib/validation.js        Form validation + date helpers
  styles/tokens.css        Design tokens (colour, type, spacing, radii, shadows)
  styles/base.css          Reset, typography, buttons, utilities, @font-face
```

---

## Configuration for the clinic owner

Open `src/config/clinic.js` and replace the placeholders:

| Field | Purpose | Example |
| --- | --- | --- |
| `phone.value` / `phone.verified` | Clickable clinic phone | `'+91 261 234 5678'`, `true` |
| `whatsapp.value` / `whatsapp.verified` | Enables the real floating WhatsApp link | `'+91 98765 43210'`, `true` |
| `address.lines` | Address lines shown on the contact card | `['2nd Floor, ...', 'Ring Road', 'Surat, Gujarat 395002']` |
| `hours.rows` / `hours.verified` | Opening hours (one row per range) | `[{ days: 'Mon – Sat', time: '9:00 – 19:00' }]` |
| `mapsUrl` | Verified Google Maps share link | `'https://maps.app.goo.gl/...'` |
| `services[].enabled` | Show/hide a service card | `false` removes the card |
| `isDemo` | `false` hides demo labels/disclaimers **only after content is approved** | `false` |
| `appointment.mode` | `'demo'` keeps the honest "not sent" behaviour | `'demo'` |
| `appointment.maxDaysAhead` | Date picker upper bound | `90` |

### Enabling real appointment enquiries

The current `appointment.mode` is `'demo'` and there is intentionally **no network request**. To
go live, choose one of these and implement it properly:

1. **WhatsApp** — set a verified `whatsapp.value`, then open a pre-filled `wa.me` link using the
   enquiry details. No data is stored on the website.
2. **Form backend** — POST to a serverless function / CRM endpoint you control, with spam
   protection, a privacy notice and a retention policy. Never collect medical details here.
3. **Booking system** — replace the form with the clinic's existing booking provider.

Until then, the form validates input locally, then shows a clear panel explaining nothing was
sent or booked.

---

## Content verification checklist

Before publishing, confirm with the clinic:

- [ ] Exact clinic name and preferred short name
- [ ] Verified phone, WhatsApp and email (if any)
- [ ] Full address + Google Maps link
- [ ] Opening hours and public holidays
- [ ] Which of the 8 services are actually offered, and their scope
- [ ] Home-visit availability and coverage area
- [ ] Practitioner names, qualifications, registrations (not included yet)
- [ ] Consent to use any clinic photography (current images are stock placeholders)
- [ ] Insurance / payment information (not included)
- [ ] Local compliance wording for healthcare advertising in Gujarat/India

Remove the `noindex` meta tag in `index.html` only when the site is approved for public launch.

---

## Deployment

The build output is a static site in `dist/`.

**Netlify** — build command `npm run build`, publish directory `dist`.

**Vercel** — framework preset "Vite", build `npm run build`, output `dist`.

**GitHub Pages** — add the repository base path to `vite.config.js`:

```js
export default defineConfig({
  base: '/repository-name/',
  plugins: [react()],
})
```

There are no routes or server requirements, so no SPA rewrite rules are needed.

---

## Accessibility & performance notes

- Semantic landmarks, one `h1`, ordered heading hierarchy, skip link, visible focus states.
- Form: labelled inputs, `aria-invalid`, `aria-describedby` error links, `role="alert"` errors,
  focus moved to the first invalid field, and a `role="status"` demo result.
- Mobile menu and WhatsApp popover support Escape, outside click and scroll locking.
- Motion is disabled under `prefers-reduced-motion`.
- Fonts are self-hosted woff2 (latin subset); hero image is eager/high priority, remaining images
  lazy-load with intrinsic dimensions to prevent layout shift.
- No analytics, cookies or third-party scripts; only `react`, `react-dom` and `lucide-react` are
  bundled.

---

## Imagery

Placeholder photography from [Pexels](https://www.pexels.com) (free-to-use license). These are
demonstration images only and should be replaced with the clinic's own photography before launch.

- Rehabilitation session — Karola G, Pexels #6111589
- Shoulder mobilisation — Karola G, Pexels #4506074
- Resistance band exercise — Karola G, Pexels #4506168

Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) and
[Manrope](https://fonts.google.com/specimen/Manrope), licensed under the SIL Open Font License.
