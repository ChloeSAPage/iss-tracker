function requestISSLocation() {
  var apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data :", data);

      // once we have the new ISS location, update the page
      updateISSLocation(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// update the latitude and longitude displayed on the page
function updateISSLocation(data) {
  var latitudeElement = document.querySelector(".latitude");
  latitudeElement.textContent = data.latitude;

  var longitudeElement = document.querySelector(".longitude");
  longitudeElement.textContent = data.longitude;

  // update the map
  map.flyTo([data.latitude, data.longitude]);
  // update the marker
  marker.setLatLng([data.latitude, data.longitude]);
}

// create the map using leafletjs
var map = L.map("map").setView([0, 0], 15);
// set the map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// create ISS icon
var iss = L.icon({
  iconUrl: "images/ISS_spacecraft_model_1.png",
  shadowUrl: "images/shadow.png",

  iconSize: [70, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
});

var marker = L.marker([0, 0], { icon: iss }).addTo(map);

// also update location on page load
requestISSLocation();

// Automatically update location every 5 seconds, using setInterval instead of
//setTimeout for repeated execution
setInterval(requestISSLocation, 5000);
