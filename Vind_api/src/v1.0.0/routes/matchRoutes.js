const express = require('express');
const router = express.Router();
const { fetchAllMatches, fetchMatchById, addMatch, updateMatchHandler, deleteMatchHandler } = require('../controller/matchController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// GET all matches
router.get('/matches', fetchAllMatches);

// GET match by ID
router.get('/matches/:match_id', fetchMatchById);

// POST create a match
router.post('/matches', authenticateToken, authorizeRoles("admin"), addMatch);

// PUT update match result
router.put('/matches/:match_id', authenticateToken, authorizeRoles("admin"), updateMatchHandler);

// DELETE a match
router.delete('/matches/:match_id', authenticateToken, authorizeRoles("admin"), deleteMatchHandler);

module.exports = router;
