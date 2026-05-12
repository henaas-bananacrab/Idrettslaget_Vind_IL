import { useState } from 'react'
import { matchApi } from '../../services/api'
import EditResultModal from './EditResultModal'

function MatchCard({ match, refreshMatches }) {
    const [showEdit, setShowEdit] = useState(false)

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this match?')) {
            return
        }

        try {
            await matchApi.deleteMatch(match.match_id)
            refreshMatches()
        } catch (error) {
            console.error('Error deleting match:', error)
            alert('Unable to delete match. Please try again.')
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <h3>Match #{match.match_id}</h3>
                <span className={`badge ${match.result ? 'finished' : 'pending'}`}>
                    {match.result ? 'Finished' : 'Pending'}
                </span>
            </div>

            <div className="card-body">
                <p>Team 1: {match.team_name_1}</p>
                <p>Team 2: {match.team_name_2}</p>
                <p>Time: {match.time}</p>
                <p>Result: {match.result || 'Pending'}</p>
            </div>

            <div className="card-actions">
                <button className="button button-secondary" onClick={() => setShowEdit(true)}>
                    Edit Result
                </button>
                <button className="button button-danger" onClick={handleDelete}>
                    Delete Match
                </button>
            </div>

            {showEdit && (
                <EditResultModal
                    match={match}
                    onClose={() => setShowEdit(false)}
                    refreshMatches={refreshMatches}
                />
            )}
        </div>
    );
}

export default MatchCard;