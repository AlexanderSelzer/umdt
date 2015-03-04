module.exports = function(db, app) {
  var routes = {}

  app.get("/api/ping", function(req, res) {
    res.status(200)
  })

  // probably a bad idea if there is more than a bit of data
  app.get("/api/data", function(req, res) {
    db.select("id", "tracking_type", "lat", "lon", "tracking_data").from("data").then(function(data) {
      res.send(data)
    })
    .catch(function(err) {
      console.log(err)
      res.status(500)
    })
  })

  app.get("/api/data/:id", function(req, res) {
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
  })

  app.get("/api/data/wifi/shost/:shost", function(req, res) {
    var jsonQuery = {shost: req.params.shost}
    db.select("id", "tracking_type", "lat", "lon", "tracking_data", "created_at")
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
  })


  // TODO cache this!
  app.get("/api/data/wifi/unique", function(req, res) {
    var jsonQuery = {shost: req.params.shost}
    db.raw("select count(*), tracking_data->'shost' as shost from data group by shost")
      .then(function(data) {
      res.send(data.rows)
    })
    .catch(function(err) {
      console.log(err)
      res.status(500)
    })
  })


  app.post("/api/data", function(req, res) {
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
  })
}
