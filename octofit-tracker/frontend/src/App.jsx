import appLogo from '../../../docs/octofitapp-small.png'
import './App.css'

function App() {
  return (
    <div className="app-shell min-vh-100 bg-light text-dark">
      <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/">
            <img src={appLogo} alt="OctoFit Tracker logo" width="40" height="40" />
            OctoFit Tracker
          </a>
          <span className="navbar-text text-white-50">Modern multi-tier fitness app</span>
        </div>
      </header>

      <main className="container py-5">
        <section className="row align-items-center g-4">
          <div className="col-lg-7">
            <p className="text-uppercase fw-semibold text-primary">Ready to launch</p>
            <h1 className="display-5 fw-bold mb-3">Track workouts, teams, and progress in one place.</h1>
            <p className="lead text-muted">
              This React 19 + Vite frontend now connects to the OctoFit backend API for a complete fitness experience.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
                Check API health
              </a>
              <a className="btn btn-outline-secondary btn-lg" href="http://localhost:5173">
                Open frontend
              </a>
            </div>
          </div>
          <div className="col-lg-5 text-center">
            <div className="hero-card shadow-sm rounded-4 p-4 bg-white">
              <img src={appLogo} alt="OctoFit Tracker logo" className="img-fluid mb-3" width="180" />
              <h2 className="h4 fw-bold">Multi-tier architecture</h2>
              <p className="text-muted mb-0">
                Presentation tier on Vite, logic tier on Express, and data tier on MongoDB.
              </p>
            </div>
          </div>
        </section>

        <section className="row mt-4 g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5 fw-bold">Frontend</h3>
                <p className="text-muted">React 19, Vite, Bootstrap, and routing are ready for the presentation layer.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5 fw-bold">Backend</h3>
                <p className="text-muted">Express and TypeScript provide the API tier on port 8000.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5 fw-bold">Data layer</h3>
                <p className="text-muted">Mongoose is ready to connect to MongoDB at the default local database URL.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
