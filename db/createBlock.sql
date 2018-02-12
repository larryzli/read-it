INSERT INTO block (creator_id, name, title, description, rules, age_restricted)
VALUES ($1, $2, $3, $4, $5, $6);
SELECT * FROM block WHERE creator_id = $1 AND name = $2 AND title = $3;