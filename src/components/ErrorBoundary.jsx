import { Component } from 'react'

/** Catches unexpected render errors and keeps the page usable. */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('Wellness Physiotherapy site error:', error, info)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="error-fallback">
        <div className="container error-fallback__inner">
          <p className="eyebrow">Demo website</p>
          <h1>Something went wrong on this page</h1>
          <p>
            The preview could not be displayed. Reloading usually fixes it. If the problem
            continues, the site’s developer will need to check the browser console.
          </p>
          <button type="button" className="btn btn--primary" onClick={this.handleReload}>
            Reload the page
          </button>
        </div>
      </main>
    )
  }
}

export default ErrorBoundary
