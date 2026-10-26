import { useState } from 'react'
import About from './components/About'
import Appointment from './components/Appointment'
import Contact from './components/Contact'
import DemoBar from './components/DemoBar'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Navbar from './components/Navbar'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import { useScrollReveal } from './hooks/useScrollReveal'

export function App() {
  useScrollReveal()

  /*
   * Clicking "Enquire about this service" pre-fills the enquiry message and
   * scrolls to the form. The token makes repeat clicks on the same card work.
   */
  const [prefill, setPrefill] = useState(null)

  const handleServiceEnquiry = (service) => {
    setPrefill({ service, token: Date.now() })
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <DemoBar />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Services onEnquire={handleServiceEnquiry} />
        <WhyChooseUs />
        <HowItWorks />
        <Appointment prefill={prefill} />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export default App
