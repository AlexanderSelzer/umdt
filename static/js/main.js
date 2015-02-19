var map = L.map("map").setView([48, 16], 9)

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.get("api/data", function(data) {
  var devices = {}

  data.forEach(function(d) {
    var mac = d.tracking_data.shost
    var coords = [d.lat, d.lon]

    if (!devices[mac])
      devices[mac] = [coords]
    else
      devices[mac].push(coords)
  })

  Object.keys(devices).forEach(function(mac) {
    var locations = devices[mac]

    locations.forEach(function(coords) {
      L.marker(coords).addTo(map)
        .bindPopup(mac)
    })
  })
})  
