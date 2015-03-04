var map = L.map("map").setView([48, 16], 9)

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var dataView = $(".data")

/* 
 * Loading everything at once is not very scalable,
 * and adding it all at once to the map makes the browser get
 * stuck pretty badly.
 */

function macColor(mac) {
  var values = mac.split(":").map(function(hex) {
    return parseInt(hex, 16)
  })

  var rgb = [values[1], values[3], values[5]]
  return "rgb(" + rgb.join(",") + ")"
}

function addDataToMap(data) {
  /*
  var markers = new L.MarkerClusterGroup()
  */

  data.forEach(function(d) {
    var coords = [d.lat, d.lon]

    map.addLayer((new L.CircleMarker(coords, {color: macColor(d.tracking_data.shost)}))
        .setRadius(8)
        .bindPopup(d.tracking_data.shost + "<br />" + d.created_at))
  })
  map.addLayer(markers)
}

$.get("api/data/wifi/unique", function(uniqueDevices) {
  uniqueDevices.sort(function(a, b) {
    return b.count - a.count
  }).forEach(function(device) {
    console.log(device)
    var listItem = $("<div>").addClass("list-item")
    listItem.append($("<div>").addClass("field").text(device.count))
    listItem.append($("<div>").addClass("field").text(device.shost))
    dataView.append(listItem)

    listItem.on("click", function() {
      $.get("/api/data/wifi/shost/" + device.shost, function(res) {
        addDataToMap(res)
      })
    })
  })
})
