const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router();
const db = require("../config/db");

// Set up multer for trip photos uploads
const tripPhotoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/trip-photos'));
  },
  filename: (req, file, cb) => {
    const tripId = req.params.id;
    const userId = req.body.user_id;
    console.log('tripId:', tripId, 'userId:', userId); // Log both IDs
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '').slice(2); // YYMMDD
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const newName = `${tripId}-${userId}-${date}-${timestamp}${ext}`;
    cb(null, newName);
  }
});

const uploadTripPhoto = multer({ storage: tripPhotoStorage });

// Post Photo to Trip
router.post('/:id/photos', uploadTripPhoto.single('photo'), (req, res) => {
  console.log('Request Body:', req.body); // Log the entire body
  const { id } = req.params;
  const userId = req.body.user_id;
  const photoUrl = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO photos (trip_id, user_id, photo_url, publish)
    VALUES (?, ?, ?, false)`;

  db.query(sql, [id, userId, photoUrl], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to upload photo' });
    }
    res.status(201).json({ message: 'Photo uploaded successfully', photoUrl });
  });
});

// Get all trips
router.get("/", (req, res) => {
  // const sql = "SELECT * FROM trips";
  const sql = `
    SELECT 
      t.id, t.host_id, t.co_host_id, t.trip_name, t.start_date, t.end_date, t.created_at, t.updated_at, t.itinerary, t.notes,
      u1.name AS host_name, u2.name AS co_host_name
    FROM 
        trips t
    LEFT JOIN 
        users u1 ON t.host_id = u1.id
    LEFT JOIN 
        users u2 ON t.co_host_id = u2.id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Get all trips by host_id
router.get('/host/:host_id', (req, res) => {
  const { host_id } = req.params; // Extract host_id from URL parameters
  const sql = `
    SELECT 
      t.id, t.host_id, t.co_host_id, t.trip_name, t.start_date, t.end_date, t.created_at, t.updated_at, t.itinerary, t.notes,
      u1.name AS host_name, u2.name AS co_host_name
    FROM 
      trips t
    LEFT JOIN 
      users u1 ON t.host_id = u1.id
    LEFT JOIN 
      users u2 ON t.co_host_id = u2.id
    WHERE 
      t.host_id = ?;
    `;

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

// Get trip by ID
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
