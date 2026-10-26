import {
  Activity,
  ArrowRight,
  Bandage,
  Bone,
  Brain,
  Dumbbell,
  House,
  Info,
  PersonStanding,
  Trophy,
} from 'lucide-react'
import { clinic } from '../config/clinic'
import SectionHeader from './SectionHeader'
import './Services.css'

const serviceIcons = {
  bone: Bone,
  activity: Activity,
  dumbbell: Dumbbell,
  trophy: Trophy,
  brain: Brain,
  bandage: Bandage,
  house: House,
  person: PersonStanding,
}

export function Services({ onEnquire }) {
  const services = clinic.enabledServices

  return (
    <section id="services" className="section section--tint services">
      <div className="container">
        <div className="services__head">
          <SectionHeader
            eyebrow="Services"
            title={
              <>
                Areas of care, <em>clearly explained</em>
              </>
            }
            lead="Physiotherapy and rehabilitation cover a wide range of movement concerns. These are the care areas this demo presents — each one must be confirmed with the clinic before it is advertised."
          />
          <p className="services__count" aria-hidden="true">
            {String(services.length).padStart(2, '0')} care areas
          </p>
        </div>

        <ul className="services__grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Activity

            return (
              <li
                key={service.id}
                className="service-card"
                data-reveal
                style={{ '--reveal-delay': `${Math.min(index, 5) * 60}ms` }}
              >
                <span className="service-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__text">{service.description}</p>
                <button
                  type="button"
                  className="service-card__link text-link"
                  onClick={() => onEnquire(service.title)}
                >
                  Enquire about this service
                  <ArrowRight aria-hidden="true" />
                  <span className="sr-only"> — {service.title}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <p className="services__note" role="note">
          <Info aria-hidden="true" />
          <span>{clinic.servicesNote}</span>
        </p>
      </div>
    </section>
  )
}

export default Services
