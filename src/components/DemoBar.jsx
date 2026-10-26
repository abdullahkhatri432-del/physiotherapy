import { clinic } from '../config/clinic'
import './DemoBar.css'

/** Persistent, unmissable demo label above the navigation. */
export function DemoBar() {
  if (!clinic.isDemo) return null

  return (
    <div className="demo-bar" role="note">
      <div className="container demo-bar__inner">
        <span className="demo-bar__tag">Demo website</span>
        <p className="demo-bar__text">
          Preview only — clinic details, services and imagery are placeholders pending verification.
        </p>
      </div>
    </div>
  )
}

export default DemoBar
