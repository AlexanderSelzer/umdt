var express = require("express")
var bodyParser = require("body-parser")
var config = require("./config.json")
var db = require("./db")

var routes = require("./routes")(db)

var app = express()
app.use(bodyParser.json())

app.use(express.static("static"))

app.get("/", function(req, res) {
  res.send("hi")
})

app.get("/api/ping", routes.ping)
app.get("/api/data", routes.getData)
app.get("/api/data/:id", routes.getDataById)
app.get("/api/data/wifi/shost/:shost", routes.getWifiDataByDevice)
app.get("/api/data/wifi/unique", routes.getUniqueWifiDevices)
app.post("/api/data", routes.postData)

app.listen(8080)
