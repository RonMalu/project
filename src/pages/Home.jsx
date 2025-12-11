import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StarryBackground from '../components/StarryBackground';
import { HomeHighlights } from '../components/HomeHighlights';

import Compass from '../components/Compass';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <StarryBackground />
      <HomeHighlights />

      <div className="home-content">
        <h1 className="app-title">BlueStar</h1>
        <p className="app-subtitle">Micronesian Wayfinding Navigator</p>

        <Compass size={660} />

        <p className="app-description">
          For anyone drawn to the stars, the waves, and the wisdom behind them.
        </p>

        <div className="home-actions">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-primary">
                View Dashboard
              </Link>
              <Link to="/observations" className="btn btn-secondary">
                My Observations
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
