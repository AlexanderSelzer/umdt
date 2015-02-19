module.exports = function(db) {
  var routes = {}

  // GET /data
  routes.getData = function(req, res) {
    db.select("id", "tracking_type", "lat", "lon", "tracking_data").from("data").then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      console.log(err)
      res.status(500)
    })
  }

  // GET /data/:id
  routes.getDataById = function(req, res) {
    db.select("id", "tracking_type", "lat", "lon", "tracking_data")
    .from("data")
    .where("id", req.params.id)
    .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      console.log(err)
      res.status(500)
    })
  }

  // GET /api/data/wifi/:shost
  routes.getWifiDataByDevice = function(req, res) {
    var jsonQuery = {shost: req.params.shost}
    db.select("id", "tracking_type", "lat", "lon", "tracking_data")
      .from("data")
      .where("tracking_type", "wifi")
      .whereRaw("tracking_data @> ?", [jsonQuery])
      .then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      console.log(err)
      res.status(500)
    })
  }


  // POST /data
  routes.postData = function(req, res) {
    var data = req.body
    if (!data) {
      return res.status(400).send("bad data")
    }

    db("data").insert({
      created_at: new Date(),
      tracking_type: data.type,
      lat: data.lat,
      lon: data.lon,
      alt: data.alt,
      epx: data.epx,
      epy: data.epy,
      epv: data.epv,
      tracking_data: data.tracking_data
    }).then(function() {
      res.sendStatus(200)
    })
    .catch(function(err) {
      res.sendStatus(500)
      console.log(err)
    })

  }

  return routes
}
