const express = require("express");
const app = express();
const db = require("./config/db");
const cors = require("cors");
const https = require("node:https");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT;

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// cors
// const allowedOrigins = ["http://localhost:3000", "http://localhost:3333"];
const allowedOrigins = "*";
app.use(
  cors({
    origins: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // null error, true origin allowed
      } else {
        callback(new Error("Not allowed - CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Allow all origins
// app.use(
//   cors({
//     origin: "*", // Allow all origins
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add any other methods you want to allow
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");

// Middleware and routes
app.get("/", function (req, res) {
  res.send("Hello from Travel Buddies!");
});

app.use("/users", userRoutes);
app.use("/trips", tripRoutes);
app.use("/places", tripRoutes);

app.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
  // console.log(`Server running on : http://localhost:3333`);
});
