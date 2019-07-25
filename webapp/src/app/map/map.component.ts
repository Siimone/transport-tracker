import {Component, NgZone, OnInit} from '@angular/core';

declare let L;
declare let io;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  mymap: any;

  ngOnInit() {
    this.mymap = L.map('map').setView([45.4773, 9.1815], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);

    const socket = io.connect('http://localhost:3000');
    socket.on('connect', function() {
      console.log('Connected to WS server');
    });

    socket.on('locations', (data) => {
      console.log(data);
      const color = parseInt(data.bus_id) === 1 ? '#ff0000' : '#00ff00';
      L.circle([data.lat, data.lon], {
        radius: 200,
        color: color
      }).addTo(this.mymap);
    });

    socket.on('error', console.error.bind(console));
    socket.on('message', console.log.bind(console));
  }
}
