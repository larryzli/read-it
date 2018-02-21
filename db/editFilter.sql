UPDATE filter SET filter_name = $2 WHERE id = $1;
SELECT * FROM filter WHERE auth_id = $3;