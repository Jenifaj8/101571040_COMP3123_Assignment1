/*
Purpose:
Handle user registration requests.
*/

const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const signup = async (request, response) => {
    try {
        const { username, email, password } = request.body;

        // Validate required fields
        if (
            typeof username !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !username.trim() ||
            !email.trim() ||
            !password
        ) {
            return response.status(400).json({
                message: "Username, email and password are required"
            });
        }

        const cleanUsername = username.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Validate username
        if (cleanUsername.length < 3 || cleanUsername.length > 30) {
            return response.status(400).json({
                message: "Username must contain 3 to 30 characters"
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
            return response.status(400).json({
                message: "Please enter a valid email address"
            });
        }

        // Validate password
        if (password.length < 8 || password.length > 72) {
            return response.status(400).json({
                message: "Password must contain 8 to 72 characters"
            });
        }

        // Check if username or email already exists
        const existingUser = await UserModel.findOne({
            $or: [
                { username: cleanUsername },
                { email: cleanEmail }
            ]
        });

        if (existingUser) {
            return response.status(409).json({
                message: "Username or email already exists"
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new UserModel({
            username: cleanUsername,
            email: cleanEmail,
            password: hashedPassword
        });

        const savedUser = await user.save();

        // Return user without password
        return response.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                created_at: savedUser.created_at
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return response.status(409).json({
                message: "Username or email already exists"
            });
        }

        console.error("Signup error:", error.message);

        return response.status(500).json({
            message: "An error occurred during registration"
        });
    }
};

module.exports = { signup };