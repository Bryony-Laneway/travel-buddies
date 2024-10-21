const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all users
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

module.exports = router;
