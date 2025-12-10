import { useState, useEffect } from 'react';
import '../styles/Compass.css';

const Compass = ({ size = 200 }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="compass-container" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="compass-svg">
        <g transform={`rotate(${rotation} 100 100)`}>
          <path
            d="M 100 10 L 105 95 L 100 100 L 95 95 Z"
            fill="rgba(40, 30, 20, 0.15)"
            stroke="rgba(20, 15, 10, 0.8)"
            strokeWidth="1.5"
          />
          <path
            d="M 100 190 L 105 105 L 100 100 L 95 105 Z"
            fill="rgba(40, 30, 20, 0.15)"
            stroke="rgba(20, 15, 10, 0.8)"
            strokeWidth="1.5"
          />
          <path
            d="M 190 100 L 105 105 L 100 100 L 105 95 Z"
            fill="rgba(40, 30, 20, 0.15)"
            stroke="rgba(20, 15, 10, 0.8)"
            strokeWidth="1.5"
          />
          <path
            d="M 10 100 L 95 105 L 100 100 L 95 95 Z"
            fill="rgba(40, 30, 20, 0.15)"
            stroke="rgba(20, 15, 10, 0.8)"
            strokeWidth="1.5"
          />

          <path
            d="M 163.64 36.36 L 104 96 L 100 100 L 96 96 Z"
            fill="rgba(40, 30, 20, 0.1)"
            stroke="rgba(20, 15, 10, 0.6)"
            strokeWidth="1"
          />
          <path
            d="M 36.36 36.36 L 96 96 L 100 100 L 96 104 Z"
            fill="rgba(40, 30, 20, 0.1)"
            stroke="rgba(20, 15, 10, 0.6)"
            strokeWidth="1"
          />
          <path
            d="M 36.36 163.64 L 96 104 L 100 100 L 104 104 Z"
            fill="rgba(40, 30, 20, 0.1)"
            stroke="rgba(20, 15, 10, 0.6)"
            strokeWidth="1"
          />
          <path
            d="M 163.64 163.64 L 104 104 L 100 100 L 104 96 Z"
            fill="rgba(40, 30, 20, 0.1)"
            stroke="rgba(20, 15, 10, 0.6)"
            strokeWidth="1"
          />
        </g>

        <text x="100" y="25" textAnchor="middle" fill="rgba(60, 50, 40, 0.95)" fontSize="24" fontWeight="bold" fontFamily="serif">
          N
        </text>
        <text x="175" y="107" textAnchor="middle" fill="rgba(60, 50, 40, 0.85)" fontSize="20" fontWeight="bold" fontFamily="serif">
          E
        </text>
        <text x="100" y="185" textAnchor="middle" fill="rgba(60, 50, 40, 0.85)" fontSize="20" fontWeight="bold" fontFamily="serif">
          S
        </text>
        <text x="25" y="107" textAnchor="middle" fill="rgba(60, 50, 40, 0.85)" fontSize="20" fontWeight="bold" fontFamily="serif">
          W
        </text>

        <circle cx="100" cy="100" r="4" fill="rgba(40, 30, 20, 0.9)" stroke="rgba(20, 15, 10, 1)" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default Compass;
