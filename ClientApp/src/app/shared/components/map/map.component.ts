import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { MapService } from '../../services/map.service';

declare var mapboxgl: any;
declare var MapboxGeocoder: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  @Output() onLocationChanged: EventEmitter<any> = new EventEmitter();

  @Input() waypoints: Array<any> = [];
  @Input() isStatic: boolean = false;

  constructor(private toastr: ToastrService, private mapService: MapService) {

  }

  ngOnInit() {
    if (this.waypoints.length == 0) {
      this.waypoints.push([29.871903452398, 26.4941838299718])
    }

    const center = this.mapService.getCentroid(this.waypoints);
    console.log(center);

    mapboxgl.accessToken = environment.mapboxToken;

    //mapboxgl.setRTLTextPlugin(
    //  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    //  null,
    //  true
    //);

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center
      //maxBounds: [
      //  [24.6928900008484, 21.9838004],
      //  [36.9936810988403, 31.7117958927326]
      //]
    });

    if (this.waypoints.length == 1) {
      const marker = new mapboxgl.Marker({
        draggable: !this.isStatic
      })
        .setLngLat(center)
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
    else {
      const waypoints = this.waypoints;

      map.on('load', function () {
        console.log(waypoints);
        function getLinesSource(points) {
          const lines = {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'LineString',
                  'coordinates': points
                }
              }
            ]
          };
          const source = {
            'type': 'geojson',
            'data': lines
          };
          return source;
        }

        function getPointsSource(points) {
          let features = [];
          for (const point of points) {
            const feature = {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': point
              }
            };
            features.push(feature);
          }
          const data = {
            'type': 'FeatureCollection',
            'features': features
          };
          const source = {
            'type': 'geojson',
            'data': data
          };
          return source;
        }

        const route = getLinesSource(waypoints);
        console.log(route);
        map.addSource('LineString', route);
        map.addLayer({
          'id': 'LineString',
          'type': 'line',
          'source': 'LineString',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#FF0000',
            'line-width': 3
          }
        });
        const _restaurants = waypoints.slice(0, waypoints.length - 1);
        console.log('wahgahaha');
        console.log(_restaurants);
        const restaurants = getPointsSource(_restaurants);
        console.log(restaurants);
        map.addSource('Points', restaurants);
        map.addLayer({
          'id': 'points',
          'type': 'circle',
          'source': 'Points',
          'paint': {
            'circle-radius': 5,
            'circle-color': '#00FF00'
          }
        });

        const _customer = waypoints[waypoints.length - 1];
        const customer = getPointsSource([_customer]);
        console.log('ddd');
        console.log(customer);
        map.addSource('Point', customer);
        map.addLayer({
          'id': 'point',
          'type': 'circle',
          'source': 'Point',
          'paint': {
            'circle-radius': 5,
            'circle-color': '#0000FF'
          }
        });

        const bounds = waypoints.reduce(
          (bounds, coord) => bounds.extend(coord),
          new mapboxgl.LngLatBounds(waypoints[0], waypoints[0]));

        map.fitBounds(bounds, {
          padding: 20
        });

        console.log(map);
      });
    }
  }




}
