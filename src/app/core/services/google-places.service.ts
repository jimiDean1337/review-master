import { Injectable } from '@angular/core';
import { AutocompletePrediction, QueryAutocompletePrediction, AutocompleteRequest, QueryAutocompleteRequest } from '../models/search.interface';
import { Observable, of, interval} from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  // apiKey = 'AIzaSyAP9hhmeOGwMrCGNjor-KvDsPdu8cj2Zz4';
  places = google.maps.places;
  geolocation = {
    hasLocation: false,
    lat: null,
    lng: null,
    accuracy: null,
  }

  searchResults$: Observable<any>;

  public results = [];
  constructor() {

  }

  init() {
    this.setGeolocation();
    setInterval(() => {
      this.setGeolocation();
    }, 10000)
  }

  private setGeolocation() {
      navigator.geolocation.getCurrentPosition(pos => {
      // console.log("GooglePlacesService -> init -> pos", pos)
        this.geolocation = {
          hasLocation: true,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        };
      }, err => {
          this.geolocation.hasLocation = false;
        alert('ERROR: The Geolocation Service Failed!')
      },
        { enableHighAccuracy: true }
      )
  }
  autocomplete(input: string, local?: any): Observable<any> {
    let location;
    if (!local) {
      location = this.geolocation.hasLocation ? new google.maps.LatLng(this.geolocation.lat, this.geolocation.lng) : null;
    } else {
      location = new google.maps.LatLng(local.lat, local.lng)
    }
    return Observable.create((obs: any) => {
      new google.maps.places.AutocompleteService().getQueryPredictions({ input, location, radius: 15000 }, (predictions: QueryAutocompletePrediction[], status) => {
      console.log("GooglePlacesService -> predictions", predictions)
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          obs.next([{ description: 'Failed to get current location', icon: 'fa-warning' }]);
        }
        obs.next(predictions);
      });
    })
  }

  getLocationByLatLng(lat, lng) {
    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'location': { lat, lng } }, (results, status) => {
    console.log("getLocationByLatLng -> results", results)
    })
  }

  getDetails() {}

  getPhoto() {}

  public queryAutocomplete(input: string): Observable<any> {
    return Observable.create((obs: any) => {
      new google.maps.places.AutocompleteService().getPlacePredictions({ input }, (predictions: QueryAutocompletePrediction[], status) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          obs.next([{description:'Failed to get current location', icon: 'fa-warning'}]);
        }
        obs.next(predictions);
      });

    })
  }
  findPlaceFromText() {}




}
