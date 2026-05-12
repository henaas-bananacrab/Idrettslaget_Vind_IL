const express = require('express');
const router = express.Router();
const { createPlayerHandler, getPlayersByTeamHandler, deletePlayerHandler } = require('../controller/playerController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// POST create a player
router.post('/players', authenticateToken, authorizeRoles("admin"), createPlayerHandler);

// GET all players by team ID
router.get('/teams/:team_id/players', getPlayersByTeamHandler);

// DELETE a player
router.delete('/players/:player_id', authenticateToken, authorizeRoles("admin"), deletePlayerHandler);

module.exports = router;
