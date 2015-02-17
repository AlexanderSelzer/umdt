module.exports = function(db) {
  var routes = {}

  routes.getData = function(req, res) {
    db.select("id", "tracking_type", "lat", "lon").from("data").then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      console.log(err)
      res.status(500)
    })
  }

  routes.postData = function(req, res) {
    var data = req.body
    if (!data) {
      return res.status(400).send("bad data")
    }

    db("data").insert({
      tracking_type: data.type,
      lat: data.lat,
      lon: data.lon
    }).then(function() {
      res.sendStatus(200)
    })
    .catch(function(err) {
      res.sendStatus(500)
    })

  }

  return routes
}
