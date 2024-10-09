CREATE DATABASE TRAVEL_BUDDIES;
USE TRAVEL_BUDDIES;

CREATE TABLE users
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL,
	surname VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password_hash VARCHAR(50) NOT NULL,
	profile_pic VARCHAR(150),
	created_at DATE NOT NULL
);

CREATE TABLE trips
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	host_id INT NOT NULL,
	co_host_id INT,
	trip_name VARCHAR(50) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	itinerary VARCHAR(255),
	notes VARCHAR(255),
	FOREIGN KEY (host_id) REFERENCES users(id),
	FOREIGN KEY (co_host_id) REFERENCES users(id)
);

CREATE TABLE fav_places
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	trip_id INT NOT NULL,
	user_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	created_at DATE NOT NULL,
	FOREIGN KEY (trip_id) REFERENCES trips(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE packing_list
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	trip_id INT NOT NULL,
	item VARCHAR(50) NOT NULL,
	FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TABLE trip_friends (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trip_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE key_places
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	trip_id INT NOT NULL,
	user_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	tips VARCHAR(50),
	category INT NOT NULL,
	created_at DATE NOT NULL,
	FOREIGN KEY (trip_id) REFERENCES trips(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trip_id INT NOT NULL,
    user_id INT NOT NULL,
    photo_url VARCHAR(150) NOT NULL,
    uploaded_at DATE NOT NULL,
    publish BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE fav_photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    photo_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (photo_id) REFERENCES photos(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);