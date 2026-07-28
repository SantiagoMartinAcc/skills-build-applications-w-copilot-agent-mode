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

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const payload = await response.json();
        setUsers(getCollection(payload));
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    };

    loadUsers();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-bold">Users</h2>
        <p className="text-muted">Community members from the OctoFit backend.</p>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {users.map((user) => (
            <li key={user._id || user.id} className="list-group-item">
              <div className="fw-semibold">{user.name}</div>
              <div className="text-muted small">{user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Users;
