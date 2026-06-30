const validatePharmacyCreate = (req, res, next) => {
    const { name, latitude, longitude, phone } = req.body;
    if (!name || latitude === undefined || longitude === undefined || !phone) {
        return res.status(400).json({ success: false, message: "Pharmacy name, GPS coordinates, and contact phone are required." });
    }
    next();
};

const validatePharmacyNearby = (req, res, next) => {
    const { latitude, longitude, radius } = req.query;
    if (latitude === undefined || longitude === undefined || radius === undefined) {
        return res.status(400).json({ success: false, message: "Coordinates (latitude, longitude) and search radius in meters are required." });
    }
    next();
};

module.exports = { validatePharmacyCreate, validatePharmacyNearby };
