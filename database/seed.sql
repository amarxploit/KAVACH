-- ==============================================================================
-- KAVACH PLATFORM - SEED DATA (JAMSHEDPUR)
-- Sets up core emergency infrastructure nodes for testing.
-- ==============================================================================

INSERT INTO police_units (station_name, latitude, longitude, contact_number) VALUES
('Sakchi Police Station', 22.80370000, 86.19940000, '0657-2233100'),
('Bistupur Police Station', 22.79300000, 86.18340000, '0657-2244100'),
('Kadma Police Station', 22.79950000, 86.16630000, '0657-2255100');

INSERT INTO hospitals (name, latitude, longitude, capacity, has_trauma_center, contact_number, is_open, emergency_available) VALUES
('Tata Main Hospital (TMH)', 22.79540000, 86.17700000, 900, TRUE, '0657-6644000', TRUE, TRUE),
('MGM Medical College and Hospital', 22.80550000, 86.19720000, 500, TRUE, '0657-2233444', TRUE, TRUE),
('Mercy Hospital', 22.78450000, 86.23010000, 200, FALSE, '0657-2277888', TRUE, FALSE);

INSERT INTO pharmacies (name, latitude, longitude, is_open_24_7, contact_number, is_open, emergency_medicines_available) VALUES
('Apollo Pharmacy (Sakchi)', 22.80400000, 86.20000000, TRUE, '1860-500-0101', TRUE, TRUE),
('MedPlus (Bistupur)', 22.79400000, 86.18400000, FALSE, '0657-2321111', TRUE, TRUE),
('Wellness Forever (Kadma)', 22.79850000, 86.16700000, TRUE, '1800-209-1234', TRUE, TRUE);

DO $$ 
DECLARE
    officer_id UUID := '10000000-0000-0000-0000-000000000001';
    citizen_id UUID := '10000000-0000-0000-0000-000000000002';
    r_doctor_id UUID := '20000000-0000-0000-0000-000000000001';
    r_nurse_id UUID := '20000000-0000-0000-0000-000000000002';
    incident_id UUID := '30000000-0000-0000-0000-000000000001';
    mission_id UUID := '40000000-0000-0000-0000-000000000001';
BEGIN

    INSERT INTO users (id, role, full_name, phone, password_hash) VALUES 
    (officer_id, 'officer', 'Officer J. Miller', '9876543210', '$2b$10$placeholderpasswordhashforsecurity'),
    (citizen_id, 'citizen', 'Rahul Kumar', '9876543211', '$2b$10$placeholderpasswordhashforsecurity'),
    (r_doctor_id, 'responder', 'Dr. Sarah Gupta', '9876543212', '$2b$10$placeholderpasswordhashforsecurity'),
    (r_nurse_id, 'responder', 'Nurse Allen', '9876543213', '$2b$10$placeholderpasswordhashforsecurity')
    ON CONFLICT DO NOTHING;

    INSERT INTO verified_responders (id, user_id, responder_type, skills, verification_level, is_available) VALUES 
    ('20000000-0000-0000-0000-000000000001', r_doctor_id, 'Doctor', '{"First Aid", "Trauma Care", "CPR"}', 'Enterprise', TRUE),
    ('20000000-0000-0000-0000-000000000002', r_nurse_id, 'Nurse', '{"First Aid", "IV Admin"}', 'Level 2', TRUE)
    ON CONFLICT DO NOTHING;

    INSERT INTO gps_locations (user_id, latitude, longitude) VALUES 
    (r_doctor_id, 22.80500000, 86.20100000),
    (r_nurse_id, 22.79600000, 86.17800000)
    ON CONFLICT (user_id) DO UPDATE SET latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude;

    INSERT INTO incidents (id, reporter_id, incident_type, description, latitude, longitude, status) VALUES 
    (incident_id, citizen_id, 'Road Accident', '[Priority: High] Two-wheeler collision, male unresponsive.', 22.80370000, 86.19940000, 'Active')
    ON CONFLICT DO NOTHING;

    INSERT INTO missions (id, incident_id, officer_id, status) VALUES 
    (mission_id, incident_id, officer_id, 'Active')
    ON CONFLICT DO NOTHING;

    INSERT INTO mission_members (mission_id, responder_id, status, joined_at) VALUES 
    (mission_id, '20000000-0000-0000-0000-000000000001', 'Accepted', CURRENT_TIMESTAMP)
    ON CONFLICT DO NOTHING;

END $$;
