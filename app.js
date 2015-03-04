var express = require("express")
var bodyParser = require("body-parser")
var config = require("./config.json")
var db = require("./db")

var app = express()
app.use(bodyParser.json())

app.use(express.static("static"))

app.get("/", function(req, res) {
  res.send("hi")
})

var routes = require("./routes")(db, app)

app.listen(8080)
