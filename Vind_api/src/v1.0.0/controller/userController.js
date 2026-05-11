const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const { loginUser, createUser } = require('../repositories/userRepository');

const saltRounds = 10;

async function register(req, res) {
    try {
        const { username, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await createUser(username, hashedPassword, role);
        res.status(201).json({ success: true, message: 'User registered successfully', data: result });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await loginUser(username);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Error logging in user' });
    }
}

module.exports = { register, login };