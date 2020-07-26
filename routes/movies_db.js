var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/msme_mean", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});
var moviesSchema = mongoose.Schema({
    name: String,
    likes: Number,
    actors: Array
}, { collection: "movies" });
var movieModel = mongoose.model("movies", moviesSchema);

router.get("/callback", function (req, res) {
    movieModel.find({}, function (err, data) {
        res.send(data);
    })
});

router.get("/promise", async function (req, res) {
    var resp = movieModel.find({});
    console.log(333333333333333)
    resp.then(function (data) {
        console.log(2222222222222)
        res.send(data);
    }).catch(function (err) {
        console.log("Error happened....", err)
    })
    console.log(11111111111111)
});

router.get("/await", async function (req, res) {
    var data = await movieModel.find({});
    console.log(333333333333333)
    res.send(data);
});

router.get("/:id", function (req, res) {

});

router.post("/", async function (req, res) {
    var body = req.body;
    var obj = new movieModel({
        name: body.name,
        likes: body.likes || 0,
        actors: body.actors ? body.actors.split(",") : []
    })
    var resp = await obj.save();
    res.send(resp)
});

router.put("/:id",async function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var obj = {
        name: body.name,
        likes: body.likes || 0,
        actors: body.actors ? body.actors.split(",") : []
    }
    try{
        await movieModel.findByIdAndUpdate(id, obj);
        res.send({id, message:"data updated"});
    }catch(ex){
        await movieModel.findByIdAndUpdate(id, obj);
        res.send({ex, message:"data not updated"});
    }
});

router.patch("/:id", function (req, res) {

});

router.delete("/:id", function (req, res) {

})

module.exports = router;
