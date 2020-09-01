import { Injectable } from '@angular/core';
import { GooglePlacesService } from './google-places.service';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTerms = [];

  request = {}

  constructor(private googlePlacesService: GooglePlacesService) {
  }

  init() {
    this.googlePlacesService.init();
  }


  search(query: any) {
    return this.googlePlacesService.queryAutocomplete(query);
  }
}
