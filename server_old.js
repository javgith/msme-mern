var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

var movies = [
    { id: 1, name: "M1", actors: ["A1", "A2"], likes: 20 },
    { id: 2, name: "M2", actors: ["B1", "B2"], likes: 30 }
];

app.get("/movies", function (req, res) {
    var likes = req.query.likes || 0;
    var list = movies.filter(a => {
        return a.likes >= likes;
    })
    res.send(list);
})

app.get("/movies/:id", function (req, res) {
    var id = req.params.id;
    var obj = movies.find(a => {
        return a.id == id;
    });
    res.send(obj || {});
});

app.post("/movies", function (req, res) {
    var body = req.body;
    var id = movies.length + 1;
    movies.push({
        id: id,
        name: body.name,
        likes: body.likes || 0,
        actors: body.actors ? body.actors.split(",") : []
    })

    res.send({ message: "movie added successfully", id })
    console.log(body);
})


app.listen(4400);
console.log("Server is running in 4400");
