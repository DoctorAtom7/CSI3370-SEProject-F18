CREATE TABLE IF NOT EXISTS member (
	member_id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	bio TEXT default 'No bio given',
	email VARCHAR(255) UNIQUE NOT NULL,
	verified BOOLEAN DEFAULT 'n',
	create_date TIMESTAMP DEFAULT now(),
	password_hash VARCHAR(100) NOT NULL,
	is_moderator BOOLEAN default 'n',
	/* This image was originally posted to Flickr by Alex Panoiu at 
	https://flickr.com/photos/38737290@N06/7251980240. 
	It is licensed under the terms of the cc-by-2.0. */
	banner_url TEXT default 'https://upload.wikimedia.org/wikipedia/commons/1/17/Aquarius_Proprius_4_Orange-Blue_%287251980240%29.jpg',
	is_muted BOOLEAN default 'n',
	muted_until TIMESTAMP default null
);

CREATE TABLE IF NOT EXISTS post (
	post_id SERIAL PRIMARY KEY,
	title TEXT, 
	body TEXT,
	post_like integer DEFAULT 0,
	creation_date TIMESTAMP default now(),
	is_comment boolean default 'f',
	is_flagged boolean default 'f',
	member_id integer references member,
	parent_id integer references post default null 
);

CREATE TABLE IF NOT EXISTS user_likes (
	id serial primary key,
	member_id integer references member,
	post_id integer references post
)
