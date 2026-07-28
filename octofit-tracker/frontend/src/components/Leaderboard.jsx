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

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) throw new Error('Failed to load leaderboard');
        const payload = await response.json();
        setEntries(getCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-bold">Leaderboard</h2>
        <p className="text-muted">Rankings and progress across the OctoFit community.</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {entries.map((entry) => (
            <li key={entry._id || entry.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span className="fw-semibold">{entry.userId || entry.name || 'Unknown user'}</span>
              <span className="badge bg-primary rounded-pill">{entry.score || entry.rank || 0}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Leaderboard;
