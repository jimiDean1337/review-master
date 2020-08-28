import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { GooglePlacesService } from '../../core/services/google-places.service';
import { TypeaheadConfig } from 'ngx-bootstrap/typeahead';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { STATES } from './mock.data';
import { SEARCH_CATEGORIES } from './categories.data';

export interface SearchConfig {
  title?: string;
  showIcons?: boolean;
  [key: string]: any;
}

@Component({
  selector: 'rm-business-search',
  templateUrl: './business-search.component.html',
  styleUrls: ['./business-search.component.scss']
})
export class BusinessSearchComponent implements OnInit {
  @Input() config?: SearchConfig = {
    title: 'Find what you\'re looking for',
    showIcons: true
  };

  asyncSelectedLocation: string;
  asyncSelectedCategory: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  locationsDataSource$: Observable<any>;
  categoriesDataSource$: Observable<any>;
  locations = STATES;
  categories = SEARCH_CATEGORIES;
  geolocation: any;
  selectedLocation: TypeaheadMatch;
  selectedCategory: TypeaheadMatch;
  constructor(private searchService: SearchService, private googlePlacesService: GooglePlacesService) {
    this.locationsDataSource$ = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelectedLocation);
    })
      .pipe(
        mergeMap((token: string) => {
        console.log("BusinessSearchComponent -> location token -> token", token)
          return this.getDataAsObservable('location', token, 'name', this.locations)
        }),
        delay(500)
    );
    this.categoriesDataSource$ = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelectedCategory);
    })
    .pipe(
      mergeMap((token: string) => this.getDataAsObservable('category', token, 'title', this.categories)),
      );
    }
  private search(q: string, location?: any) {
    this.searchService.search(q, location);
  }

  getDataAsObservable(type: 'category'|'location', token: string, prop: string, data: any): Observable<any> {
    const query = new RegExp(token, 'i');
    return of(
      data.filter((key: any) => {
      console.log("BusinessSearchComponent -> key", key)
        // this[type] = key;
        return query.test(key[prop]);
      })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  selectAndSearch(e: TypeaheadMatch) {
    this.selectedCategory = e;
    console.log("BusinessSearchComponent -> selectInput -> e", e)
  }

  locationSelected(e: TypeaheadMatch): void {
    this.selectedLocation = e;
    console.log('Selected value: ', e);
  }

  ngOnInit(): void {
    this.googlePlacesService.init();
  }


}
