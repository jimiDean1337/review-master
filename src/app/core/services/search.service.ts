import { Injectable } from '@angular/core';
import { GooglePlacesService } from './google-places.service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private googlePlacesService: GooglePlacesService) {
  }
}
