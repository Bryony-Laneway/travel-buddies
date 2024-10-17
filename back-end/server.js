const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');
const PORT = process.env.PORT;

const userRoutes = require('./routes/userRoutes');

app.use(express.json());
dotenv.config();

// Middleware and routes
app.get("/", function(req, res) {
    res.send("Hello from Travel Buddies!");
});

app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${PORT}`);
});