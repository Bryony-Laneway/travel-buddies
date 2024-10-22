const express = require("express");
const app = express();
const db = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;

// bryony added 21/10/24
const cors = require("cors");
// const app = express();
const https = require("node:https");
// const axios = require("axios");
//cors
const allowedOrigins = ["http://localhost:3000", "http://localhost:3333"];
app.use(
  cors({
    origins: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); //null error, true origin allowed
      } else {
        callback(new Error("Not allowed - CORS"));
      }
    },

    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Bryony finished adding 21/10/24

const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");

app.use(express.json());

// Middleware and routes
app.get("/", function (req, res) {
  res.send("Hello from Travel Buddies!");
});

app.use("/users", userRoutes);
app.use("/trips", tripRoutes);

app.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});
