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
        (1, 'England', '2024-10-20', '2024-10-30', NOW(), NOW(), 'Visit beaches and enjoy the sea breeze', 'Pack sunscreen and hats'),
        (1, 'Tasmania', '2024-12-20', '2024-12-28', NOW(), NOW(), 'See wallabies, go hiking and explore nature', 'Visit MONA, don’t forget the camera'),
        (2, 'NZ Road Trip', '2023-08-15', '2023-09-15', NOW(), NOW(), 'Drive along the coast and explore nature', 'Bungee jump and pack for rain'),
        (3, 'Brazil Adventure', '2023-06-10', '2023-07-10', NOW(), NOW(), 'Visit the Amazon rainforest and meet locals', 'Bring insect repellent and boots'),
        (4, 'Japan Exploration', '2025-03-01', '2025-03-15', NOW(), NOW(), 'Explore Tokyo, Kyoto and the cherry blossoms', 'Check cherry blossoms and pack light'),
        (1, 'Paris Weekend', '2024-11-10', '2024-11-14', NOW(), NOW(), 'Visit the Eiffel Tower and local museums', 'Book tickets in advance'),
        (2, 'Alaska Expedition', '2025-06-01', '2025-06-10', NOW(), NOW(), 'Hike glaciers and spot wildlife', 'Bring warm clothing and gear'),
        (3, 'Africa Safari', '2024-07-01', '2024-07-14', NOW(), NOW(), 'Safari in Tanzania and visit Serengeti', 'Bring binoculars, sunscreen'),
        (4, 'South Korea Trip', '2024-12-01', '2024-12-10', NOW(), NOW(), 'Explore Seoul and the cultural sights', 'Don’t forget an umbrella'),
        (1, 'Iceland Adventure', '2025-02-15', '2025-02-28', NOW(), NOW(), 'Visit volcanoes, glaciers and waterfalls', 'Bring waterproof boots'),
        (2, 'Canada Skiing', '2025-01-10', '2025-01-20', NOW(), NOW(), 'Skiing in the Rocky Mountains', 'Pack winter gear and skis'),
        (3, 'Australia Tour', '2025-03-05', '2025-03-15', NOW(), NOW(), 'Explore Sydney, Great Barrier Reef and Uluru', 'Bring swimsuits and hiking boots'),
        (4, 'Mexico Beach Trip', '2024-11-15', '2024-11-22', NOW(), NOW(), 'Relax on the beach and enjoy the sun', 'Pack sunscreen and snacks'),
        (1, 'Greece Islands', '2024-08-15', '2024-08-22', NOW(), NOW(), 'Visit Santorini and Mykonos', 'Book ferries in advance'),
        (2, 'Antarctica Expedition', '2025-01-25', '2025-02-10', NOW(), NOW(), 'Explore the southernmost continent and icebergs', 'Pack thermal clothing');`,
    
      // Insert fake packing_list items
      `INSERT INTO packing_list (trip_id, item) VALUES
        (1, 'Camera'),
        (1, 'Sunglasses'),
        (2, 'Backpack'),
        (3, 'Map'),
        (4, 'Raincoat'),
        (5, 'Camera'),
        (5, 'Sunscreen'),
        (6, 'Guidebook'),
        (6, 'Umbrella'),
        (7, 'Hiking Boots'),
        (7, 'Warm Jacket'),
        (8, 'Safari Hat'),
        (8, 'Binoculars'),
        (9, 'Raincoat'),
        (9, 'Hiking Shoes'),
        (10, 'Waterproof Jacket'),
        (11, 'Skis'),
        (12, 'Snacks'),
        (12, 'Water Bottle'),
        (13, 'Swimsuit'),
        (13, 'Flip-flops'),
        (14, 'Hat'),
        (15, 'Thermal Underwear');`,
    
      // Insert fake trip_friends
      `INSERT INTO trip_friends (trip_id, user_id) VALUES
        (1, 2),
        (1, 3),
        (2, 3),
        (2, 4),
        (3, 4),
        (4, 1),
        (5, 1),
        (6, 2),
        (7, 3),
        (8, 4);`,
    
      // Insert fake key_places
      `INSERT INTO key_places (trip_id, user_id, name) VALUES
        (1, 1, 'Temple'),
        (1, 2, 'Church'),
        (2, 1, 'Falls'),
        (3, 3, 'Market'),
        (4, 4, 'Shrine'),
        (5, 1, 'Forest'),
        (6, 2, 'Glacier'),
        (7, 3, 'Serengeti'),
        (8, 4, 'Gyeongbokgung'),
        (9, 1, 'Statue');`
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
