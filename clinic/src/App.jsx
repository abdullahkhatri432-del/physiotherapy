import { useEffect, useState } from 'react'
import { Activity, Brain, Dumbbell, Hand, Heart, Home, Menu, X, MessageCircle, Phone, MapPin, Video, CalendarCheck, Stethoscope } from 'lucide-react'
import { clinic, waLink, faq } from './config/clinic.js'

const icons = { Activity, Brain, Dumbbell, Hand, Heart, Home }
const nav = [['About','#about'],['Services','#services'],['Doctors','#team'],['Online Consultation','#online'],['FAQ','#faq'],['Contact','#contact']].filter(([t]) => t !== 'Doctors' || clinic.therapists.length > 0)
const DEV = import.meta.env.DEV

function useSeo() {
  useEffect(() => {
    if (clinic.siteUrl) {
      const l = document.createElement('link'); l.rel = 'canonical'; l.href = clinic.siteUrl; document.head.appendChild(l)
    }
    const data = { '@context':'https://schema.org','@type':'MedicalBusiness',name:clinic.name,
      medicalSpecialty:'Physiotherapy', areaServed: clinic.city,
      ...(clinic.siteUrl && { url: clinic.siteUrl }),
      ...(clinic.phone && { telephone: clinic.phone }),
      ...(clinic.address && { address:{ '@type':'PostalAddress', streetAddress:clinic.address, addressLocality:clinic.city, addressRegion:clinic.region, addressCountry:clinic.country } }) }
    for (const d of [data, { '@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}})) }]) {
      const s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(d); document.head.appendChild(s)
    }
  }, [])
}

function OpenNow() {
  const t = clinic.openingTimes
  if (!t) return null
  const n = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const m = n.getHours() * 60 + n.getMinutes()
  const c = x => { const [h, mm] = x.split(':'); return h * 60 + +mm }
  const open = (t[n.getDay()] || []).some(([a, b]) => m >= c(a) && m < c(b))
  return <p className={open ? 'now on' : 'now'}><span aria-hidden="true" />{open ? 'Open now' : 'Currently closed'}</p>
}

function Enq({ topic, children, className = 'more' }) {
  const h = waLink(`Hello, I would like to enquire about ${topic} at ${clinic.name}.`)
  return h ? <a className={className} href={h} target="_blank" rel="noopener noreferrer">{children}</a> : <a className={className} href="#enquiry">{children}</a>
}

function Book({ children = 'Book an Appointment', className = 'btn' }) {
  const href = waLink()
  return href ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    : <a className={className} href="#enquiry">{children}</a>
}

function Enquiry() {
  const [f, setF] = useState({ name:'', phone:'', date:'', method:'WhatsApp', note:'' })
  const [err, setErr] = useState({})
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    const x = {}
    if (f.name.trim().length < 2) x.name = 'Please enter your name.'
    if (!/^\+?[0-9\s-]{10,15}$/.test(f.phone.trim())) x.phone = 'Enter a valid phone number (10–15 digits).'
    if (f.note.length > 300) x.note = 'Please keep this under 300 characters.'
    setErr(x)
    if (Object.keys(x).length) return
    const msg = `Hello, I would like to enquire about physiotherapy services and appointment availability at ${clinic.name}.\nName: ${f.name}\nPhone: ${f.phone}\nPreferred date: ${f.date || 'Not specified'}\nPreferred contact: ${f.method}${f.note ? `\nNote: ${f.note}` : ''}`
    const href = waLink(msg)
    if (href) window.open(href, '_blank', 'noopener')
  }
  const ready = !!waLink()
  return (
    <form onSubmit={submit} noValidate className="card form" id="enquiry">
      <h3>Appointment enquiry</h3>
      <p className="muted">This opens WhatsApp with your details so you can message the clinic. It does not confirm an appointment; the clinic will confirm directly.</p>
      <label>Patient name<input value={f.name} onChange={set('name')} aria-invalid={!!err.name} aria-describedby="e1" autoComplete="name" /></label>
      {err.name && <p id="e1" className="err" role="alert">{err.name}</p>}
      <label>Phone number<input type="tel" value={f.phone} onChange={set('phone')} aria-invalid={!!err.phone} aria-describedby="e2" autoComplete="tel" /></label>
      {err.phone && <p id="e2" className="err" role="alert">{err.phone}</p>}
      <label>Preferred date (optional)<input type="date" value={f.date} onChange={set('date')} /></label>
      <label>Preferred contact method<select value={f.method} onChange={set('method')}><option>WhatsApp</option><option>Phone call</option></select></label>
      <label>Short enquiry (optional)<textarea rows="3" value={f.note} onChange={set('note')} aria-describedby="e3" /></label>
      {err.note && <p id="e3" className="err" role="alert">{err.note}</p>}
      <p className="muted small">Privacy: your details are not stored by this website. They are sent only via WhatsApp when you press the button. Please do not share medical reports or detailed health history here.</p>
      <button className="btn" disabled={!ready}>Send enquiry on WhatsApp</button>
      {!ready && <p className="muted small">Online enquiry is not available yet. Please use the contact details below.</p>}
      {DEV && !ready && <p className="dev">DEV: set clinic.whatsapp in src/config/clinic.js</p>}
    </form>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  useSeo()
  const missing = DEV ? ['address','phone','whatsapp','hours','siteUrl'].filter(k => !clinic[k] || !clinic[k].length) : []
  const close = () => setOpen(false)
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    {missing.length > 0 && <div className="dev" role="status">DEV ONLY – missing in clinic.js: {missing.join(', ')}</div>}
    <header className="hdr"><div className="wrap bar">
      <a href="#top" className="logo"><span className="mark" aria-hidden="true">+</span><span>Wellness Physiotherapy<small>and Rehabilitation Center</small></span></a>
      <button className="menu" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="nav" aria-label="Primary" className={open ? 'open' : ''}>
        {nav.map(([t,h]) => <a key={h} href={h} onClick={close}>{t}</a>)}
        <Book className="btn sm">Book an Appointment</Book>
      </nav>
    </div></header>
    <main id="main">
      <section className="hero" id="top"><div className="wrap herogrid">
        <div>
          <p className="pill">Physiotherapy in {clinic.city}, {clinic.region}</p>
          <h1>Move Better. Recover Stronger. Live Healthier.</h1>
          <p className="lead">{clinic.name} offers physiotherapy and rehabilitation services. Get in touch to discuss your needs and ask about appointments.</p>
          <div className="cta"><Book /><a className="btn ghost" href="#services">Explore Our Services</a></div>
          <ul className="chips"><li>Physiotherapy</li><li>Rehabilitation</li><li>Exercise-based care</li></ul>
        </div>
        <div className="art" aria-hidden="true">
          <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of a person stretching">
            <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0f5c63"/><stop offset="1" stopColor="#2a9d8f"/></linearGradient></defs>
            <rect width="400" height="400" rx="28" fill="url(#g)"/>
            <circle cx="320" cy="80" r="90" fill="#fff" opacity=".08"/><circle cx="60" cy="350" r="110" fill="#d9f2e6" opacity=".12"/>
            <g stroke="#fff" strokeWidth="14" strokeLinecap="round" fill="none"><path d="M200 150v100"/><path d="M200 175l-60-45M200 175l62-50"/><path d="M200 250l-45 80M200 250l55 80"/></g>
            <circle cx="200" cy="112" r="28" fill="#d9f2e6"/>
            <path d="M70 352h260" stroke="#d9f2e6" strokeWidth="6" strokeLinecap="round" opacity=".6"/>
          </svg>
        </div>
      </div></section>
      <section className="quick" aria-label="Quick actions"><div className="wrap"><ul>
        <li><Enq className="qt" topic="physiotherapy services and appointment availability"><CalendarCheck aria-hidden="true" /><b>Book Appointment</b><span>Enquire on WhatsApp</span></Enq></li>
        <li><a className="qt" href="#online"><Video aria-hidden="true" /><b>Online Consultation</b><span>Ask the clinic</span></a></li>
        <li><a className="qt" href={clinic.therapists.length ? '#team' : '#services'}><Stethoscope aria-hidden="true" /><b>{clinic.therapists.length ? 'Our Doctors' : 'Our Services'}</b><span>{clinic.therapists.length ? 'Meet the team' : 'What we offer'}</span></a></li>
        <li><a className="qt" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" /><b>Find the Clinic</b><span>View on Google</span></a></li>
      </ul></div></section>
      <section id="about" className="sec"><div className="wrap narrow">
        <p className="kicker">About</p><h2>About the clinic</h2>
        <p>{clinic.name} is a physiotherapy clinic in {clinic.city}. The clinic's focus is supporting mobility and functional movement through rehabilitation and exercise-based care, and helping patients understand the treatment options available to them.</p>
      </div></section>
      <section id="services" className="sec alt"><div className="wrap">
        <p className="kicker">Services</p><h2>Our services</h2>
        <p className="muted">Services are subject to assessment and may not suit every patient. Please contact the clinic to discuss your situation.</p>
        <ul className="grid">{clinic.services.map(([ic,t,d]) => { const I = icons[ic] || Activity; return <li className="card" key={t}><I aria-hidden="true" /><h3>{t}</h3><p>{d}</p><Enq topic={t}>Enquire →</Enq></li> })}</ul>
      </div></section>
      <section id="why" className="sec"><div className="wrap">
        <p className="kicker">Why us</p><h2>Why choose us</h2>
        <ul className="grid">{[['Clear communication','Ask questions and understand your options before you decide.'],['Understanding treatment options','Discuss what physiotherapy may involve for your needs.'],['Easy enquiries','Reach the clinic by WhatsApp, phone or the enquiry form.'],['Clinic information in one place','Services, location and contact details on one page.']].map(([t,d]) => <li className="card" key={t}><h3>{t}</h3><p>{d}</p></li>)}</ul>
      </div></section>
      <section className="sec alt"><div className="wrap">
        <p className="kicker">Getting started</p><h2>How to get started</h2>
        <ol className="steps">{['Explore the services.','Contact the clinic to discuss your needs.','Confirm an appointment directly with the clinic.'].map((t,i) => <li className="card step" key={t}><b>{i+1}</b><span>{t}</span></li>)}</ol>
        <p className="muted">Sending an enquiry does not confirm an appointment.</p>
      </div></section>
      {clinic.therapists.length > 0 && <section id="team" className="sec alt"><div className="wrap">
        <p className="kicker">Our doctors</p><h2>Meet the clinic team</h2>
        <ul className="grid">{clinic.therapists.map(t => <li className="card doc" key={t.name}>
          <div className="avatar">{t.photo ? <img src={t.photo} alt={`Portrait of ${t.name}`} loading="lazy" /> : t.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
          <h3>{t.name}</h3><p className="role">{t.role}</p><p>{t.details}</p>
          <Enq topic={`an appointment with ${t.name}`}>Enquire about an appointment →</Enq></li>)}</ul>
      </div></section>}
      <section id="online" className="sec"><div className="wrap two online">
        <div><p className="kicker">Online consultation</p><h2>Talk to the clinic from home</h2>
          <p>If travelling is difficult, ask the clinic about an online consultation. The clinic will tell you whether an online session suits your needs, how it will be held and when. Some concerns need an in-person assessment.</p>
          <ul className="ticks"><li>Message the clinic to ask about availability</li><li>The clinic confirms the format, time and any fees</li><li>Appointments are confirmed directly with the clinic</li></ul>
          <Enq className="btn" topic="online consultation">Ask About Online Consultation</Enq></div>
        <div className="devicecard" aria-hidden="true"><Video size={56} /><b>Online consultation</b><span>Availability confirmed by the clinic</span></div>
      </div></section>
      <section id="faq" className="sec alt"><div className="wrap narrow">
        <p className="kicker">FAQ</p><h2>Frequently asked questions</h2>
        {faq.map(([q, a]) => <details className="faq" key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div></section>
      <section className="band"><div className="wrap"><div><h2>Have a question about treatment?</h2><p>Contact the clinic to discuss your needs. Appointments are confirmed directly by the clinic.</p></div><Book>Book an Appointment</Book></div></section>
      <section id="contact" className="sec"><div className="wrap two">
        <div>
          <h2>Contact</h2>
          {clinic.address && <p><MapPin aria-hidden="true" /> {clinic.address}</p>}
          {clinic.phone && <p><Phone aria-hidden="true" /> <a href={`tel:${clinic.phone.replace(/[^\d+]/g,'')}`}>{clinic.phone}</a></p>}
          {clinic.email && <p><a href={`mailto:${clinic.email}`}>{clinic.email}</a></p>}
          {clinic.hours.length > 0 && <dl>{clinic.hours.map(([d,h]) => <div key={d}><dt>{d}</dt><dd>{h}</dd></div>)}</dl>}
          {!clinic.address && !clinic.phone && <p className="muted">Find directions and contact options on the clinic's Google listing.</p>}
          <OpenNow />
          <div className="cta"><a className="btn ghost" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">View clinic on Google</a>
          {clinic.reviewUrl && <a className="btn ghost" href={clinic.reviewUrl} target="_blank" rel="noopener noreferrer">Leave a Google review</a>}</div>
          {clinic.mapsEmbedUrl && <iframe className="map" title="Clinic location map" src={clinic.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />}
        </div>
        <Enquiry />
      </div></section>
    </main>
    <footer><div className="wrap">
      <p><strong>{clinic.name}</strong>, {clinic.city}</p>
      <p>{nav.map(([t,h]) => <a key={h} href={h}>{t} </a>)}</p>
      <p className="small">Privacy: this site does not store enquiry details. Information on this website is general and is not medical advice. Please consult a qualified professional about your condition.</p>
      <p className="small">© {new Date().getFullYear()} {clinic.name}</p>
    </div></footer>
    {(clinic.phone || waLink()) && <div className="mbar">
      {clinic.phone && <a href={`tel:${clinic.phone.replace(/[^\d+]/g,'')}`}><Phone aria-hidden="true" /> Call</a>}
      {waLink() && <a href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /> WhatsApp</a>}
    </div>}
    {waLink() && <a className="fab" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with the clinic on WhatsApp"><MessageCircle /></a>}
  </>)
}
