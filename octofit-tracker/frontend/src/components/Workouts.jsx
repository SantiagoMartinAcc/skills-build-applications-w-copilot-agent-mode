import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

const getCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && Array.isArray(payload.results)) return payload.results;
  return [];
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) throw new Error('Failed to load workouts');
        const payload = await response.json();
        setWorkouts(getCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-bold">Workouts</h2>
        <p className="text-muted">Suggested training plans from the OctoFit platform.</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id} className="list-group-item">
              <div className="fw-semibold">{workout.name}</div>
              <div className="text-muted small">{workout.focus} • {workout.durationMinutes} min</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Workouts;
