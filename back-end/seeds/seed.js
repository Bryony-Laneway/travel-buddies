const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "travel_buddies",
});

// Function to execute a single SQL command
const executeSql = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connection.connect();
    console.log("Connected to MySQL.");

    // Array of SQL commands to execute
    const sqlCommands = [
      // Drop tables if they exist
      "DROP TABLE IF EXISTS fav_photos;",
      "DROP TABLE IF EXISTS photos;",
      "DROP TABLE IF EXISTS key_places;",
      "DROP TABLE IF EXISTS trip_friends;",
      "DROP TABLE IF EXISTS packing_list;",
      "DROP TABLE IF EXISTS fav_places;",
      "DROP TABLE IF EXISTS trips;",
      "DROP TABLE IF EXISTS users;",

      // Create the users table
      `CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(40) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        profile_pic VARCHAR(150),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );`,

      // Create the trips table
      `CREATE TABLE trips (
        id INT PRIMARY KEY AUTO_INCREMENT,
        host_id INT NOT NULL,
        co_host_id INT,
        trip_name VARCHAR(50) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP,
        itinerary VARCHAR(255),
        notes VARCHAR(255),
        FOREIGN KEY (host_id) REFERENCES users(id),
        FOREIGN KEY (co_host_id) REFERENCES users(id)
      );`,

      // Create the fav_places table
      `CREATE TABLE fav_places (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (trip_id) REFERENCES trips(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`,

      // Create the packing_list table
      `CREATE TABLE packing_list (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        item VARCHAR(50) NOT NULL,
        FOREIGN KEY (trip_id) REFERENCES trips(id)
      );`,

      // Create the trip_friends table
      `CREATE TABLE trip_friends (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (trip_id) REFERENCES trips(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`,

      // Create the key_places table
      `CREATE TABLE key_places (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        tips VARCHAR(50),
        category INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (trip_id) REFERENCES trips(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`,

      // Create the photos table
      `CREATE TABLE photos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        photo_url VARCHAR(150) NOT NULL,
        uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        publish BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (trip_id) REFERENCES trips(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`,

      // Create the fav_photos table
      `CREATE TABLE fav_photos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        photo_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (photo_id) REFERENCES photos(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`,

      // Insert fake users
      `INSERT INTO users (name, surname, email, password_hash, profile_pic, created_at) VALUES
        ('Evandro', 'Lugli', 'evandro.lugli@gmail.com', '${await bcrypt.hash('123456', 10)}', 'images/evandro.jpg', NOW()),
        ('Bryony', 'Seth', 'bryony.seth@live.co.ok', '${await bcrypt.hash('123456', 10)}', 'images/bryony.jpg', NOW()),
        ('Danilo', 'Silva', 'danilo.silva@live.com', '${await bcrypt.hash('123456', 10)}', 'images/danilo.jpg', NOW());`,

      // Insert fake trips
      `INSERT INTO trips (host_id, co_host_id, trip_name, start_date, end_date, created_at, updated_at, itinerary, notes) VALUES
        (1, 2, 'England', '2024-10-20', '2024-10-30', NOW(), NOW(), 'Visit to beaches', 'Pack sunscreen'),
        (1, 2, 'Tasmania', '2024-12-20', '2024-12-28', NOW(), NOW(), 'Eat whalabies', 'Don’t forget to visit MONA'),
        (2, 1, 'NZ Road Trip', '2023-08-15', '2023-09-15', NOW(), NOW(), 'Drive along the coast', 'Go for a bungie');`,

      // Insert fake fav_places
      `INSERT INTO fav_places (trip_id, user_id, name, created_at) VALUES 
        (1, 1, 'White Temple', NOW()),
        (2, 1, 'Buda Tour', NOW()),
        (3, 2, 'Phi Phi', NOW());`,

      // Insert fake packing_list items
      `INSERT INTO packing_list (trip_id, item) VALUES 
        (1, 'Camera'),
        (1, 'Sunglasses'),
        (2, 'Backpack');`,

      // Insert fake trip_friends
      `INSERT INTO trip_friends (trip_id, user_id) VALUES 
        (1, 2),
        (1, 3),
        (2, 3);`,

      // Insert fake key_places
      `INSERT INTO key_places (trip_id, user_id, name, tips, category, created_at) VALUES 
        (1, 1, 'Temple', 'Best visited early', 1, NOW()),
        (1, 2, 'Church', 'Pray', 2, NOW()),
        (2, 1, 'Falls', 'Great view', 3, NOW());`,

      // Insert fake photos
      `INSERT INTO photos (trip_id, user_id, photo_url, uploaded_at, publish) VALUES 
        (1, 1, 'folder/photo1.jpg', NOW(), TRUE),
        (1, 2, 'folder/photo2.jpg', NOW(), FALSE),
        (2, 1, 'folder/photo3.jpg', NOW(), TRUE);`,

      // Insert fake fav_photos
      `INSERT INTO fav_photos (photo_id, user_id) VALUES 
        (1, 1),
        (2, 1),
        (3, 2);`
    ];

    // Execute each SQL command one by one
    for (const sql of sqlCommands) {
      await executeSql(sql);
    }

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    connection.end();
  }
};

// Check if this script is run directly (from CLI)
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
