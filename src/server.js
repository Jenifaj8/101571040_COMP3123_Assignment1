/*
Purpose:
Set up the Express server, middleware,
MongoDB connection and API routes.
*/

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

const connectDB = require("./config/db");
const UserRoutes = require("./routes/UserRoutes");
const EmployeeRoutes = require("./routes/EmployeeRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// API routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/emp", EmployeeRoutes);

// Server port
const PORT = process.env.PORT || 8081;

// Start server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();