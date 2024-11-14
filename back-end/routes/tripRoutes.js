const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const db = require("../config/db");

// Set up multer for trip photos uploads
const tripPhotoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/trip-photos"));
  },
  filename: (req, file, cb) => {
    const tripId = req.params.id;
    const userId = req.body.user_id;
    console.log("tripId:", tripId, "userId:", userId); // Log both IDs
    const date = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")
      .slice(2); // YYMMDD
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const newName = `${tripId}-${userId}-${date}-${timestamp}${ext}`;
    cb(null, newName);
  },
});

const uploadTripPhoto = multer({ storage: tripPhotoStorage });

// Get all trips
router.get("/", (req, res) => {
  // const sql = "SELECT * FROM trips";
  const sql = `
    SELECT 
      t.id, t.host_id, t.trip_name, t.start_date, t.end_date, t.created_at, t.updated_at, t.itinerary, t.notes,
      u1.name AS host_name
    FROM 
      trips t
    LEFT JOIN 
      users u1 ON t.host_id = u1.id;
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Get trip by Id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
      trips.id, trips.trip_name, trips.start_date, trips.end_date, trips.created_at, 
      trips.updated_at, trips.itinerary, trips.notes,
      host.id as host_id, host.name as host_name, host.email as host_email
    FROM trips
    JOIN users as host ON trips.host_id = host.id
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

// Get all trips by userID
router.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params; // Extract host_id from URL parameters
  const sql = `
    SELECT 
      t.id, t.host_id, t.trip_name, t.start_date, t.end_date, t.created_at, t.updated_at, t.itinerary, t.notes,
      u1.name AS host_name
    FROM 
      trips t
    LEFT JOIN 
      users u1 ON t.host_id = u1.id
    WHERE 
      t.host_id = ?;
    `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No trips found for this host" });
    }
    res.json(results);
  });
});

// Create a trip
router.post("/", async (req, res) => {
  const {
    host_id,
    trip_name,
    start_date,
    end_date,
    itinerary,
    notes,
  } = req.body;

  // console.log("Request body:", req.body);

  try {
    const sql = `
      INSERT INTO trips (host_id, trip_name, start_date, end_date, created_at, updated_at, itinerary, notes)
      VALUES (?, ?, ?, ?, NOW(), NOW(), ?, ?)`;

    const values = [
      host_id,
      trip_name,
      start_date,
      end_date,
      itinerary,
      notes,
    ];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error executing SQL:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(201).json({ success: true, id: results.insertId });
    });
  } catch (error) {
    console.error("Error adding trip:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// All friends by tripID
router.get("/friends/:trip_id", (req, res) => {
  const { trip_id } = req.params;
  const sql = `
    SELECT u.id, u.name
    FROM trip_friends tf
    JOIN users u ON tf.user_id = u.id
    WHERE tf.trip_id = ?;
  `;

  db.query(sql, [trip_id], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Add a friend to trip
router.post("/trip-friends", (req, res) => {
  const { tripId, userId } = req.body;
  
  // Query to check if this friend already exists in the trip
  const checkSql = "SELECT * FROM trip_friends WHERE trip_id = ? AND user_id = ?";
  
  db.query(checkSql, [tripId, userId], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    
    if (results.length > 0) {
      // User is already a friend in this trip
      return res.status(400).json({ error: "Friend already added to this trip" });
    }

    // Proceed to insert if not already in trip
    const sql = "INSERT INTO trip_friends (trip_id, user_id) VALUES (?, ?)";
    db.query(sql, [tripId, userId], (err, results) => {
      if (err) {
        console.error("Error executing SQL:", err);
        return res.status(500).json({ error: "Failed to add friend to trip" });
      }
      res.status(201).json({ message: "Friend added to trip", id: results.insertId });
    });
  });
});

// Remove a friend from trip
router.delete("/trip-friends", (req, res) => {
  const { tripId, userId } = req.body;

  // Query to check if the friend is already in the trip
  const checkSql = "SELECT * FROM trip_friends WHERE trip_id = ? AND user_id = ?";
  
  db.query(checkSql, [tripId, userId], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    
    if (results.length === 0) {
      // Friend is not in the trip, can't remove
      return res.status(404).json({ error: "Friend not found in this trip" });
    }

    // Proceed to delete the friend from the trip
    const deleteSql = "DELETE FROM trip_friends WHERE trip_id = ? AND user_id = ?";
    db.query(deleteSql, [tripId, userId], (err, results) => {
      if (err) {
        console.error("Error executing SQL:", err);
        return res.status(500).json({ error: "Failed to remove friend from trip" });
      }
      res.status(200).json({ message: "Friend removed from trip" });
    });
  });
});

// All key places by tripID
router.get("/key-places/:trip_id", (req, res) => {
  const { trip_id } = req.params;
  const sql = `
    SELECT kp.id, kp.name
    FROM key_places kp
    WHERE kp.trip_id = ?;
  `;

  db.query(sql, [trip_id], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Add key place to trip
router.post("/key-places", (req, res) => {
  const { tripId, userId, name } = req.body;
  const sql = `
    INSERT INTO key_places (trip_id, user_id, name )
    VALUES (?, ?, ?);
  `;

  db.query(sql, [tripId, userId, name ], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Failed to add key place to trip" });
    }
    res.status(201).json({ message: "Key place added to trip", id: results.insertId });
  });
});

// All packing items by tripID
router.get("/packing-list/:trip_id", (req, res) => {
  const { trip_id } = req.params;
  const sql = `
    SELECT id, item
    FROM packing_list
    WHERE trip_id = ?;
  `;

  db.query(sql, [trip_id], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// Add packing item to trip
router.post("/packing-list", (req, res) => {
  const { tripId, item } = req.body;
  const sql = `
    INSERT INTO packing_list (trip_id, item)
    VALUES (?, ?);
  `;

  db.query(sql, [tripId, item], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Failed to add packing item to trip" });
    }
    res.status(201).json({ message: "Packing item added to trip", id: results.insertId });
  });
});

// Add photo to trip
router.post("/:id/photos", uploadTripPhoto.single("photo"), (req, res) => {
  console.log("Request Body:", req.body); // Log the entire body
  const { id } = req.params;
  const userId = req.body.user_id;
  const photoUrl = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO photos (trip_id, user_id, photo_url, publish)
    VALUES (?, ?, ?, false)`;

  db.query(sql, [id, userId, photoUrl], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to upload photo" });
    }
    res.status(201).json({ message: "Photo uploaded successfully", photoUrl });
  });
});

module.exports = router;
