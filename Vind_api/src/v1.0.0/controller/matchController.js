const { getAllMatches, getMatchById, createMatch, updateMatchResult, deleteMatch } = require('../repositories/matchRepository');
const { getTeamById } = require('../repositories/teamRepository');

async function fetchAllMatches(req, res) {
    try {
        const matches = await getAllMatches();
        res.status(200).json({
            success: true,
            data: matches,
            message: 'Matches retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting matches:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving matches'
        });
    }
}

async function fetchMatchById(req, res) {
    try {
        const { match_id } = req.params;

        if (!match_id) {
            return res.status(400).json({
                success: false,
                message: 'match_id is required'
            });
        }

        const match = await getMatchById(match_id);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.status(200).json({
            success: true,
            data: match,
            message: 'Match retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting match:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving match'
        });
    }
}

async function addMatch(req, res) {
    try {
        const { team_id_1, team_id_2, time, result } = req.body;

        if (!team_id_1) {
            return res.status(400).json({
                success: false,
                message: 'team_id_1 is required'
            });
        }

        if (!team_id_2) {
            return res.status(400).json({
                success: false,
                message: 'team_id_2 is required'
            });
        }

        if (!time) {
            return res.status(400).json({
                success: false,
                message: 'time is required'
            });
        }

        const team1 = await getTeamById(team_id_1);
        if (!team1) {
            return res.status(404).json({
                success: false,
                message: 'Team with team_id_1 not found'
            });
        }

        const team2 = await getTeamById(team_id_2);
        if (!team2) {
            return res.status(404).json({
                success: false,
                message: 'Team with team_id_2 not found'
            });
        }

        const matchId = await createMatch(team_id_1, team_id_2, time, result || null);
        res.status(201).json({
            success: true,
            data: { match_id: matchId, team_id_1, team_id_2, time, result: result || null },
            message: 'Match created successfully'
        });
        console.log('Match created successfully:', { match_id: matchId, team_id_1, team_id_2, time, result: result || null });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating match'
        });
    }
}

async function updateMatchHandler(req, res) {
    try {
        const { match_id } = req.params;
        const { result } = req.body;

        if (!match_id) {
            return res.status(400).json({
                success: false,
                message: 'match_id is required'
            });
        }

        if (result === undefined || result === null || result === '') {
            return res.status(400).json({
                success: false,
                message: 'result is required'
            });
        }

        const match = await getMatchById(match_id);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        await updateMatchResult(match_id, result);
        const updatedMatch = await getMatchById(match_id);

        res.status(200).json({
            success: true,
            data: updatedMatch,
            message: 'Match updated successfully'
        });
    } catch (error) {
        console.error('Error updating match:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating match'
        });
    }
}

async function deleteMatchHandler(req, res) {
    try {
        const { match_id } = req.params;

        if (!match_id) {
            return res.status(400).json({
                success: false,
                message: 'match_id is required'
            });
        }

        const match = await getMatchById(match_id);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        await deleteMatch(match_id);
        res.status(200).json({
            success: true,
            message: 'Match deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting match:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting match'
        });
    }
}

module.exports = {
    fetchAllMatches,
    fetchMatchById,
    addMatch,
    updateMatchHandler,
    deleteMatchHandler
};
