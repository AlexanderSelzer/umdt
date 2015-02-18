var config = require("./config.json")

var knex = require("knex")({
  client: "pg",
  connection: config.db
})

knex.schema.hasTable("data").then(function(exists) {
  if (!exists) {
    return knex.schema.createTable("data", function(t) {
      t.increments("id").primary()
      t.timestamps()
      // bluetooth, WiFi, etc
      t.string("tracking_type", 128)
      // tracking type specific data
      t.json("tracking_data", true)
      /* this is basically the GPSd data
       * Some fields can be null
       * Lat, long and errors are of course the most important, but others are
       * collected just in case they might be useful some time.
       * */
      t.float("lat").index()
      t.float("lon").index()
      t.float("alt")
      t.float("epx") // lat error
      t.float("epy") // long error
      t.float("epv") // altitude error
      t.float("speed")
      t.float("climb")
    }).then(function() {
      knex.raw("create index tracking_data_index on data using gin (tracking_data)").catch(function(err) {
        console.log(err)
      })
    })
  }
})

module.exports = knex
