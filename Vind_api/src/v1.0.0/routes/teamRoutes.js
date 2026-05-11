const express = require('express');
const router = express.Router();
const { getAllTeamsHandler, createTeamHandler, deleteTeamHandler } = require('../controller/teamController');

// GET all teams
router.get('/teams', getAllTeamsHandler);

// POST create a team
router.post('/teams', createTeamHandler);

// DELETE a team
router.delete('/teams/:team_id', deleteTeamHandler);

module.exports = router;
