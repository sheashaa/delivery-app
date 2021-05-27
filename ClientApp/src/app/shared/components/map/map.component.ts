import { Component } from '@angular/core';

declare var mapboxgl: any;
declare var MapboxGeocoder: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaG9wbW9uIiwiYSI6ImNrcDVsbG84ajAzZ3gycXBnZjdwajVqb2IifQ.SozMNla6DgDs8W2sQyPR-g';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.4512, 43.6568],
      zoom: 13
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    );
  }
  
}
