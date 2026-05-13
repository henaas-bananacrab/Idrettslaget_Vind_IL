const express = require('express');
const router = express.Router();
const {
    fetchContactsByTeam,
    addContact,
} = require('../controller/contactController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/teams/:team_id/contacts', fetchContactsByTeam);
router.post('/contacts', authenticateToken, authorizeRoles('admin'), addContact);

module.exports = router;
