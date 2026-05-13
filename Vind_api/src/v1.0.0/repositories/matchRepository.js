const db = require('../database/db');

async function getAllMatches() {
    try {
        const [rows] = await db.execute(`
            SELECT 
                m.*,
                t1.team_name AS team_name_1,
                t2.team_name AS team_name_2
            FROM \`match\` m
            JOIN team t1 ON m.team_id_1 = t1.team_id
            JOIN team t2 ON m.team_id_2 = t2.team_id
        `);
        return rows;
    } catch (error) {
        console.error('Error getting all matches:', error);
        throw error;
    }
}
async function getUpcomingMatches() {
    try {
        const [rows] = await db.execute(`
            SELECT
                m.*,
                t1.team_name AS team_name_1,
                t2.team_name AS team_name_2
            FROM \`match\` m
            JOIN team t1 ON m.team_id_1 = t1.team_id
            JOIN team t2 ON m.team_id_2 = t2.team_id
            WHERE m.time > NOW()
              AND m.time <= DATE_ADD(NOW(), INTERVAL 48 HOUR)
            ORDER BY m.time ASC
        `);
        return rows;
    } catch (error) {
        console.error('Error getting upcoming matches:', error);
        throw error;
    }
}
async function getMatchById(matchId) {
    try {
        const [rows] = await db.execute(`
            SELECT 
                m.*,
                t1.team_name AS team_name_1,
                t2.team_name AS team_name_2
            FROM \`match\` m
            JOIN team t1 ON m.team_id_1 = t1.team_id
            JOIN team t2 ON m.team_id_2 = t2.team_id
            WHERE m.match_id = ?
        `, [matchId]);
        return rows[0];
    } catch (error) {
        console.error('Error getting match by ID:', error);
        throw error;
    }
}

async function createMatch(teamId1, teamId2, time, result) {
    try {
        const [resultData] = await db.execute(
            'INSERT INTO `match` (team_id_1, team_id_2, time, result) VALUES (?, ?, ?, ?)',
            [teamId1, teamId2, time, result || null]
        );
        return resultData.insertId;
    } catch (error) {
        console.error('Error creating match:', error);
        throw error;
    }
}

async function updateMatchResult(matchId, result) {
    try {
        const [resultData] = await db.execute(
            'UPDATE `match` SET result = ? WHERE match_id = ?',
            [result, matchId]
        );
        return resultData.affectedRows > 0;
    } catch (error) {
        console.error('Error updating match result:', error);
        throw error;
    }
}

async function deleteMatch(matchId) {
    try {
        const [result] = await db.execute('DELETE FROM `match` WHERE match_id = ?', [matchId]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting match:', error);
        throw error;
    }
}

module.exports = {
    getAllMatches,
    getMatchById,
    createMatch,
    updateMatchResult,
    deleteMatch,
    getUpcomingMatches
};
