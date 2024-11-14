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
      "DROP TABLE IF EXISTS photos;",
      "DROP TABLE IF EXISTS key_places;",
      "DROP TABLE IF EXISTS trip_friends;",
      "DROP TABLE IF EXISTS packing_list;",
      "DROP TABLE IF EXISTS trips;",
      "DROP TABLE IF EXISTS friends;",
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

      // Create the friends table
      `CREATE TABLE friends (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        friend_id INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_friendship (user_id, friend_id)
      );`,

      // Create the trips table
      `CREATE TABLE trips (
        id INT PRIMARY KEY AUTO_INCREMENT,
        host_id INT NOT NULL,
        trip_name VARCHAR(50) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP,
        itinerary VARCHAR(255),
        notes VARCHAR(255),
        FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
      );`,

      // Create the packing_list table
      `CREATE TABLE packing_list (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        item VARCHAR(50) NOT NULL,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
      );`,

      // Create the trip_friends table
      `CREATE TABLE trip_friends (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE (trip_id, user_id)
      );`,

      // Create the key_places table
      `CREATE TABLE key_places (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );`,

      // Create the photos table
      `CREATE TABLE photos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        photo_url VARCHAR(150) NOT NULL,
        uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        publish BOOLEAN NOT NULL DEFAULT FALSE,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );`,

      // Insert fake users
      `INSERT INTO users (name, surname, email, password_hash, profile_pic, created_at) VALUES
        ('Evandro', 'Lugli', 'ev@gmail.com', '${await bcrypt.hash('123456', 10)}', 'evandro.jpg', NOW()),
        ('Bryony', 'Seth', 'bryony.seth@live.co.uk', '${await bcrypt.hash('123456', 10)}', 'bryony.jpg', NOW()),
        ('Mona', 'Lisa', 'ml@gmail.com', '${await bcrypt.hash('123456', 10)}', 'monalisa.jpg', NOW()),
        ('Chuck', 'Norris', 'cn@gmail.com', '${await bcrypt.hash('123456', 10)}', 'chuck-norris.jpg', NOW());`,

      // Insert fake trips
      `INSERT INTO trips (host_id, trip_name, start_date, end_date, created_at, updated_at, itinerary, notes) VALUES
        (1, 'England', '2024-10-20', '2024-10-30', NOW(), NOW(), 'Visit beaches', 'Pack sunscreen'),
        (1, 'Tasmania', '2024-12-20', '2024-12-28', NOW(), NOW(), 'See wallabies', 'Visit MONA'),
        (2, 'NZ Road Trip', '2023-08-15', '2023-09-15', NOW(), NOW(), 'Drive coast', 'Bungee jump'),
        (3, 'Brazil Adventure', '2023-06-10', '2023-07-10', NOW(), NOW(), 'Visit Amazon', 'Bring insect repellent'),
        (4, 'Japan Exploration', '2025-03-01', '2025-03-15', NOW(), NOW(), 'Tokyo to Kyoto', 'Check cherry blossoms');`,

    // Insert fake packing_list items
    `INSERT INTO packing_list (trip_id, item) VALUES 
      (1, 'Camera'),
      (1, 'Sunglasses'),
      (2, 'Backpack'),
      (3, 'Map'),
      (4, 'Raincoat');`,

    // Insert fake trip_friends
    `INSERT INTO trip_friends (trip_id, user_id) VALUES 
      (1, 2),
      (1, 3),
      (2, 3),
      (2, 4),
      (3, 4);`,

    // Insert fake key_places
    `INSERT INTO key_places (trip_id, user_id, name) VALUES 
      (1, 1, 'Temple'),
      (1, 2, 'Church'),
      (2, 1, 'Falls'),
      (3, 3, 'Market'),
      (4, 4, 'Shrine');`,

    // Insert fake photos
    `INSERT INTO photos (trip_id, user_id, photo_url, uploaded_at, publish) VALUES 
      (1, 1, 'img-1.jpg', NOW(), TRUE),
      (1, 2, 'img-2.jpg', NOW(), FALSE),
      (2, 1, 'img-3.jpg', NOW(), TRUE),
      (3, 3, 'img-4.jpg', NOW(), TRUE),
      (4, 4, 'img-5.jpg', NOW(), FALSE);`,

    // Insert fake friends
    `INSERT INTO friends (user_id, friend_id, created_at) VALUES
      (1, 2, NOW()),
      (1, 3, NOW()),
      (2, 3, NOW()),
      (3, 4, NOW()),
      (4, 1, NOW());`
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
