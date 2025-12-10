import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StarryBackground from '../components/StarryBackground';
import Compass from '../components/Compass';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <StarryBackground />

      <div className="home-content">
        <h1 className="app-title">BlueStar</h1>
        <p className="app-subtitle">Micronesian Wayfinding Navigator</p>

        <Compass size={660} />

        <p className="app-description">
          Navigate the seas using ancient wisdom. Track star patterns, wave movements,
          and bird migrations to find your way across the vast Pacific Ocean.
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
