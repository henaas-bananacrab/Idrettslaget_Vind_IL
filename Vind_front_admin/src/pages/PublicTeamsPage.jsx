import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamApi, playerApi } from '../services/api';

export default function PublicTeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await teamApi.getAllTeams();
      const teamsData = response.data?.data || response.data || [];

      // Fetch players for each team
      const teamsWithPlayers = await Promise.all(
        (Array.isArray(teamsData) ? teamsData : []).map(async (team) => {
          try {
            const playersResponse = await playerApi.getPlayersByTeam(team.id || team.team_id);
            const playersData = playersResponse.data?.data || playersResponse.data || [];
            return { ...team, players: Array.isArray(playersData) ? playersData : [] };
          } catch (err) {
            console.error(`Error fetching players for team ${team.id || team.team_id}:`, err);
            return { ...team, players: [] };
          }
        })
      );

      setTeams(teamsWithPlayers);
    } catch (err) {
      setError('Failed to load teams');
      console.error('Error fetching teams:', err);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="header-row">
          <div>
            <h1>Lag</h1>
            <p className="page-description">Se alle lag og spillere i Vind IL</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>Laster lag...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="header-row">
          <div>
            <h1>Lag</h1>
            <p className="page-description">Se alle lag og spillere i Vind IL</p>
          </div>
        </div>
        <div className="empty-state">
          <p>{error}</p>
          <button onClick={fetchTeams} className="button button-primary">
            Prøv igjen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="header-row">
        <div>
          <h1>Lag</h1>
          <p className="page-description">Se alle lag og deres spillere i Vind IL</p>
        </div>
        <Link to="/admin" className="button button-secondary">
          Admin Panel
        </Link>
      </div>

      {teams.length > 0 ? (
        <div className="grid">
          {teams.map(team => (
            <div key={team.id || team.team_id} className="card">
              <div className="card-header">
                <h3>{team.team_name}</h3>
                <span className="badge">
                  {team.players?.length || 0} {team.players?.length === 1 ? 'spiller' : 'spillere'}
                </span>
              </div>
              <div className="card-body">
                {team.players && team.players.length > 0 ? (
                  <div>
                    <p><strong>Spillere:</strong></p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {team.players.map(player => (
                        <div key={player.id || player.player_id} className="player-row">
                          <span>{player.player_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p><em>Ingen spillere registrert ennå</em></p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Ingen lag registrert ennå</h3>
          <p>Lag vil vises her når de blir opprettet.</p>
        </div>
      )}
    </div>
  );
}
