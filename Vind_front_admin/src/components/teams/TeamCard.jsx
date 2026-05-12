import { useState, useEffect } from 'react';
import { teamApi, playerApi } from '../../services/api';
import AddNewPlayer from './AddNewPlayer';

function TeamCard({ team, refreshTeams }) {
    const [players, setPlayers] = useState([]);
    const [showPlayers, setShowPlayers] = useState(false);

    const handleDeleteTeam = async () => {
        if (!window.confirm('Delete this team and its roster?')) {
            return;
        }

        try {
            await teamApi.deleteTeam(team.team_id);
            refreshTeams();
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Unable to delete team. Please try again.');
        }
    };

    const handleDeletePlayer = async (playerId) => {
        if (!window.confirm('Remove this player from the team?')) {
            return;
        }

        try {
            await playerApi.deletePlayer(playerId);
            fetchPlayers();
        } catch (error) {
            console.error('Error deleting player:', error);
            alert('Unable to remove player. Please try again.');
        }
    };

    const fetchPlayers = async () => {
        try {
            const response = await playerApi.getPlayersByTeam(team.team_id);
            const playersData = response.data?.data || response.data || [];
            setPlayers(Array.isArray(playersData) ? playersData : []);
        } catch (error) {
            console.error('Error fetching players:', error);
            setPlayers([]);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, [team.team_id]);

    return (
        <div className="card">
            <div className="card-header">
                <h2>{team.team_name}</h2>
            </div>

            <div className="card-body">
                <h4>Players</h4>
                {players.length === 0 && <p className="subtext">No players registered yet.</p>}
                {players.map((player) => (
                    <div className="player-row" key={player.player_id}>
                        <span>{player.player_name}</span>
                        <button
                            className="button button-sm button-secondary"
                            type="button"
                            onClick={() => handleDeletePlayer(player.player_id)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="card-actions">
                <button className="button button-secondary" onClick={() => setShowPlayers(true)}>
                    Add New Player
                </button>
                <button className="button button-danger" onClick={handleDeleteTeam}>
                    Delete Team
                </button>
            </div>

            {showPlayers && (
                <AddNewPlayer
                    teamId={team.team_id}
                    onClose={() => setShowPlayers(false)}
                    refreshPlayers={fetchPlayers}
                />
            )}
        </div>
    );
}

export default TeamCard;