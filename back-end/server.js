const express = require("express");
const app = express();
const db = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;

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
