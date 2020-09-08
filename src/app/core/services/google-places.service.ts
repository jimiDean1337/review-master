import { Injectable } from '@angular/core';
import { AutocompletePrediction, QueryAutocompletePrediction, AutocompleteRequest, QueryAutocompleteRequest } from '../models/search.interface';
import { Observable, of, interval} from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface LocationLogEntry {
  [key: string]: any;
  message?: string;
  description?: string;
};
export interface TargetSearchLocationData {
  [key: string]: any;
  selectedLocation?: any;
  geocoder?: google.maps.GeocoderResult,
  userLocation?: UserGeolocation;
};
export interface UserGeolocation {
  [key: string]: any;
  hasLocation?: boolean;
  lat?: number;
  lng?: number;
  accuracy?: number;
  location?: google.maps.LatLng;
  geocoder$?: () => Observable<any>;
};

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {

  /**Google Places */
  places: google.maps.places.PlacesService;
  /**Object containing user geolocation data */
  geolocation: UserGeolocation;
  /** Service history log entries array */
  locationSelectionLog: LocationLogEntry[] = [];
  /**Observable of most recent search results */
  searchResults$: Observable<any>;
  /**Observable of users geolocation data */
  currentLocationStream$: Observable<UserGeolocation>;
  targetSearchLocationData$: Observable<TargetSearchLocationData>;
  constructor() {}

  /**Add a new entry into GooglePlacesService History log */
  private addLogEntry(entry: LocationLogEntry) {
    this.locationSelectionLog.push(entry);
    console.log(entry)
  }

  /** Retrieve Observable of current geolocation using navigator.geolocation.getCurrentPosition */
  private getNavigatorGeolocation(): Observable<Coordinates> {
    const geolocation = navigator.geolocation;
    return Observable.create((obs: any) => {
      geolocation.getCurrentPosition(pos => {
        obs.next(pos.coords);
        this.addLogEntry(
          {
            message: 'Retrieved current position',
            geolocation,
            pos
          }
        )
      }, err => this.addLogEntry(
        {
          message: 'ERROR! Failed to get geolocation', err
        }
      ), { enableHighAccuracy: true })
    })
  }

  public setTargetLocationData(data: TargetSearchLocationData) {
    this.targetSearchLocationData$ = Observable.create((obs: any) => {
      obs.next(data);
    })
  }

  /**Initialize GooglePlacesService */
  public init(map: google.maps.Map<Element>) {
    this.places = new google.maps.places.PlacesService(map)
    this.currentLocationStream$ = this.getLocationStream();
  }

  public getAddressByPlaceId(placeId: string): Observable<google.maps.GeocoderResult> {
    const geocoder = new google.maps.Geocoder;
    return Observable.create((obs: any) => {
      geocoder.geocode({ placeId }, (results, status) => {
        if (status !== 'OK') {
          alert(status);
          obs.next({error: status, message: 'Error getting goecod from place_id'})
        } else {
          obs.next(results[0]);
          this.addLogEntry(
            {
              message: `Retrieved Geocode from place_id: ${placeId}`,
              results,
              status
            }
          )
        }
      })
    })
  }

  /**Retrieve formated address from coords */
  public getAddressByLatLng(lat: number, lng: number): Observable<google.maps.GeocoderResult> {
    const geocoder = new google.maps.Geocoder;
    return Observable.create((obs: any) => {
      geocoder.geocode({ 'location': { lat, lng } }, (results, status) => {
        if (status !== 'OK') {
          alert(status);
          obs.next(
            [
              {
                description: 'Failed to get current location',
                icon: 'fa-warning'
              }
            ]
          );
          this.addLogEntry(
            {
              message: 'ERROR! Failed method: getLocationByLatLng', status, lat, lng
            }
          )
        } else {
          obs.next(results[0]);
          this.addLogEntry(
            {
              message: 'method: getAddressByLatLng',
              result: results[0], results, status, lat, lng
            }
          )
        }
      })
    })
  }

  /**  Retrieve Observable of location data */
  public getCurrentLocationAddress(): Observable<google.maps.GeocoderResult> {
    const message = 'method: getCurrentLocationAddress';
    const description = 'Retrieves current coords and returns location data including address';
    return Observable.create((obs: any) => {
      this.currentLocationStream$.subscribe(coords => {
        this.getAddressByLatLng(coords.latitude, coords.longitude).subscribe(location => {
          obs.next(location);
          this.addLogEntry({ message,description,location})
        })
      })
    })
  }

  /**Retrieve autocompleted location search results based on input */
  public getQueryPredictions(input: string, local?: any): Observable<QueryAutocompletePrediction[]> {
    const service = new google.maps.places.AutocompleteService();
    return Observable.create((obs: any) => {
      this.currentLocationStream$.subscribe(results => {
        const location = results.location;
        service.getQueryPredictions({ input, location, radius: 500 }, (predictions: QueryAutocompletePrediction[], status) => {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            obs.next(
              [
                {
                  description: 'Failed to get current location',
                  icon: 'fa-warning'
                }
              ]
            );
          } else {
            obs.next(predictions);
            this.addLogEntry(
              {
                message: 'method: getQueryPredictions',
                description: 'Retrieves query autocomplete predictions based on the supplied query autocomplete request.',
                results: predictions, status, input, local
              }
            )
          }
        });
      })
    })
  }

  /**Retrieve an Observable of users geolocation data */
  public getLocationStream(): Observable<UserGeolocation> {
    return this.getNavigatorGeolocation()
      .pipe(
        map(coords => {
          this.geolocation = {
            hasLocation: true,
            lat: coords.latitude,
            lng: coords.longitude,
            accuracy: coords.accuracy,
            location: new google.maps.LatLng(coords.latitude, coords.longitude),
            geocoder$: (): Observable<any> => {
              return Observable.create((obs: any) => {
                this.getAddressByLatLng(coords.latitude, coords.longitude)
                  .subscribe(local => {
                  obs.next(local)
                })
              })
            }
          };
          this.addLogEntry(
            {
              message: 'Retrieved location stream',
              coords,
              geolocation: this.geolocation
            }
          )
          return this.geolocation;
        })
      )
  }

  /**Retrieve autocompleted 'Place' search results based on input */
  public getPlacePredictions(input: string, requestConfig?: google.maps.places.AutocompletionRequest): Observable<google.maps.places.QueryAutocompletePrediction[]> {
    const service: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService();
    return Observable.create((obs: any) => {
      service.getPlacePredictions({
        input,
        ...requestConfig
      }, (predictions: QueryAutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          obs.next(
            [
              {
                description: 'Failed to get current location',
                icon: 'fa-warning'
              }
            ]
          );
          this.addLogEntry(
            {
              message: 'ERROR! Failed method: queryAutocomplete', status, input
            }
          )
        }
        obs.next(predictions);
          this.addLogEntry(
            {
              message: 'method: getPlacePrediction',
              description: 'Retrieves place autocomplete predictions based on the supplied autocomplete request.', predictions, status, input
            }
          )
      });

    })
  }
}
