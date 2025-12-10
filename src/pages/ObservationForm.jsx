import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observationsAPI, starPatternsAPI, wavePatternsAPI, birdMigrationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StarryBackground from '../components/StarryBackground';
import '../styles/ObservationForm.css';

const ObservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    user_id: '',
    star_pattern_id: '',
    wave_pattern_id: '',
    bird_migration_id: '',
    notes: '',
  });

  const [starPatterns, setStarPatterns] = useState([]);
  const [wavePatterns, setWavePatterns] = useState([]);
  const [birdMigrations, setBirdMigrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stars, waves, birds] = await Promise.all([
          starPatternsAPI.getAll(),
          wavePatternsAPI.getAll(),
          birdMigrationsAPI.getAll(),
        ]);

        setStarPatterns(stars.data);
        setWavePatterns(waves.data);
        setBirdMigrations(birds.data);

        if (isEditMode) {
          const response = await observationsAPI.getOne(id);
          const obs = response.data;
          setFormData({
            user_id: obs.user_id,
            star_pattern_id: obs.star_pattern_id || '',
            wave_pattern_id: obs.wave_pattern_id || '',
            bird_migration_id: obs.bird_migration_id || '',
            notes: obs.notes || '',
          });
        } else {
          setFormData((prev) => ({ ...prev, user_id: user.id }));
        }
      } catch (err) {
        setError('Failed to load form data');
        console.error(err);
      }
    };

    fetchData();
  }, [id, isEditMode, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.star_pattern_id && !formData.wave_pattern_id && !formData.bird_migration_id) {
      setError('Please select at least one pattern (star, wave, or bird)');
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        user_id: formData.user_id,
        star_pattern_id: formData.star_pattern_id || null,
        wave_pattern_id: formData.wave_pattern_id || null,
        bird_migration_id: formData.bird_migration_id || null,
        notes: formData.notes,
      };

      if (isEditMode) {
        await observationsAPI.update(id, submitData);
      } else {
        await observationsAPI.create(submitData);
      }

      navigate('/observations');
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || 'Failed to save observation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="observation-form-container">
      <StarryBackground />

      <div className="observation-form-content">
        <h1>{isEditMode ? 'Edit Observation' : 'New Observation'}</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="observation-form">
          <div className="form-group">
            <label htmlFor="star_pattern_id">Star Pattern</label>
            <select
              id="star_pattern_id"
              name="star_pattern_id"
              value={formData.star_pattern_id}
              onChange={handleChange}
            >
              <option value="">None</option>
              {starPatterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name} - {pattern.direction}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="wave_pattern_id">Wave Pattern</label>
            <select
              id="wave_pattern_id"
              name="wave_pattern_id"
              value={formData.wave_pattern_id}
              onChange={handleChange}
            >
              <option value="">None</option>
              {wavePatterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.name} - {pattern.direction}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bird_migration_id">Bird Migration</label>
            <select
              id="bird_migration_id"
              name="bird_migration_id"
              value={formData.bird_migration_id}
              onChange={handleChange}
            >
              <option value="">None</option>
              {birdMigrations.map((bird) => (
                <option key={bird.id} value={bird.id}>
                  {bird.bird_name} - {bird.movement_direction}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              placeholder="Record your observations and insights..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Observation' : 'Create Observation'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/observations')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ObservationForm;
