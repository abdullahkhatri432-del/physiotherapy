/**
 * Central clinic configuration.
 * ---------------------------------------------------------------------------
 * Every piece of business information shown on the website is read from here.
 * Values that have NOT been verified with the clinic are empty strings/arrays.
 * The UI renders a clearly labelled "pending verification" placeholder for
 * those instead of inventing details.
 *
 * Before this demo goes live:
 *   1. Fill in phone, whatsapp, address, hours and mapsUrl.
 *   2. Review every service in `services` and confirm its scope with the clinic.
 *   3. Set `appointment.mode` to "whatsapp" once a verified WhatsApp number
 *      exists, or connect a real form endpoint / CRM.
 *   4. Set `isDemo` to false once content has been approved (this hides the
 *      demo labels and disclaimers).
 */
export const clinic = {
  isDemo: true,

  name: 'Wellness Physiotherapy and Rehabilitation Center',
  shortName: 'Wellness Physiotherapy',
  wordmark: 'Wellness',
  wordmarkSub: 'Physiotherapy & Rehabilitation',
  specialty: 'Physiotherapy & Rehabilitation',
  locality: 'Surat, Gujarat',
  city: 'Surat',
  state: 'Gujarat',
  country: 'India',

  phone: {
    label: 'Clinic phone',
    value: '', // e.g. '+91 261 000 0000'
    placeholder: '+91 XXXXX XXXXX',
    verified: false,
  },

  whatsapp: {
    label: 'WhatsApp',
    value: '', // e.g. '+91 98765 43210'
    placeholder: '+91 XXXXX XXXXX',
    verified: false,
  },

  address: {
    label: 'Clinic address',
    value: '', // single-line address used for maps / copy
    // Replace with verified lines, e.g. ['2nd Floor, ...', 'Ring Road', 'Surat, Gujarat 395002']
    lines: [],
    placeholderLines: ['Building / floor and street', 'Area or landmark', 'Surat, Gujarat – PIN'],
  },

  hours: {
    label: 'Opening hours',
    verified: false,
    // e.g. [{ days: 'Monday – Saturday', time: '9:00 AM – 7:00 PM' }]
    rows: [],
    placeholder: 'Opening hours to be confirmed',
  },

  mapsUrl: '', // verified Google Maps link

  contactNote:
    'Contact details, timings and location on this preview are placeholders. Please confirm them with the clinic before publishing.',

  /*
   * Demo-only form behaviour.
   * The site always runs in demo mode right now: nothing is submitted or stored.
   * 'whatsapp' and 'endpoint' are documented targets for a future integration
   * once the clinic provides a verified channel (see README).
   */
  appointment: {
    mode: 'demo',
    endpoint: '',
    maxDaysAhead: 90,
    message:
      'This is a demo website. Your enquiry has not been sent and no appointment has been booked.',
  },

  servicesNote:
    'Service list is demo content for design review. The clinic must confirm each service, its scope and its suitability before this page goes live.',

  services: [
    {
      id: 'orthopedic-physiotherapy',
      title: 'Orthopedic Physiotherapy',
      icon: 'bone',
      description:
        'Assessment-led physiotherapy for joint, muscle and bone-related movement concerns, planned after a clinical evaluation.',
      enabled: true,
    },
    {
      id: 'pain-management',
      title: 'Pain Management',
      icon: 'activity',
      description:
        'Clinic-guided, non-invasive approaches to help understand and manage persistent pain alongside an exercise plan.',
      enabled: true,
    },
    {
      id: 'exercise-therapy',
      title: 'Exercise Therapy',
      icon: 'dumbbell',
      description:
        'Progressive exercise programmes to rebuild strength, control and confidence in everyday movement.',
      enabled: true,
    },
    {
      id: 'sports-injury-rehabilitation',
      title: 'Sports Injury Rehabilitation',
      icon: 'trophy',
      description:
        'Structured rehabilitation for sprains, strains and training setbacks, with a focus on returning to activity safely.',
      enabled: true,
    },
    {
      id: 'neurological-rehabilitation',
      title: 'Neurological Rehabilitation',
      icon: 'brain',
      description:
        'Movement and function support for people living with neurological conditions, paced to individual ability.',
      enabled: true,
    },
    {
      id: 'post-surgery-rehabilitation',
      title: 'Post-Surgery Rehabilitation',
      icon: 'bandage',
      description:
        'Recovery support following orthopedic surgery, always coordinated with the treating surgeon’s advice.',
      enabled: true,
    },
    {
      id: 'home-physiotherapy',
      title: 'Home Physiotherapy',
      icon: 'house',
      description:
        'In-home sessions for people who find travelling difficult, subject to clinical suitability and availability.',
      enabled: true,
    },
    {
      id: 'posture-mobility-support',
      title: 'Posture and Mobility Support',
      icon: 'person',
      description:
        'Practical guidance for desk-related stiffness, postural habits and the everyday movements you want to keep doing.',
      enabled: true,
    },
  ],

  /** Filters out services the clinic has switched off in the config. */
  get enabledServices() {
    return this.services.filter((service) => service.enabled)
  },
}

export default clinic
