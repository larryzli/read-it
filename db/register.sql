INSERT INTO users (username, name, password, email, birthday) 
VALUES ($1, $2, $3, $4, $5);
SELECT * FROM users WHERE email = $4 AND password = $3;