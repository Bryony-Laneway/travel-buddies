const express = require('express');
const app = express();

// Middleware and routes
app.get("/", function(req, res) {
    res.send("Hello from Travel Buddies!");
});

// Start the server
const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server running on port : http://localhost:${PORT}`);
});
