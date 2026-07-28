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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) throw new Error('Failed to load teams');
        const payload = await response.json();
        setTeams(getCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    };

    loadTeams();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-bold">Teams</h2>
        <p className="text-muted">Groups and shared objectives for the OctoFit community.</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {teams.map((team) => (
            <li key={team._id || team.id} className="list-group-item">
              <div className="fw-semibold">{team.name}</div>
              <div className="text-muted small">{team.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Teams;
