let map;
let markers = [];

const setListener = () => {
  document
    .querySelectorAll(".silo__individualNames")
    .forEach((siloName, index) => {
      siloName.addEventListener("click", () => {
        google.maps.event.trigger(markers[index], "click");
      });
    });
};

const displaySiloList = () => {
  let siloHTML = "";
  silos.forEach((silo) => {
    siloHTML += `<h4 class="silo__individualNames">${silo.name}</h4>`;
  });
  document.getElementById("silo__names").innerHTML = siloHTML;
};

const createMarker = (coords, name, segurity, time, state, date) => {
  let html = `<div class="window">
                 <h2>${name}</h2>
                 <div class="segurity">
                    <i class="fa fa-user"></i>
                    <h3>${segurity}</h3>
                  </div>
                  <div class="time">
                    <i class="fas fa-clock"></i>
		    <h3>${time}</h3>
                  </div>
                  <div class="date">
                    <i class="fas fa-calendar"></i>
		    <h3>${date}</h3>
                  </div>
                  <div class="state">
                    <i class="fas fa-door-closed"></i>
		    <h3>${state}</h3>
                  </div>

              </div>`;
  const marker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: "./icons/silo.png",
  });
  google.maps.event.addListener(marker, "click", () => {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
};

const createLocationMarkers = () => {
  let bounds = new google.maps.LatLngBounds();
  silos.forEach((silo) => {
    let coord = new google.maps.LatLng(silo.lat, silo.lng);
    let name = silo.name;
    let segurity = silo.segurity;
    let time = silo.time;
    let state = silo.state;
    let date = silo.date;
    bounds.extend(coord);
    createMarker(coord, name, segurity, time, state, date);
    map.fitBounds(bounds);
  });
};

function initMap() {
  let buenos_aires = { lat: -34.59280, lng: -58.68053 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: buenos_aires,
    zoom: 14,
    mapId: "bf8a4e331dfa5dc5",
  });
  createLocationMarkers();
  infoWindow = new google.maps.InfoWindow();
  displaySiloList();
  setListener();
}
