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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) throw new Error('Failed to load activities');
        const payload = await response.json();
        setActivities(getCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    };

    loadActivities();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-bold">Activities</h2>
        <p className="text-muted">Recent movement logs from the OctoFit backend.</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {activities.map((activity) => (
            <li key={activity._id || activity.id} className="list-group-item">
              <div className="fw-semibold">{activity.type}</div>
              <div className="text-muted small">{activity.durationMinutes} min</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Activities;
