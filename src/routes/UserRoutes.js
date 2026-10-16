/*
Purpose:
Define API routes for user registration.
*/

const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// POST /api/v1/user/signup
router.post("/signup", UserController.signup);

module.exports = router;