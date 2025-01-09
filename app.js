const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const DBConnection = require('./db/db');
const userRoutes = require('./routes/user.routes');
const accountRoutes = require('./routes/account.routes');
const transactionRoutes = require('./routes/transaction.routes');
// const {connectToDatabase} = require('./scripts/db');

dotenv.config();
const app = express();
DBConnection.createDBConnection();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());



// Routes
app.use('/api/users', userRoutes);


app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'An error occurred!' });
});


module.exports = app;