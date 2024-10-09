const express = require('express')
const app = express();

app.get("/", function(req, res) {
    res.send("Hello!")
});

const PORT = 3333
app.listen(PORT, ()=>{
    console.log(`Server running on port : http://localhost:${PORT}`)
})