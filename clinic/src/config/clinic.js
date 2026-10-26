// SINGLE SOURCE OF TRUTH. Empty string = not yet verified. Never fill with guesses.
export const clinic = {
  name: 'Wellness Physiotherapy and Rehabilitation Center',
  city: 'Surat',
  region: 'Gujarat',
  country: 'IN',
  address: '',            // TODO verify from Google listing
  phone: '',              // TODO e.g. '+91 98xxxxxxxx'
  whatsapp: '',           // TODO digits only with country code, e.g. '9198xxxxxxxx'
  email: '',              // optional
  hours: [],              // TODO e.g. [['Mon–Sat','9:00 am – 6:00 pm']]
  siteUrl: '',            // TODO real domain, e.g. 'https://example.com' (enables canonical + JSON-LD url)
  mapsUrl: 'https://www.google.com/search?kgmid=/g/11stnw5334&hl=en-IN&q=Wellness+Physiotherapy+and+Rehabilitation+Center',
  social: {},
  reviewUrl: '',          // Google review link from the Business Profile (shows 'Leave a review' button)
  mapsEmbedUrl: '',       // Google Maps > Share > Embed a map > src URL (shows map)
  therapists: [],         // [{name:'',role:'',details:'',photo:''}] verified info only; shows a neutral card while empty
  // Optional 'Open now' badge. Keys 0=Sun..6=Sat, list of [open,close] 24h ranges (India time). Omit days that are closed.
  openingTimes: null,     // e.g. {1:[['09:00','13:00'],['16:00','19:00']]}
  // Edit/remove services freely. Confirm each with the clinic before launch.
  services: [
    ['Activity','Orthopedic Physiotherapy','Support for movement and recovery related to bones, joints and muscles.'],
    ['Brain','Neurological Rehabilitation','Rehabilitation approaches that support movement and daily function.'],
    ['Dumbbell','Exercise Therapy','Guided exercise programmes to support strength, mobility and flexibility.'],
    ['Hand','Manual Therapy','Hands-on techniques used as part of an individual treatment plan.'],
    ['Heart','Maternity Physiotherapy','Gentle guidance and exercise support before and after childbirth.'],
    ['Home','Home Physiotherapy Visits','Ask the clinic whether visits are available for your situation.'],
  ],
}
export const whatsappMessage = `Hello, I would like to enquire about physiotherapy services and appointment availability at ${clinic.name}.`
export const waLink = (msg = whatsappMessage) =>
  clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}` : null

export const faq = [
  ['How do I book an appointment?', 'Send an enquiry on WhatsApp or contact the clinic by phone. The clinic will confirm any appointment directly with you.'],
  ['Do I need a doctor’s referral?', 'This can depend on your situation. Please ask the clinic when you get in touch.'],
  ['What should I bring to my visit?', 'Comfortable clothing and any medical documents you already have are usually helpful. Please confirm with the clinic.'],
  ['Is physiotherapy suitable for me?', 'Suitability depends on an individual assessment. The clinic can discuss your needs and available options.'],
  ['Are home visits available?', 'Please ask the clinic whether home visits are available for your situation and area.'],
  ['What are the fees?', 'Fees are confirmed directly by the clinic. Please ask when you enquire.'],
]
