const db = require('../database/db');

async function getAllPlayers() {
    try {
        const [rows] = await db.execute('SELECT * FROM player');
        return rows;
    } catch (error) {
        console.error('Error getting all players:', error);
        throw error;
    }
}

async function getPlayerById(playerId) {
    try {
        const [rows] = await db.execute('SELECT * FROM player WHERE player_id = ?', [playerId]);
        return rows[0];
    } catch (error) {
        console.error('Error getting player by ID:', error);
        throw error;
    }
}

async function getPlayersByTeamId(teamId) {
    try {
        const [rows] = await db.execute('SELECT * FROM player WHERE team_id = ?', [teamId]);
        return rows;
    } catch (error) {
        console.error('Error getting players by team ID:', error);
        throw error;
    }
}

async function createPlayer(playerName, teamId) {
    try {
        const [result] = await db.execute(
            'INSERT INTO player (player_name, team_id) VALUES (?, ?)',
            [playerName, teamId]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating player:', error);
        throw error;
    }
}

async function deletePlayer(playerId) {
    try {
        const [result] = await db.execute('DELETE FROM player WHERE player_id = ?', [playerId]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting player:', error);
        throw error;
    }
}

module.exports = {
    getAllPlayers,
    getPlayerById,
    getPlayersByTeamId,
    createPlayer,
    deletePlayer
};
