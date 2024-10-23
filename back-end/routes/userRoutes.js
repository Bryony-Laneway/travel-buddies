const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const router = express.Router();

// Get all users (avoiding sensitive data like password_hash)
router.get("/", (req, res) => {
  const sql =
    "SELECT id, name, surname, email, profile_pic, created_at FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results); // MySQL query results are directly available as 'results'
  });
});

// Get a specific user by ID (avoiding sensitive data like password_hash)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, name, surname, email, profile_pic, created_at FROM users WHERE id = ?";
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error executing SQL:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" }); // Handle case where no user is found
    }
    res.json(results[0]); // Return the first result as the specific user
  });
});

// User login route (authenticating users)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the user by email
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Error executing SQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }

      const user = results[0]; // MySQL stores the result as an array

      // Compare the password with the stored hashed password
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }

      // Send back user info (or generate JWT token here)
      res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// User registration route (if needed)
router.post("/register", async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const query =
      "INSERT INTO users (name, surname, email, password_hash, created_at) VALUES (?, ?, ?, ?, NOW())";
    const values = [name, surname, email, passwordHash];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error executing SQL:", err);
        return res.status(500).json({ error: "Failed to register user" });
      }

      res.status(201).json({ success: true, userId: results.insertId });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Endpoint for resetting password
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  //console.log("Request body:", req.body);

  try {
    // Check if the user exists
    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    // Check if any user was found
    if (rows.length === 0) { 
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate the new password
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await db.promise().query("UPDATE users SET password_hash = ? WHERE email = ?", [hashedPassword, email]);

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ success: false, message: "An error occurred during password reset" });
  }
});

module.exports = router;
