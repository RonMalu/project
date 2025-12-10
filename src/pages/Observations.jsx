import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observationsAPI } from '../services/api';
import StarryBackground from '../components/StarryBackground';
import '../styles/Observations.css';

const Observations = () => {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchObservations = async () => {
    try {
      const response = await observationsAPI.getAll();
      setObservations(response.data);
    } catch (err) {
      setError('Failed to load observations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObservations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this observation?')) {
      try {
        await observationsAPI.delete(id);
        setObservations(observations.filter((obs) => obs.id !== id));
      } catch (err) {
        alert('Failed to delete observation');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="observations-container">
        <StarryBackground />
        <div className="loading">Loading observations...</div>
      </div>
    );
  }

  return (
    <div className="observations-container">
      <StarryBackground />

      <div className="observations-content">
        <div className="observations-header">
          <h1>My Observations</h1>
          <Link to="/observations/new" className="btn btn-primary">
            New Observation
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        {observations.length === 0 ? (
          <div className="empty-state">
            <p>No observations yet. Start recording your wayfinding journey!</p>
            <Link to="/observations/new" className="btn btn-secondary">
              Create Your First Observation
            </Link>
          </div>
        ) : (
          <div className="observations-grid">
            {observations.map((observation) => (
              <div key={observation.id} className="observation-card">
                <div className="observation-header">
                  <span className="observation-date">
                    {new Date(observation.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="observation-details">
                  {observation.star_pattern && (
                    <div className="detail-item">
                      <strong>Star Pattern:</strong> {observation.star_pattern.name}
                      <br />
                      <small>Direction: {observation.star_pattern.direction}</small>
                    </div>
                  )}

                  {observation.wave_pattern && (
                    <div className="detail-item">
                      <strong>Wave Pattern:</strong> {observation.wave_pattern.name}
                      <br />
                      <small>Direction: {observation.wave_pattern.direction}</small>
                    </div>
                  )}

                  {observation.bird_migration && (
                    <div className="detail-item">
                      <strong>Bird:</strong> {observation.bird_migration.bird_name}
                      <br />
                      <small>Direction: {observation.bird_migration.movement_direction}</small>
                    </div>
                  )}

                  {observation.notes && (
                    <div className="detail-item">
                      <strong>Notes:</strong>
                      <p>{observation.notes}</p>
                    </div>
                  )}
                </div>

                <div className="observation-actions">
                  <button
                    onClick={() => navigate(`/observations/${observation.id}/edit`)}
                    className="btn btn-small btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(observation.id)}
                    className="btn btn-small btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Observations;
