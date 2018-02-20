INSERT INTO filter (filter_name, auth_id) VALUES ($1, $2);
SELECT * FROM filter WHERE auth_id = $2;