const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all trips
router.get("/", (req, res) => {
  const sql = "SELECT * FROM trips";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Get all trips from specific host_id
router.get('/host/:host_id', (req, res) => {
  const { host_id } = req.params; // Extract host_id from URL parameters
  const sql = 'SELECT * FROM trips WHERE host_id = ?';

  db.query(sql, [host_id], (err, results) => {
    if (err) {
      console.error('Error executing SQL:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No trips found for this host' });
    }
    res.json(results); // Return the list of trips as JSON
  });
});

// Get specific trip by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
      trips.id, trips.trip_name, trips.start_date, trips.end_date, trips.created_at, 
      trips.updated_at, trips.itinerary, trips.notes,
      host.id as host_id, host.name as host_name, host.email as host_email,
      co_host.id as co_host_id, co_host.name as co_host_name, co_host.email as co_host_email
    FROM trips
    JOIN users as host ON trips.host_id = host.id
    JOIN users as co_host ON trips.co_host_id = co_host.id
    WHERE trips.id = ?;
  `;
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Trip not found" });
    }
    res.json(results[0]);
  });
});

module.exports = router;
