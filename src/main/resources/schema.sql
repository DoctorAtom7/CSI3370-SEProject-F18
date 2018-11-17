CREATE TABLE IF NOT EXISTS member(
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	verified BOOLEAN DEFAULT 'n',
	create_date TIMESTAMP DEFAULT now(),
	password_hash VARCHAR(100) NOT NULL,
	is_moderator BOOLEAN default 'n'
);

CREATE TABLE IF NOT EXISTS post(
	post_id SERIAL PRIMARY KEY,
	title TEXT, 
	body TEXT,
	post_like DEFAULT 0,
	creation_data TIMESTAMP default now(),
	creator integer references member 
);

