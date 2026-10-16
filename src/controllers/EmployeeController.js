/*
Purpose:
Handle employee management operations.
*/

const mongoose = require("mongoose");
const EmployeeModel = require("../models/EmployeeModel");

// CREATE EMPLOYEE
const createEmployee = async (request, response) => {
    try {
        const {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        } = request.body;

        // Validate required string fields
        const fields = [
            first_name,
            last_name,
            email,
            position,
            department
        ];

        if (fields.some(field =>
            typeof field !== "string" ||
            !field.trim() ||
            field.trim().length > 100
        )) {
            return response.status(400).json({
                message: "Employee text fields are required and must be valid"
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim()) || email.length > 254) {
            return response.status(400).json({
                message: "Invalid employee email"
            });
        }

        // Validate salary
        if (
            typeof salary !== "number" ||
            !Number.isFinite(salary) ||
            salary < 0
        ) {
            return response.status(400).json({
                message: "Salary must be a valid non-negative number"
            });
        }

        // Validate date
        if (
            typeof date_of_joining !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(date_of_joining) ||
            Number.isNaN(Date.parse(date_of_joining)) ||
            new Date(date_of_joining).toISOString().slice(0, 10) !== date_of_joining
        ) {
            return response.status(400).json({
                message: "Date of joining must be a valid YYYY-MM-DD date"
            });
        }

        // Create employee for authenticated user
        const employee = new EmployeeModel({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
            user: request.user.id
        });

        const savedEmployee = await employee.save();

        return response.status(201).json({
            message: "Employee created successfully",
            employee: savedEmployee
        });

    } catch (error) {
        console.error("Create employee error:", error.message);

        return response.status(500).json({
            message: "An error occurred while creating employee"
        });
    }
};


// GET ALL EMPLOYEES
const getAllEmployees = async (request, response) => {
    try {
        const employees = await EmployeeModel.find({
            user: request.user.id
        });

        return response.status(200).json({
            message: "Employees retrieved successfully",
            employees: employees
        });

    } catch (error) {
        console.error("Get employees error:", error.message);

        return response.status(500).json({
            message: "An error occurred while retrieving employees"
        });
    }
};


// GET EMPLOYEE BY ID
const getEmployeeById = async (request, response) => {
    try {
        const employeeId = request.params.id;

        // Validate MongoDB ObjectId
        if (!mongoose.isValidObjectId(employeeId)) {
            return response.status(400).json({
                message: "Invalid employee ID"
            });
        }

        // Find employee belonging to authenticated user
        const employee = await EmployeeModel.findOne({
            _id: employeeId,
            user: request.user.id
        });

        if (!employee) {
            return response.status(404).json({
                message: "Employee not found"
            });
        }

        return response.status(200).json({
            message: "Employee retrieved successfully",
            employee: employee
        });

    } catch (error) {
        console.error("Get employee error:", error.message);

        return response.status(500).json({
            message: "An error occurred while retrieving employee"
        });
    }
};


// Export controller functions
module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById
};