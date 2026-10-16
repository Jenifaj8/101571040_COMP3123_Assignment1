/*
Purpose:
Define protected employee API routes.
*/

const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/EmployeeController");
const verifyToken = require("../middleware/AuthMiddleware");

// Require authentication for all employee routes
router.use(verifyToken);

// POST /api/v1/emp/employees
router.post("/employees", EmployeeController.createEmployee);

module.exports = router;