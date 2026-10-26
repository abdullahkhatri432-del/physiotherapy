/** Validation helpers for the appointment enquiry form. */

export const MESSAGE_LIMIT = 400
const PHONE_PATTERN = /^[6-9]\d{9}$/

function startOfDay(date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

export function formatISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Earliest and latest selectable dates (local time, ISO strings). */
export function getDateBounds(maxDaysAhead = 90) {
  const today = startOfDay(new Date())
  const latest = new Date(today)
  latest.setDate(latest.getDate() + maxDaysAhead)

  return { min: formatISODate(today), max: formatISODate(latest) }
}

/**
 * Accepts common Indian formats: "98765 43210", "+91 98765-43210", "09876543210".
 * Returns the 10-digit national number, or the raw digits when it doesn't match.
 */
export function getNationalNumber(raw = '') {
  const digits = raw.replace(/\D/g, '')

  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

export function validateAppointment(values, maxDaysAhead = 90) {
  const errors = {}
  const name = values.name.trim()

  if (!name) {
    errors.name = 'Please enter your name.'
  } else if (name.length < 2) {
    errors.name = 'Please enter at least 2 characters.'
  } else if (name.length > 60) {
    errors.name = 'Please keep your name under 60 characters.'
  }

  const nationalNumber = getNationalNumber(values.phone)

  if (!nationalNumber) {
    errors.phone = 'Please enter a phone number the clinic can reach you on.'
  } else if (!PHONE_PATTERN.test(nationalNumber)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number, e.g. 98765 43210.'
  }

  const { min, max } = getDateBounds(maxDaysAhead)

  if (!values.date) {
    errors.date = 'Choose your preferred appointment date.'
  } else if (values.date < min) {
    errors.date = 'Please choose today or a future date.'
  } else if (values.date > max) {
    errors.date = `Please choose a date within the next ${maxDaysAhead} days.`
  }

  if (values.message.length > MESSAGE_LIMIT) {
    errors.message = `Please keep your message under ${MESSAGE_LIMIT} characters.`
  }

  return errors
}

export function formatLongDate(value) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
