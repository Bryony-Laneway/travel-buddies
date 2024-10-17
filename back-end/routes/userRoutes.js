const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all users
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Create a new user
// router.post('/', (req, res) => {
//   const { name, email } = req.body; // Assuming you send name and email in the request body
//   const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  
//   db.query(sql, [name, email], (err, results) => {
//     if (err) {
//       console.error('Error executing SQL:', err);
//       return res.status(500).json({ error: 'Failed to create user' });
//     }
//     res.status(201).json({ id: results.insertId, name, email });
//   });
// });

// Export the router
module.exports = router;