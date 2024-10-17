// seed.js
const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

// Read the seed SQL file
const seedSql = fs.readFileSync('seeds/seed.sql', 'utf8');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Qwery@123",
  database: 'travel_buddies',
  multipleStatements: true,
});

// Function to seed the database
const seedDatabase = () => {
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL.');

    connection.query(seedSql, (err, results) => {
      if (err) {
        console.error('Error executing seed SQL:', err);
      } else {
        console.log('Database seeded successfully.');
      }
      connection.end();
    });
  });
};

// Check if this script is run directly (from CLI)
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
