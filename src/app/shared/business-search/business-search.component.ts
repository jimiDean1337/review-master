import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, delay, switchMap } from 'rxjs/operators';
// import { TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { CookieService } from 'ngx-cookie-service';
import { GooglePlacesService } from '../../core/services/google-places.service';
import { SearchService } from '../../core/services/search.service';

import { SEARCH_CATEGORIES, SEARCH_CATEGORY_TYPES, ADDITIONAL_CATEGORIES, ALL_CATEGORIES } from '../../core/mocks/categories';
import { BusinessSearchComponentConfig } from '../../core/models/search.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rm-business-search',
  templateUrl: './business-search.component.html',
  styleUrls: ['./business-search.component.scss']
})
export class BusinessSearchComponent implements OnInit {
  @Input() config?: BusinessSearchComponentConfig = {
    title: 'Find what you\'re looking for',
    showIcons: true
  };

  asyncLocation: string;
  previousSelectedLocation = {
    desription: 'Newark, OH, USA',
    place_id: 'ChIJfRGAsNkXOIgRHJm04TVsYRE'
  };
  asyncCategory: string;
  previousSelectedCategory = {
    title: 'Restaurants'
  }
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  locationsDataSource$: Observable<any>;
  categoriesDataSource$: Observable<any>;
  initLocations = [
    {
      description: 'Current Location',
      type: 'current_location',
      icon: 'fa-location-arrow'
    },
    {
      description: this.previousSelectedLocation.desription,
      icon: 'fa-clock'
    }
  ];
  categories = SEARCH_CATEGORIES;
  categoryTypes = SEARCH_CATEGORY_TYPES;
  additionalCategories = ADDITIONAL_CATEGORIES;
  allCategories = ALL_CATEGORIES;
  selectedLocation: any;
  selectedCategory: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private googlePlacesService: GooglePlacesService,
    private cookie: CookieService) {
    // Get autocomplete location results on input
    this.locationsDataSource$ = Observable.create((observer: any) => {
      observer.next(this.asyncLocation);
    })
      .pipe(
        mergeMap((token: string) => {
          if (!token) {
          return of(this.initLocations)
          }
          return this.searchLocation(token);
        }),
        delay(500)
    );
    // Get autocomplete category results on input
    this.categoriesDataSource$ = Observable.create((observer: any) => {
      observer.next(this.asyncCategory);
    })
    .pipe(
      mergeMap((token: string) => {
        if (!token) {
          return of(this.categories);
        }
        return this.searchCategory(token);
      }),
      delay(500)
      );
    }
  private searchLocation(q: string) {
    return this.googlePlacesService.queryAutocomplete(q)
  }


  setCurrentLocation() {

  }

  searchCategory(q: string): Observable<any> {
      const query = new RegExp(q, 'i');
      return of(
        this.allCategories.filter((key: any) => {
          return query.test(key.description);
        })
        );

  }

  navigateTo(url: any, queryParams: any) {
    this.router.navigate([`/${url}`], {queryParams})
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  selectAndNavigate(e: TypeaheadMatch) {
    this.selectedCategory = e;
    this.navigateTo('search', {find_desc: e.item.search_term})
    console.log("Selected category match", e)
  }

  locationSelected(e: TypeaheadMatch): void {
    // if (e.item.type && e.item.type === 'current_location') {
    //   this.googlePlacesService.
    // }
    this.selectedLocation = e.item.description;
    console.log('Selected location match: ', e);
  }

  ngOnInit(): void {
    this.googlePlacesService.init();
  }


}
