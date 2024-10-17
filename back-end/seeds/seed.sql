-- Create the database
CREATE DATABASE IF NOT EXISTS travel_buddies;
USE travel_buddies;

-- Drop tables if they exist (to avoid conflicts during re-run)
DROP TABLE IF EXISTS fav_photos;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS key_places;
DROP TABLE IF EXISTS trip_friends;
DROP TABLE IF EXISTS packing_list;
DROP TABLE IF EXISTS fav_places;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS users;

-- Create the users table
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

-- Insert fake users
INSERT INTO users (name, surname, email, password_hash, profile_pic, created_at)
VALUES 
('Evandro', 'Lugli', 'evandro.lugli@gmail.com', '123456', 'evandro.jpg', '2024-10-09'),
('Bryony', 'Seth', 'bryony.seth@gmail.com', '123456', 'bryony.jpg', '2024-10-10'),
('Danilo', 'Silva', 'danilo.silta@gmail.com', '123456', 'danilo.jpg', '2024-10-11');

-- Create the trips table
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

-- Insert fake trips
INSERT INTO trips (host_id, co_host_id, trip_name, start_date, end_date, created_at, updated_at, itinerary, notes)
VALUES
(1, 2, 'England', '2024-10-20', '2024-10-30', '2023-01-01', '2023-01-02', 'Visit to beaches', 'Pack sunscreen'),
(1, 2, 'Tasmania', '2024-12-20', '2024-12-28', '2023-01-01', '2023-01-02', 'Eat whalabies', 'Don’t forget to visit MONA'),
(2, 1, 'NZ Road Trip', '2023-08-15', '2023-09-15', '2023-01-01', '2023-01-02', 'Drive along the coast', 'Go for a bungie');

-- Create the fav_places table
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

-- Insert fake fav_places
INSERT INTO fav_places (trip_id, user_id, name, created_at)
VALUES 
(1, 1, 'White Temple', '2024-10-01'),
(2, 1, 'Buda Tour', '2024-10-02'),
(3, 2, 'Phi Phi', '2024-10-03');

-- Create the packing_list table
CREATE TABLE packing_list
(
	id INT PRIMARY KEY AUTO_INCREMENT,
	trip_id INT NOT NULL,
	item VARCHAR(50) NOT NULL,
	FOREIGN KEY (trip_id) REFERENCES trips(id)
);

-- Insert fake packing_list items
INSERT INTO packing_list (trip_id, item) 
VALUES 
(1, 'Camera'),
(1, 'Sunglasses'),
(2, 'Backpack');

-- Create the trip_friends table
CREATE TABLE trip_friends (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trip_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert fake trip_friends
INSERT INTO trip_friends (trip_id, user_id) 
VALUES 
(1, 2),
(1, 3),
(2, 3);

-- Create the key_places table
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

-- Insert fake key_places
INSERT INTO key_places (trip_id, user_id, name, tips, category, created_at) 
VALUES 
(1, 1, 'Temple', 'Best visited early', 1, '2024-10-01'),
(1, 2, 'Church', 'Pray', 2, '2024-10-02'),
(2, 1, 'Falls', 'Great view', 3, '2024-10-03');

-- Create the photos table
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

-- Insert fake photos
INSERT INTO photos (trip_id, user_id, photo_url, uploaded_at, publish) 
VALUES 
(1, 1, 'folder/photo1.jpg', '2024-10-01', TRUE),
(1, 2, 'folder/photo2.jpg', '2024-10-02', FALSE),
(2, 1, 'folder/photo3.jpg', '2024-10-03', TRUE);

-- Create the fav_photos table
CREATE TABLE fav_photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    photo_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (photo_id) REFERENCES photos(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert fake fav_photos
INSERT INTO fav_photos (photo_id, user_id) 
VALUES 
(1, 1),
(2, 1),
(3, 2);
