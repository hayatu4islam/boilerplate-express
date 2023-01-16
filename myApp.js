let express = require('express');
let app = express();
require("dotenv").config();
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
})
app.use(bodyParser.urlencoded({ extended: false }));
// We parse the application/json
app.use(bodyParser.json())


app.use("/public", express.static(__dirname + "/public"));
// Meet the Node console
console.log("Hello World");

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res){
    let msgObj = { message: "Hello json" };
    if (process.env.MESSAGE_STYLE === "uppercase"){
        // res.json({"message": msgObj.message.toUpperCase()});
        res.json({
            "message": "HELLO JSON"
        });
    } else res.json({ "message": "Hello json" });
});

// app.get("/json", function(req, res) {
//     res.json({"message": "Hello json"});
// });

function getThePresentTime() {
    return new Date().toString();
}

app.get("/now", function(req, res, next){
    req.time = getThePresentTime();
    next();
}, function(req, res){
    res.json({ time: req.time });
});

app.get("/:word/echo", function(req, res){
    res.send({ echo: req.params.word });
});

app.get("/name", function(req, res){
    res.json({ name: req.query.first + " " + req.query.last });
});

app.post("/name", function(req, res){
    res.json({ name: req.body.first + " " + req.body.last });
})































 module.exports = app;
