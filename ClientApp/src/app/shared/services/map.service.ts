import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getRoute(waypoints: Array<any>) {
    if (!waypoints || waypoints.length < 2) return null;
    const profile = 'driving';
    const coordinates = waypoints.map(waypoint => waypoint.join(',')).join(';');
    const accessToken = environment.mapboxToken;
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?access_token=${accessToken}&geometries=${geometries}`;
    return this.http.get(url);
  }

  getCentroid(waypoints: Array<any>) {
    const longitude = waypoints.map(waypoint => waypoint[0]).reduce((prev, curr) => prev + curr);
    const latitude = waypoints.map(waypoint => waypoint[1]).reduce((prev, curr) => prev + curr);
    return waypoints.length && [longitude / waypoints.length, latitude / waypoints.length];
  }
}
