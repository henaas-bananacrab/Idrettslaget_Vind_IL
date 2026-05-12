import { Link } from 'react-router-dom';

export default function PublicHomePage() {
  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Velkommen til Vind IL</h1>
          <p className="hero-description">
            Idrettslaget Vind IL arrangerer lokale turneringer i flere idretter.
            Her kan du se kampoppsett, resultater og laginformasjon.
          </p>
          <div className="hero-actions">
            <Link to="/kamper" className="button button-primary">
              Se Kamper
            </Link>
            <Link to="/lag" className="button button-secondary">
              Se Lag
            </Link>
            <Link to="/admin" className="button button-outline">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Kampoppsett</h3>
            <p>Se alle kommende kamper og resultater fra tidligere kamper.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Lag og Spillere</h3>
            <p>Få oversikt over alle lag og deres registrerte spillere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Turneringer</h3>
            <p>Følg med på lokale turneringer i flere forskjellige idretter.</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h3>Om Vind IL</h3>
          <p>
            Idrettslaget Vind IL har som mål å gjøre det enklere å administrere turneringer
            og gi deltakerne tilgang til viktig informasjon på ett sted. Vi jobber kontinuerlig
            med å forbedre systemet for å gjøre opplevelsen bedre for alle involverte.
          </p>
        </div>
      </div>
    </div>
  );
}
