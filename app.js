var express = require("express")
var bodyParser = require("body-parser")
var config = require("./config.json")
var db = require("./db")

var routes = require("./routes")(db)

var app = express()
app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.send("hi")
})

app.get("/data", routes.getData)
app.post("/data", routes.postData)

app.listen(8080)
