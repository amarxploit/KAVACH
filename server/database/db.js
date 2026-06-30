const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool({
    connectionString: config.databaseUrl,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
    console.error('Unexpected database client error on idle connection:', err.message);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
    verifyConnection: async () => {
        const client = await pool.connect();
        try {
            await client.query('SELECT 1');
        } finally {
            client.release();
        }
    }
};
