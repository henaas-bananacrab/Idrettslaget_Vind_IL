const express = require('express');
const router = express.Router();
const { getAllTeamsHandler, createTeamHandler, deleteTeamHandler } = require('../controller/teamController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// GET all teams
router.get('/teams', getAllTeamsHandler);

// POST create a team
router.post('/teams', authenticateToken, authorizeRoles("admin"), createTeamHandler);

// DELETE a team
router.delete('/teams/:team_id', authenticateToken, authorizeRoles("admin"), deleteTeamHandler);

module.exports = router;
