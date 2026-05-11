const { createPlayer, getPlayersByTeamId, deletePlayer, getPlayerById } = require('../repositories/playerRepository');
const { getTeamById } = require('../repositories/teamRepository');

async function createPlayerHandler(req, res) {
    try {
        const { player_name, team_id } = req.body;

        if (!player_name || player_name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'player_name is required'
            });
        }

        if (!team_id) {
            return res.status(400).json({
                success: false,
                message: 'team_id is required'
            });
        }

        const team = await getTeamById(team_id);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }

        const playerId = await createPlayer(player_name, team_id);
        res.status(201).json({
            success: true,
            data: { player_id: playerId, player_name, team_id },
            message: 'Player created successfully'
        });
    } catch (error) {
        console.error('Error creating player:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating player'
        });
    }
}

async function getPlayersByTeamHandler(req, res) {
    try {
        const { team_id } = req.params;

        if (!team_id) {
            return res.status(400).json({
                success: false,
                message: 'team_id is required'
            });
        }

        const team = await getTeamById(team_id);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }

        const players = await getPlayersByTeamId(team_id);
        res.status(200).json({
            success: true,
            data: players,
            message: 'Players retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting players:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving players'
        });
    }
}

async function deletePlayerHandler(req, res) {
    try {
        const { player_id } = req.params;

        if (!player_id) {
            return res.status(400).json({
                success: false,
                message: 'player_id is required'
            });
        }

        const player = await getPlayerById(player_id);
        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        await deletePlayer(player_id);
        res.status(200).json({
            success: true,
            message: 'Player deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting player:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting player'
        });
    }
}

module.exports = {
    createPlayerHandler,
    getPlayersByTeamHandler,
    deletePlayerHandler
};
