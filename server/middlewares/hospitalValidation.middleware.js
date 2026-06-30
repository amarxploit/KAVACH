const validateHospitalCreate = (req, res, next) => {
    const { name, latitude, longitude, phone } = req.body;
    if (!name || latitude === undefined || longitude === undefined || !phone) {
        return res.status(400).json({ success: false, message: "Hospital name, valid coordinates, and contact phone are required." });
    }
    next();
};

const validateHospitalNearby = (req, res, next) => {
    const { latitude, longitude, radius } = req.query;
    if (latitude === undefined || longitude === undefined || radius === undefined) {
        return res.status(400).json({ success: false, message: "Query parameters: latitude, longitude, and search radius in meters are required." });
    }
    next();
};

const validateResponderCreate = (req, res, next) => {
    const { name, profession, responder_code, latitude, longitude } = req.body;
    if (!name || !profession || !responder_code || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ success: false, message: "Incomplete details. Profession, Name, unique Responder Code, and GPS Coordinates are required." });
    }
    next();
};

const validateNearbySearch = (req, res, next) => {
    const { latitude, longitude, radius } = req.query;
    if (latitude === undefined || longitude === undefined || radius === undefined) {
        return res.status(400).json({ success: false, message: "Parameters: latitude, longitude, and radius are required." });
    }
    next();
};

module.exports = { validateHospitalCreate, validateHospitalNearby, validateResponderCreate, validateNearbySearch };
