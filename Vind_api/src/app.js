const dotenv = require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const userRoutes = require('./v1.0.0/routes/userRoutes');
const teamRoutes = require('./v1.0.0/routes/teamRoutes');
const playerRoutes = require('./v1.0.0/routes/playerRoutes');
const matchRoutes = require('./v1.0.0/routes/matchRoutes');
const contactRoutes = require('./v1.0.0/routes/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', teamRoutes);
app.use('/api/v1', playerRoutes);
app.use('/api/v1', matchRoutes);
app.use('/api/v1', contactRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;