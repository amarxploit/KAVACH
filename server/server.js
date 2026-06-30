const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const db = require('./database/db');

// Route Imports
const healthRoutes = require('./routes/health.routes');
const incidentRoutes = require('./routes/incident.routes');
const responderRoutes = require('./routes/responder.routes');
const hospitalRoutes = require('./routes/hospital.routes');
const pharmacyRoutes = require('./routes/pharmacy.routes');
const missionRoutes = require('./routes/mission.routes');
const notificationRoutes = require('./routes/notification.routes');
const authRoutes = require('./routes/auth.routes'); // NEW

const app = express();

app.use(helmet());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'x-user-id',
        'x-user-role'
    ]
}));

app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use(express.json());

// API Base Endpoints Registration
app.use('/api/health', healthRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/responders', responderRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth', authRoutes); // NEW

const PORT = config.port;

const startServer = async () => {
    try {
        await db.verifyConnection();
        console.log('✓ Connected to Neon PostgreSQL');

        app.listen(PORT, () => {
            console.log(
                `[KAVACH SERVER] Operational in ${config.nodeEnv} mode on port ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            '✗ Database Connection Failure on Startup:',
            error.message
        );
        process.exit(1);
    }
};

startServer();
