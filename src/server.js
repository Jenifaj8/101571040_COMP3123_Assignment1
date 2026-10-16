/*
Purpose:
Set up the Express server for Assignment 1
Configure middleware, connect to MongoDB, and define the server port
*/

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Set server port
const PORT = process.env.PORT || 8081;

// Connect to MongoDB and start the server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();