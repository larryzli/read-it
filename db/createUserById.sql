INSERT INTO users (auth_id) VALUES ($1);
SELECT * FROM users WHERE auth_id = $1;