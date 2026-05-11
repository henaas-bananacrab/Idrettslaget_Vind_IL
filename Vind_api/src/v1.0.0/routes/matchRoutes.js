const express = require('express');
const router = express.Router();
const { getAllMatchesHandler, getMatchByIdHandler, createMatchHandler, updateMatchHandler, deleteMatchHandler } = require('../controller/matchController');

// GET all matches
router.get('/matches', getAllMatchesHandler);

// GET match by ID
router.get('/matches/:match_id', getMatchByIdHandler);

// POST create a match
router.post('/matches', createMatchHandler);

// PUT update match result
router.put('/matches/:match_id', updateMatchHandler);

// DELETE a match
router.delete('/matches/:match_id', deleteMatchHandler);

module.exports = router;
