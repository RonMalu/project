import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { starPatternsAPI, wavePatternsAPI, birdMigrationsAPI } from '../services/api';
import StarryBackground from '../components/StarryBackground';
import Compass from '../components/Compass';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [starPatterns, setStarPatterns] = useState([]);
  const [wavePatterns, setWavePatterns] = useState([]);
  const [birdMigrations, setBirdMigrations] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <StarryBackground />
        <div className="loading">Loading navigation data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <StarryBackground />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Navigation Dashboard</h1>
          <Compass size={150} />
        </div>

        <div className="dashboard-grid">
          <section className="dashboard-section">
            <h2>Star Patterns</h2>
            <div className="pattern-list">
              {starPatterns.length > 0 ? (
                starPatterns.map((pattern) => (
                  <div key={pattern.id} className="pattern-card">
                    <h3>{pattern.name}</h3>
                    <p><strong>Direction:</strong> {pattern.direction}</p>
                    {pattern.rising_point && (
                      <p><strong>Rising Point:</strong> {pattern.rising_point}</p>
                    )}
                    {pattern.description && <p>{pattern.description}</p>}
                  </div>
                ))
              ) : (
                <p className="empty-message">No star patterns available</p>
              )}
            </div>
          </section>

          <section className="dashboard-section">
            <h2>Wave Patterns</h2>
            <div className="pattern-list">
              {wavePatterns.length > 0 ? (
                wavePatterns.map((pattern) => (
                  <div key={pattern.id} className="pattern-card">
                    <h3>{pattern.name}</h3>
                    <p><strong>Direction:</strong> {pattern.direction}</p>
                    {pattern.consistency && (
                      <p><strong>Consistency:</strong> {pattern.consistency}</p>
                    )}
                    {pattern.description && <p>{pattern.description}</p>}
                  </div>
                ))
              ) : (
                <p className="empty-message">No wave patterns available</p>
              )}
            </div>
          </section>

          <section className="dashboard-section">
            <h2>Bird Migrations</h2>
            <div className="pattern-list">
              {birdMigrations.length > 0 ? (
                birdMigrations.map((bird) => (
                  <div key={bird.id} className="pattern-card">
                    <h3>{bird.bird_name}</h3>
                    {bird.movement_direction && (
                      <p><strong>Direction:</strong> {bird.movement_direction}</p>
                    )}
                    {bird.indicator && (
                      <p><strong>Indicator:</strong> {bird.indicator}</p>
                    )}
                    {bird.description && <p>{bird.description}</p>}
                  </div>
                ))
              ) : (
                <p className="empty-message">No bird migrations available</p>
              )}
            </div>
          </section>
        </div>

        <div className="dashboard-actions">
          <Link to="/observations" className="btn btn-primary">
            View My Observations
          </Link>
          <Link to="/observations/new" className="btn btn-secondary">
            Create New Observation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
