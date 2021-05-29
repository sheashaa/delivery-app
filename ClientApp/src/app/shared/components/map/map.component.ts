import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare var mapboxgl: any;
declare var MapboxGeocoder: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  @Output() onLocationChanged: EventEmitter<any> = new EventEmitter();

  @Input() latitude: number;
  @Input() longitude: number;
  @Input() isStatic: boolean = false;

  ngOnInit() {
    console.log(this.latitude);
    console.log(this.longitude);
    console.log(this.isStatic);

    this.longitude = this.longitude || 0;
    this.latitude = this.latitude || 0;

    mapboxgl.accessToken = environment.mapboxToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitude, this.latitude],
      zoom: 13
    });

    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([this.longitude, this.latitude])
      .addTo(map);

    if (!this.isStatic) {
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        this.onLocationChanged.emit({ longitude: lngLat.lng, latitude: lngLat.lat });
      });
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false
      });


      map.addControl(geocoder);
      geocoder.on('result', (e) => {
        console.log(e.result);
        const longitude = e.result.center[0];
        const latitude = e.result.center[1];
        console.log(longitude);
        console.log(latitude);
        marker.setLngLat({ lng: longitude, lat: latitude });
        this.onLocationChanged.emit({ longitude, latitude });
      });
      geocoder.on('results', (e) => {
        console.log(e);
      });
    }

  }
}
