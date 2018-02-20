DELETE FROM filter WHERE id = $1;
SELECT * FROM filter WHERE auth_id = $2;