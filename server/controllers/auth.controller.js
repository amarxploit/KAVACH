/**
 * KAVACH - Auth Controller
 * Coordinates HTTP login and register actions.
 */

const authRepo = require('../repositories/auth.repository');

const handleRegister = async (req, res) => {
    try {
        const user = await authRepo.registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: user
        });
    } catch (error) {
        if (error.message.includes("already registered")) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "Registration failed.",
            error: error.message
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await authRepo.validateCredentials(phone, password);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone number or password."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Authentication successful.",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication error occurred.",
            error: error.message
        });
    }
};

module.exports = {
    handleRegister,
    handleLogin
};
