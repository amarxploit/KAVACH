/**
 * KAVACH - Authentication Validation Middleware
 * Ensures registration and login requests are complete and valid.
 */

const validateRegister = (req, res, next) => {
    const { full_name, phone, password, emergency_contact_name, emergency_contact_number } = req.body;
    const errors = [];

    if (!full_name || typeof full_name !== 'string' || full_name.trim() === '') {
        errors.push("Field 'full_name' is required.");
    }
    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
        errors.push("Field 'phone' is required.");
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        errors.push("Field 'password' is required.");
    }
    if (!emergency_contact_name || typeof emergency_contact_name !== 'string' || emergency_contact_name.trim() === '') {
        errors.push("Field 'emergency_contact_name' is required.");
    }
    if (!emergency_contact_number || typeof emergency_contact_number !== 'string' || emergency_contact_number.trim() === '') {
        errors.push("Field 'emergency_contact_number' is required.");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            error: errors.join(' ')
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { phone, password } = req.body;
    const errors = [];

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
        errors.push("Field 'phone' is required.");
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        errors.push("Field 'password' is required.");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            error: errors.join(' ')
        });
    }

    next();
};

module.exports = {
    validateRegister,
    validateLogin
};
