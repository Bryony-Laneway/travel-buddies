const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all friends by userID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT u.id, u.name, u.surname, u.email, u.profile_pic, u.created_at
    FROM users u
    JOIN friends f ON (f.user_id = ? AND f.friend_id = u.id) OR (f.friend_id = ? AND f.user_id = u.id)
  `;

  db.query(sql, [id, id], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(200).json([]);  // Return an empty array if no friends are found
    }
    res.json(results);  // Return the list of friends
  });
});

// Add a friend by userID and friendID
router.post("/add", (req, res) => {
  const { userId, friendId } = req.body;

  // Prevent adding the same user as a friend
  if (userId === friendId) {
    return res.status(400).json({ error: "Cannot add yourself as a friend" });
  }

  const sql = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)";

  db.query(sql, [userId, friendId], (err, result) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(201).json({ message: "Friend added successfully" });
  });
});

// Delete a friend by userID and friendID
router.delete("/delete", (req, res) => {
  const { userId, friendId } = req.body;

  const sql = "DELETE FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)";

  db.query(sql, [userId, friendId, friendId, userId], (err, result) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Friendship not found" });
    }
    res.status(200).json({ message: "Friend removed successfully" });
  });
});

module.exports = router;