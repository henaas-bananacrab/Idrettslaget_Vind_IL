const db = require('../database/db');

async function getContactsByTeam(teamId) {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM contact WHERE team_id = ?',
            [teamId]
        );
        return rows;
    } catch (error) {
        console.error('Error getting contacts by team:', error);
        throw error;
    }
}

async function createContact(contactName, contactNumber, teamId) {
    try {
        const [result] = await db.execute(
            'INSERT INTO contact (contact_name, contact_number, team_id) VALUES (?, ?, ?)',
            [contactName, contactNumber, teamId]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
}

module.exports = {
    getContactsByTeam,
    createContact
};
