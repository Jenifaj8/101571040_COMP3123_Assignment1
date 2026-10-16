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

// CREATE EMPLOYEE
router.post("/employees", EmployeeController.createEmployee);

// GET ALL EMPLOYEES
router.get("/employees", EmployeeController.getAllEmployees);

// GET EMPLOYEE BY ID
router.get("/employees/:id", EmployeeController.getEmployeeById);

// UPDATE EMPLOYEE
router.put("/employees/:id", EmployeeController.updateEmployee);

// DELETE EMPLOYEE
router.delete("/employees/:id", EmployeeController.deleteEmployee);

module.exports = router;