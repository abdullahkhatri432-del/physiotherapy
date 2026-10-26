# Wellness Physiotherapy and Rehabilitation Center – website

React + Vite, plain CSS, lucide-react. No backend.

## Run
    npm install
    npm run dev        # local
    npm run build      # production build -> dist/
    npm run preview    # test the build

## Before launch: fill `src/config/clinic.js`
Missing now: address, phone, WhatsApp number (digits with country code, e.g. 9198xxxxxxxx), hours, email (optional), siteUrl (real domain), therapist info (none shown), service confirmation. Dev mode shows a yellow banner listing what is missing; nothing fake appears publicly. The form's button stays disabled until `whatsapp` is set.

## Enquiry form
Submissions are NOT stored. The form validates and opens WhatsApp with a prefilled message; the clinic confirms the appointment directly. To store submissions you would need an optional backend/form service (some have free tiers; check terms and privacy law).

## SEO
Title, description, OG tags, theme colour, lang=en are in `index.html`. Canonical link and JSON-LD (MedicalBusiness) are generated from config, using only filled fields; set `siteUrl` first. Note: JSON-LD is injected by JavaScript. Google renders this, but validate with the Rich Results Test. No og:image yet (no real photo). `robots.txt` is in `public/`; create `sitemap.xml` (one URL: the domain) and add the Sitemap line only once the domain is known, then submit it in Google Search Console. SEO setup does not guarantee indexing, ranking or patients.

## Deploy (free)
1. Push to a client-approved GitHub repo.
2. Pick a host (e.g. Cloudflare Pages, Netlify, Vercel, GitHub Pages) and **read its current terms**: some free tiers (e.g. Vercel Hobby) restrict commercial use.
3. Build command `npm run build`, output `dist`.
4. Add the client's own domain in the host's dashboard, set DNS as instructed, wait for automatic HTTPS.
5. Verify: HTTPS loads, WhatsApp links open, mobile menu works, view-source shows title/meta.
The clinic should own the domain and business accounts.

## Free vs paid
Free: hosting (eligible plans), HTTPS, WhatsApp handoff, Search Console. Paid/optional: domain (yearly), professional photography, form backend/booking system, premium hosting.

## Extra features (all driven by clinic.js, hidden until data is provided)
FAQ (visible text + FAQPage JSON-LD; edit answers with the clinic), mobile Call/WhatsApp bar, Open-now badge (`openingTimes`), embedded map (`mapsEmbedUrl`), Google review button (`reviewUrl`), team section (`therapists`, verified info only).

Online consultation section is worded as an enquiry (the clinic confirms availability). Remove it in App.jsx if the clinic does not offer it. Doctor profiles come from `therapists` in clinic.js.
