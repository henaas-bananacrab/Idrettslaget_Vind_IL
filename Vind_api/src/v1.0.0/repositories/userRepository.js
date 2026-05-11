const mysql = require('mysql2/promise');
const db = require('../database/db');

async function createUser(username, password, role) {
    try {
        const [results] = await db.execute('INSERT INTO user (username, password, role) VALUES (?, ?, ?)',
            [username, password, role]
        );

        return results.insertId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function loginUser(username) {
    try {
        const [rows] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);
        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    loginUser
};