import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, tap } from 'rxjs/operators';
// import { TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { CookiesService } from '../../core/services/cookies.service';
import { GooglePlacesService, UserGeolocation, TargetSearchLocationData } from '../../core/services/google-places.service';

import { SEARCH_CATEGORIES, ALL_CATEGORIES } from '../../core/mocks/categories';
import { BusinessSearchComponentConfig } from '../../core/models/search.interface';
import { Router, ActivatedRoute } from '@angular/router';

export interface SelectedItem {
  [key: string]: any;
  description?: string;
  types?: any;
  type?: any;
  icon?: string;
  id?: string;
  value?: any;
}

@Component({
  selector: 'rm-business-search',
  templateUrl: './business-search.component.html',
  styleUrls: ['./business-search.component.scss']
})
export class BusinessSearchComponent implements OnInit {
  @Input() config?: BusinessSearchComponentConfig = {
    minimal: false,
  };

  @Input() isHeroSearch: boolean = false;

  @Output() newSearchCriteriaSet: EventEmitter<any> = new EventEmitter(true);
  @Output() locationSet: EventEmitter<any> = new EventEmitter(true);
  @Output() categorySet: EventEmitter<any> = new EventEmitter(true);

  location$: Observable<UserGeolocation>;
  asyncLocation: string;
  previousSelectedLocation: SelectedItem = {
    description: '',
    types: [],
    value: '',
    id: '',
  };
  asyncCategory: string;
  previousSelectedCategory: SelectedItem = {
    description: '',
    types: [],
    search_term: '',
    value: '',
    id: '',
  }
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  locationsDataSource$: Observable<any>;
  categoriesDataSource$: Observable<any>;
  initLocations: any;
  categories = SEARCH_CATEGORIES;
  allCategories = ALL_CATEGORIES;
  selectedLocation: SelectedItem = {
    description: '',
    types: [],
    value: '',
    id: '',
    city: ''
  };
  selectedCategory: SelectedItem = {
    description: '',
    value: '',
    search_term: '',
    id: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private googlePlacesService: GooglePlacesService,
    private cookie: CookiesService) {
    // Get autocomplete location results on input
    this.locationsDataSource$ = new Observable((obs: any) => {
      obs.next(this.asyncLocation);
    })
      .pipe(
        mergeMap((token: string) => {
          if (!token) {
          return of(this.initLocations)
          }
          return this.searchLocation(token);
        })
    );
    // Get autocomplete category results on input
    this.categoriesDataSource$ = new Observable((obs: any) => {
      obs.next(this.asyncCategory);
    })
      .pipe(
        mergeMap((token: string) => {
          if (!token) {
            return of(this.categories);
          }
          return this.searchCategory(token);
        })
    );
    }
  private searchLocation(q: string) {
    return this.googlePlacesService.getPlacePredictions(q);
  }

  searchCategory(q: string): Observable<any> {
      const query = new RegExp(q, 'i');
      return of(
        this.allCategories.filter((key: any) => {
          this.categorySet.emit(query.test(key.description))
          return query.test(key.description);
        })
        );

  }

  navigateTo(url: any, queryParams: any) {
    return this.router.navigate([`/${url}`], { queryParams });
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  selectAndSearch(e: TypeaheadMatch, isHeroSearch = false) {
    console.log("BusinessSearchComponent -> selectAndNavigate -> e", e)
    this.selectedCategory = e.item;
    this.categorySet.emit(e.item)
    if (!this.selectedLocation.description) {
      this.selectedLocation = this.previousSelectedLocation;
    }
    if (isHeroSearch) {
      this.navigateTo('search', { find_desc: e.item.search_term, find_loc: this.selectedLocation.id }).then(() => {
        this.cookie.add('previous_location', JSON.stringify(this.previousSelectedLocation));
      })
    }
    // console.log("Selected category match", e, this.selectedLocation);
  }

  locationSelected(e: TypeaheadMatch): void {
    // console.log("BusinessSearchComponent -> locationSelected -> e", e)
    let types = e.item.types;
    let value = e.item.description;
    let locationData: TargetSearchLocationData;
    this.location$.subscribe((results: UserGeolocation) => {
    if (types.includes('current_location')) {
      console.log("BusinessSearchComponent -> locationSelected -> results", results)
        results.geocoder$().subscribe((local: google.maps.GeocoderResult) => {
        // console.log("BusinessSearchComponent -> locationSelected -> local", results, local)
          this.selectedLocation.value = local.formatted_address;
          this.selectedLocation.types = local.types;
          this.selectedLocation.id = local.place_id;
          this.selectedLocation.description = local.formatted_address;
          this.previousSelectedLocation.value = local.formatted_address;
          this.previousSelectedLocation.types = ['previous_selection', ...local.types];
          this.previousSelectedLocation.id = local.place_id;
          this.previousSelectedLocation.description = local.formatted_address;
          this.selectedLocation.city = local.address_components[2].short_name;
          locationData = {
            place_id: local.place_id,
            formatted_address: local.formatted_address,
            userGeolocation: results,
            types: local.types
          }
          this.locationSet.emit(local.address_components[2].short_name);

          // this.cookie.add('previous_location', JSON.stringify(this.previousSelectedLocation));
        })
      } else {
        this.selectedLocation.value = value;
        this.selectedLocation.description = value;
        this.selectedLocation.id = e.item.place_id;
      this.selectedLocation.types = e.item.types;
        this.previousSelectedLocation.value = value;
        this.previousSelectedLocation.description = value;
        this.previousSelectedLocation.id = e.item.place_id;
        this.previousSelectedLocation.types = e.item.types;
        locationData = {
          place_id: e.item.place_id,
          formatted_address: e.item.value,
          userGeolocation: results,
          types: e.item.types
        }
        // this.cookie.add('previous_location', JSON.stringify(this.previousSelectedLocation));
        this.locationSet.emit(e.item.value);
      }
      this.googlePlacesService.setTargetLocationData(locationData);
    })
  }


  ngOnInit(): void {
    this.previousSelectedLocation = this.cookie.get('previous_location') || {
      description: '',
      types: [],
      value: '',
      id: '',
  };
    this.initLocations = [
      {
        description: 'Current Location',
        types: ['current_location'],
        value: '',
        id: '',
        icon: 'fa-location-arrow',
      },
      {
        icon: 'fa-clock',
        ...this.previousSelectedLocation
      }
    ];
    // const mapContainer: any = document.getElementById('map');
    this.googlePlacesService.init();
    this.location$ = this.googlePlacesService.getLocationStream();
  }


}
