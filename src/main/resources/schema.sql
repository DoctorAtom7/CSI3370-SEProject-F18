CREATE TABLE IF NOT EXISTS member(
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	verified BOOLEAN DEFAULT 'n',
	create_date TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS password (
	member_id REFERENCES member(id) ON DELETE CASCADE,
	password VARCHAR(50) NOT NULL,
	salt VARCHAR(50) NOT NULL,
	change_date TIMESTAMP DEFAULT NULL
);