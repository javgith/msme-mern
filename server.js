var express = require('express');
var app = express();
var movies = require("./routes/movies");
var movies_db = require("./routes/movies_db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/api/movies", movies);
app.use("/api/movies_db",movies_db);

app.listen(4400);
console.log("Server is running in 4400");
