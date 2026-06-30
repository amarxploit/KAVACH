/**
 * KAVACH - Authentication Repository
 * Interacts directly with Neon PostgreSQL for user registration and login management.
 */

const db = require('../database/db');

/**
 * Registers a new citizen user in the database.
 */
async function registerUser(data) {
    const checkQuery = 'SELECT id FROM users WHERE phone = $1;';
    const checkRes = await db.query(checkQuery, [data.phone]);
    
    if (checkRes.rows.length > 0) {
        throw new Error("Phone number is already registered.");
    }

    const query = `
        INSERT INTO users (full_name, phone, password_hash, emergency_contact_name, emergency_contact_number, role)
        VALUES ($1, $2, $3, $4, $5, 'citizen')
        RETURNING id, full_name, phone, emergency_contact_name, emergency_contact_number, role;
    `;
    const values = [
        data.full_name,
        data.phone,
        data.password, // Plain text storage for demo purposes
        data.emergency_contact_name,
        data.emergency_contact_number
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
}

/**
 * Validates credentials and retrieves user details from the database.
 */
async function validateCredentials(phone, password) {
    const query = `
        SELECT id, full_name, phone, password_hash, emergency_contact_name, emergency_contact_number, role
        FROM users
        WHERE phone = $1;
    `;
    const { rows } = await db.query(query, [phone]);
    
    if (rows.length === 0) return null;

    const user = rows[0];
    
    // Compare plain-text passwords for demo purposes
    if (user.password_hash !== password) {
        return null;
    }

    return {
        id: user.id,
        full_name: user.full_name,
        phone: user.phone,
        emergency_contact_name: user.emergency_contact_name,
        emergency_contact_number: user.emergency_contact_number,
        role: user.role
    };
}

module.exports = {
    registerUser,
    validateCredentials
};
