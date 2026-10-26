import { useId } from 'react'
import { clinic } from '../config/clinic'
import './Brand.css'

/**
 * Clinic wordmark + logo mark. Used in the navbar and footer.
 * `variant="dark"` switches the wordmark to light text.
 */
export function Brand({ variant = 'light', showSub = true }) {
  const gradientId = useId()

  return (
    <span className={`brand brand--${variant}`}>
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" focusable="false">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#14907f" />
              <stop offset="100%" stopColor="#053638" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="14" fill={`url(#${gradientId})`} />
          <path
            d="M10.5 25.6h6.2l2.7-7.5 4.7 15.1 3-7.6h4.3"
            fill="none"
            stroke="#eafff9"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="36.4" cy="12.8" r="3.1" fill="#9fe6d5" opacity="0.9" />
        </svg>
      </span>
      <span className="brand__text">
        <span className="brand__name">{clinic.wordmark}</span>
        {showSub ? <span className="brand__sub">{clinic.wordmarkSub}</span> : null}
      </span>
    </span>
  )
}

export default Brand
