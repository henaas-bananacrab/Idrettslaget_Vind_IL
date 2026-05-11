const express = require('express');
const router = express.Router();
const { createPlayerHandler, getPlayersByTeamHandler, deletePlayerHandler } = require('../controller/playerController');

// POST create a player
router.post('/players', createPlayerHandler);

// GET all players by team ID
router.get('/teams/:team_id/players', getPlayersByTeamHandler);

// DELETE a player
router.delete('/players/:player_id', deletePlayerHandler);

module.exports = router;
