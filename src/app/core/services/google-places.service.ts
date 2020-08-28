import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { extend } from 'jquery';

export interface PlacesRequest {
  location?: google.maps.LatLng;
  radius?: number;
  type?: string[];
  query?: string | string[];
  fields?: string | string;
}
@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  // apiKey = 'AIzaSyAP9hhmeOGwMrCGNjor-KvDsPdu8cj2Zz4';
  places = google.maps.places;
  requestStatus = google.maps.places.PlacesServiceStatus;
  geolocation = {
    lng: null,
    lat: null,
    rad: null
  }
  config = {
    map: null,
    service: null,
    infowindow: null,
    home: null,
  };

  currentRequest: PlacesRequest = null;
  defaults = {
    zoom: 15,
  };
  query: string;

  constructor(private http: HttpClient) { }

  init() {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log("GooglePlacesService -> getGeolocation -> position", pos)
      this.config.home = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      this.geolocation.lat = pos.coords.latitude;
      this.geolocation.lng = pos.coords.longitude;
      this.geolocation.rad = 100;
      this.config.infowindow = new google.maps.InfoWindow();
      this.config.map = new google.maps.Map(document.getElementById('map'), { center: this.config.home, zoom: this.defaults.zoom });
    }, err => alert('ERROR: The Geolocation Service Failed!'), { enableHighAccuracy: true });
    // extend(true, this.config, config, this.defaults);
    // console.log("GooglePlacesService -> init -> this.config", this.config)

  }

  setHome(lat, lng) {
    this.config.home = new google.maps.LatLng(lat, lng);
  }

  autocomplete() {}

  getDetails() { }

  getPhoto() {}

  queryAutocomplete() {}

  nearby(request: PlacesRequest) {
    this.config.service.nearbySearch(request, (results, status) => {
      this.requestStatus = google.maps.places.PlacesServiceStatus;
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          console.log("GooglePlacesService -> getGeolocation -> results[i]", results[i])
        }
      }
    })
  }

  findPlaceFromText() {}




}
