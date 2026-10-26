import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Info, Send } from 'lucide-react'
import { clinic } from '../config/clinic'
import {
  formatLongDate,
  getDateBounds,
  MESSAGE_LIMIT,
  validateAppointment,
} from '../lib/validation'
import './Appointment.css'

const emptyValues = { name: '', phone: '', date: '', message: '' }

export function Appointment({ prefill }) {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const headingRef = useRef(null)
  const formRef = useRef(null)

  const bounds = useMemo(
    () => getDateBounds(clinic.appointment.maxDaysAhead),
    [],
  )

  /* A service card asked to enquire about that service. */
  useEffect(() => {
    if (!prefill?.service) return

    /*
     * The enquiry is triggered by a click in another section, so this effect is
     * the synchronisation point for the pre-filled message and focus.
     */
    // oxlint-disable-next-line react/set-state-in-effect
    setValues((previous) => {
      const message = `Enquiry about: ${prefill.service}.`
      const isUntouched = !previous.message.trim() || previous.message.startsWith('Enquiry about: ')
      return isUntouched ? { ...previous, message } : previous
    })
    setStatus('idle')

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('appointment')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })

    const timer = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 120)
    return () => window.clearTimeout(timer)
  }, [prefill])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => {
      if (!previous[name]) return previous
      const next = { ...previous }
      delete next[name]
      return next
    })
  }

  const handleBlur = (event) => {
    const { name } = event.target
    const nextErrors = validateAppointment(values, clinic.appointment.maxDaysAhead)
    setErrors((previous) => ({ ...previous, [name]: nextErrors[name] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateAppointment(values, clinic.appointment.maxDaysAhead)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      formRef.current?.querySelector(`[name="${firstError}"]`)?.focus()
      return
    }

    /*
     * Deliberately no network request: there is no verified clinic channel yet.
     * The demo notice explains that nothing was sent or booked.
     */
    setStatus('demo')
  }

  return (
    <section id="appointment" className="section appointment" aria-labelledby="appointment-title">
      <div className="container">
        <div className="appointment__card" data-reveal>
          <div className="appointment__aside">
            <p className="eyebrow">Appointment enquiry</p>
            <h2 id="appointment-title" ref={headingRef} tabIndex={-1}>
              Let’s find a time that works for you
            </h2>
            <p>
              Share your contact details and preferred date. The clinic team will respond to
              confirm availability — please don’t include medical reports or health details.
            </p>

            <ul className="appointment__points">
              <li>
                <Check aria-hidden="true" />
                Contact details and a preferred date only
              </li>
              <li>
                <Check aria-hidden="true" />
                No appointment is booked automatically
              </li>
              <li>
                <Check aria-hidden="true" />
                The clinic confirms availability with you directly
              </li>
            </ul>

            <div className="appointment__demo">
              <span className="chip chip--mint">
                <Info aria-hidden="true" />
                Demo form
              </span>
              <p>
                Clinic phone and WhatsApp details are pending, so this form is a visual preview.
                Nothing is sent, stored or booked.
              </p>
            </div>
          </div>

          <div className="appointment__panel">
            {status === 'demo' ? (
              <div className="appointment__result" role="status">
                <span className="appointment__result-icon" aria-hidden="true">
                  <Info />
                </span>
                <h3>Enquiry ready — but not sent</h3>
                <p>
                  {clinic.appointment.message} Your details stayed in this browser tab and were
                  not saved anywhere.
                </p>

                <dl className="appointment__summary">
                  <div>
                    <dt>Name</dt>
                    <dd>{values.name.trim()}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{values.phone.trim()}</dd>
                  </div>
                  <div>
                    <dt>Preferred date</dt>
                    <dd>{formatLongDate(values.date)}</dd>
                  </div>
                  {values.message.trim() ? (
                    <div>
                      <dt>Message</dt>
                      <dd>{values.message.trim()}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="appointment__result-actions">
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => setStatus('idle')}
                  >
                    Edit details
                  </button>
                </div>

                <p className="appointment__result-help">
                  To take real enquiries, the clinic needs to provide a verified WhatsApp number or
                  a booking endpoint. Both are configured in <code>src/config/clinic.js</code>.
                </p>
              </div>
            ) : (
              <form className="appointment__form" ref={formRef} onSubmit={handleSubmit} noValidate>
                <h3 className="appointment__form-title">Request an appointment</h3>

                <div className="field">
                  <label htmlFor="name">
                    Full name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name ? (
                    <p className="field__error" id="name-error" role="alert">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="phone">
                    Phone number <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Your mobile number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                  />
                  {errors.phone ? (
                    <p className="field__error" id="phone-error" role="alert">
                      {errors.phone}
                    </p>
                  ) : (
                    <p className="field__hint" id="phone-hint">
                      10-digit mobile number. Include +91 if you prefer.
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="date">
                    Preferred appointment date <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={bounds.min}
                    max={bounds.max}
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? 'date-error' : 'date-hint'}
                  />
                  {errors.date ? (
                    <p className="field__error" id="date-error" role="alert">
                      {errors.date}
                    </p>
                  ) : (
                    <p className="field__hint" id="date-hint">
                      Choose any date within the next {clinic.appointment.maxDaysAhead} days. The
                      clinic will confirm the actual time.
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="message">
                    Short message <span className="field__optional">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    maxLength={MESSAGE_LIMIT}
                    placeholder="Anything the clinic should know before calling you — no medical details needed."
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'message-error message-hint' : 'message-hint'
                    }
                  />
                  <div className="field__meta">
                    <p className="field__hint" id="message-hint">
                      Please don’t share reports or health information.
                    </p>
                    <span className="field__counter" aria-hidden="true">
                      {values.message.length}/{MESSAGE_LIMIT}
                    </span>
                  </div>
                  {errors.message ? (
                    <p className="field__error" id="message-error" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <button type="submit" className="btn btn--primary btn--block">
                  Send appointment enquiry
                  <Send aria-hidden="true" />
                </button>

                <p className="appointment__form-note">
                  <Info aria-hidden="true" />
                  <span>
                    Demo only: submitting this form does not send your details or book an
                    appointment.
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Appointment
