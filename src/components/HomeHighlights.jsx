import React, { useMemo } from "react";

const QUOTES = [
  {
    text: "The ocean is our highway. The stars are our map.",
    source: "Micronesian Wayfinding Proverb",
  },
  {
    text: "A navigator carries the islands in his mind.",
    source: "Carolinian Navigation Teaching",
  },
  {
    text: "Even when clouds hide the stars, the waves remember the way.",
    source: "Pacific Seafaring Wisdom",
  },
  {
    text: "To know the wind and waves is to know your place in the world.",
    source: "Island Navigator Saying",
  },
];

export default function HomeHighlights() {
  // Pick a quote once per render (simple version)
  const todaysQuote = useMemo(() => {
    const index = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[index];
  }, []);

  return (
    <section className="home-highlights">
      {/* Quote of the Day (Option D) */}
      <div className="quote-card">
        <h2 className="section-title">Quote of the Day</h2>
        <p className="quote-text">“{todaysQuote.text}”</p>
        <p className="quote-source">— {todaysQuote.source}</p>
      </div>

      {/* Feature Sections with Icons (Option C) */}
      <div className="feature-grid">
        {/* Navigation Notes */}
        <article className="feature-card">
          <span className="feature-icon">🧭</span>
          <h3 className="feature-title">Navigation Notes</h3>
          <ul className="feature-list">
            <li>The ocean, wind, and sky work together as a living compass.</li>
            <li>Micronesian navigators memorize routes using stars and swells.</li>
            <li>Even without instruments, a trained palu can hold course by feel.</li>
          </ul>
        </article>

        {/* Star Facts */}
        <article className="feature-card">
          <span className="feature-icon">🌟</span>
          <h3 className="feature-title">Star Wisdom</h3>
          <ul className="feature-list">
            <li>Stars rise and set in fixed bands across the horizon.</li>
            <li>Polaris stays almost fixed in the northern sky.</li>
            <li>The Southern Cross helps navigators find true south.</li>
          </ul>
        </article>

        {/* Bird Migration */}
        <article className="feature-card">
          <span className="feature-icon">🐦</span>
          <h3 className="feature-title">Bird Migration</h3>
          <ul className="feature-list">
            <li>Frigate birds avoid landing on the water, so they stay close to land.</li>
            <li>Low-flying birds at dawn or dusk can signal nearby islands.</li>
            <li>Traditional voyagers watched flight paths to confirm direction.</li>
          </ul>
        </article>

        {/* Wave Patterns */}
        <article className="feature-card">
          <span className="feature-icon">🌊</span>
          <h3 className="feature-title">Wave Patterns</h3>
          <ul className="feature-list">
            <li>Primary swells often come from a steady, predictable direction.</li>
            <li>Islands reflect waves, creating backwash patterns felt by canoes.</li>
            <li>Crossing swells reveal where two ocean systems intersect.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
