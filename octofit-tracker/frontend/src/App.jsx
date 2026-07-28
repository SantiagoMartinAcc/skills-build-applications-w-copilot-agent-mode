import { Link, Route, Routes } from 'react-router-dom';
import appLogo from '../../../docs/octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

function App() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <div className="app-shell min-vh-100 bg-light text-dark">
      <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <img src={appLogo} alt="OctoFit Tracker logo" width="40" height="40" />
            OctoFit Tracker
          </Link>
          <span className="navbar-text text-white-50">Modern multi-tier fitness app</span>
        </div>
      </header>

      <main className="container py-5">
        <section className="row align-items-center g-4">
          <div className="col-lg-7">
            <p className="text-uppercase fw-semibold text-primary">Ready to launch</p>
            <h1 className="display-5 fw-bold mb-3">Track workouts, teams, and progress in one place.</h1>
            <p className="lead text-muted">
              This React 19 + Vite frontend connects to the OctoFit backend API with environment-based URLs.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <a className="btn btn-primary btn-lg" href={`${apiBaseUrl}/api/health`}>
                Check API health
              </a>
              <a className="btn btn-outline-secondary btn-lg" href="http://localhost:5173">
                Open frontend
              </a>
            </div>
            <div className="alert alert-info mt-4 mb-0">
              Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces URLs. If it is not set, the app safely falls back to localhost.
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

        <nav className="nav nav-pills flex-wrap gap-2 mt-4">
          <Link className="nav-link btn btn-outline-primary" to="/users">Users</Link>
          <Link className="nav-link btn btn-outline-primary" to="/teams">Teams</Link>
          <Link className="nav-link btn btn-outline-primary" to="/activities">Activities</Link>
          <Link className="nav-link btn btn-outline-primary" to="/leaderboard">Leaderboard</Link>
          <Link className="nav-link btn btn-outline-primary" to="/workouts">Workouts</Link>
        </nav>

        <section className="row mt-4 g-4">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
