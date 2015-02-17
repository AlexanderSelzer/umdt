var config = require("./config.json")

var knex = require("knex")({
  client: "pg",
  connection: config.db
})

knex.schema.hasTable("data").then(function(exists) {
  if (!exists) {
    return knex.schema.createTable("data", function(t) {
      t.increments("id").primary()
      t.string("type", 128)
    })
  }
})

module.exports = knex
