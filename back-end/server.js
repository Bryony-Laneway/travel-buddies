const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");
const https = require("node:https");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT;

const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const friendRoutes = require("./routes/friendRoutes");
const openaiRoutes = require("./routes/openaiRoutes");

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware and routes
app.get("/", function (req, res) {
  res.send("Hello from Travel Buddies!");
});

app.use("/users", userRoutes);
app.use("/trips", tripRoutes);
app.use("/friends", friendRoutes);
app.use("/openai", openaiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});
