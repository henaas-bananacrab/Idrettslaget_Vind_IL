const db = require('../database/db');

async function getAllTeams() {
    try {
        const [rows] = await db.execute('SELECT * FROM team');
        return rows;
    } catch (error) {
        console.error('Error getting all teams:', error);
        throw error;
    }
}

async function getTeamById(teamId) {
    try {
        const [rows] = await db.execute('SELECT * FROM team WHERE team_id = ?', [teamId]);
        return rows[0];
    } catch (error) {
        console.error('Error getting team by ID:', error);
        throw error;
    }
}

async function createTeam(teamName) {
    try {
        const [result] = await db.execute('INSERT INTO team (team_name) VALUES (?)', [teamName]);
        return result.insertId;
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
}

async function deleteTeam(teamId) {
    try {
        const [result] = await db.execute('DELETE FROM team WHERE team_id = ?', [teamId]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting team:', error);
        throw error;
    }
}

module.exports = {
    getAllTeams,
    getTeamById,
    createTeam,
    deleteTeam
};
