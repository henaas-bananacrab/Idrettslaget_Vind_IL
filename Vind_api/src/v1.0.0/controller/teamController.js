const { getAllTeams, getTeamById, createTeam, deleteTeam } = require('../repositories/teamRepository');

async function getAllTeamsHandler(req, res) {
    try {
        const teams = await getAllTeams();
        res.status(200).json({
            success: true,
            data: teams,
            message: 'Teams retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting teams:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving teams'
        });
    }
}

async function createTeamHandler(req, res) {
    try {
        const { team_name } = req.body;

        if (!team_name || team_name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'team_name is required'
            });
        }

        const teamId = await createTeam(team_name);
        res.status(201).json({
            success: true,
            data: { team_id: teamId, team_name },
            message: 'Team created successfully'
        });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating team'
        });
    }
}

async function deleteTeamHandler(req, res) {
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

        await deleteTeam(team_id);
        res.status(200).json({
            success: true,
            message: 'Team deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting team'
        });
    }
}

module.exports = {
    getAllTeamsHandler,
    createTeamHandler,
    deleteTeamHandler
};
