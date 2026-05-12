import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { matchApi } from '../services/api';

export default function PublicMatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await matchApi.fetchAllMatches();
      const matchesData = response.data?.data || response.data || [];
      setMatches(Array.isArray(matchesData) ? matchesData : []);
    } catch (err) {
      setError('Failed to load matches');
      console.error('Error fetching matches:', err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('no-NO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMatchStatus = (match) => {
    const now = new Date();
    const matchTime = new Date(match.time);

    if (match.result) {
      return { status: 'completed', text: 'Fullført' };
    } else if (matchTime > now) {
      return { status: 'upcoming', text: 'Kommende' };
    } else {
      return { status: 'pending', text: 'Pågår' };
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="header-row">
          <div>
            <h1>Kamper</h1>
            <p className="page-description">Se alle kamper og resultater</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>Laster kamper...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="header-row">
          <div>
            <h1>Kamper</h1>
            <p className="page-description">Se alle kamper og resultater</p>
          </div>
        </div>
        <div className="empty-state">
          <p>{error}</p>
          <button onClick={fetchMatches} className="button button-primary">
            Prøv igjen
          </button>
        </div>
      </div>
    );
  }

  const upcomingMatches = matches.filter(match => !match.result && new Date(match.time) > new Date());
  const completedMatches = matches.filter(match => match.result);
  const recentMatches = matches.filter(match => !match.result && new Date(match.time) <= new Date());

  return (
    <div className="page">
      <div className="header-row">
        <div>
          <h1>Kamper</h1>
          <p className="page-description">Se alle kamper og resultater for Vind IL</p>
        </div>
        <Link to="/admin" className="button button-secondary">
          Admin Panel
        </Link>
      </div>

      {upcomingMatches.length > 0 && (
        <div className="section">
          <h2>Kommende kamper</h2>
          <div className="grid">
            {upcomingMatches.map(match => {
              const status = getMatchStatus(match);
              return (
                <div key={match.id || match.match_id} className="card">
                  <div className="card-header">
                    <h3>{match.team_name_1} vs {match.team_name_2}</h3>
                    <span className={`badge ${status.status}`}>{status.text}</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Dato:</strong> {formatDate(match.time)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {recentMatches.length > 0 && (
        <div className="section">
          <h2>Nylige kamper</h2>
          <div className="grid">
            {recentMatches.map(match => {
              const status = getMatchStatus(match);
              return (
                <div key={match.id || match.match_id} className="card">
                  <div className="card-header">
                    <h3>{match.team_name_1} vs {match.team_name_2}</h3>
                    <span className={`badge ${status.status}`}>{status.text}</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Dato:</strong> {formatDate(match.time)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {completedMatches.length > 0 && (
        <div className="section">
          <h2>Fullførte kamper</h2>
          <div className="grid">
            {completedMatches.map(match => {
              const status = getMatchStatus(match);
              return (
                <div key={match.id || match.match_id} className="card">
                  <div className="card-header">
                    <h3>{match.team_name_1} vs {match.team_name_2}</h3>
                    <span className={`badge ${status.status}`}>{status.text}</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Dato:</strong> {formatDate(match.time)}</p>
                    <p><strong>Resultat:</strong> {match.result}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {matches.length === 0 && (
        <div className="empty-state">
          <h3>Ingen kamper planlagt ennå</h3>
          <p>Sjekk tilbake senere for oppdateringer.</p>
        </div>
      )}
    </div>
  );
}
