var map = L.map('map').setView([45.4773, 9.1815], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const socket = io.connect('http://localhost:3000');
socket.on('connect', function() {
  console.log("Connected to WS server");
});

socket.on('locations', function(data) {
  console.log(data);
  const color = parseInt(data.bus_id) === 1 ? '#ff0000' : '#00ff00';
  console.log(color);
  var marker = L.circle([data.lat, data.lon], {
    color: color,
    fillColor: color,
    fillOpacity: 0,
    radius: 25
  }).addTo(map);
});

socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

let visible = false;
const searchForm = document.getElementById('searchForm');
const mapContainer = document.getElementById('map');

function showForm() {
  if(visible) {
    searchForm.style.width = '0%';
    mapContainer.style.width = '100%'
  } else {
    searchForm.style.width = '20%';
    mapContainer.style.width = '80%'
  }
  visible = !visible
}

document.querySelector('#searchForm').addEventListener('animationend', function() {
  document.querySelector('#searchForm').classList.remove('bounceInLeft');
  document.querySelector('#searchForm').classList.remove('bounceOutLeft')
})
