import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GooglePlacesService } from 'src/app/core/services/google-places.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rm-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchCategory: string[];
  searchLocation: string[];
  searchAttributes: string[];
  searchCategoryFormatted$: Observable<string>;
  searchLocationFormatted$: Observable<string>;
  resultsSortType$: Observable<string>;
  constructor(private route: ActivatedRoute, private googlePlacesService: GooglePlacesService) { }

  ngOnInit(): void {
    // this.route.queryParamMap
    //   .subscribe((params: ParamMap) => {
    //     this.searchCategory = params.getAll('search_term');
    //     this.searchLocation = params.getAll('find_loc');
    //     this.searchAttributes = params.getAll('attrs');
    //     this.searchCategoryFormatted$ = Observable.create((obs: any) => {
    //       const searchTerm = params.getAll('search_term')[0];
    //     })
    //     this.searchLocationFormatted$ = this.googlePlacesService.getAddressByPlaceId(params.getAll('find_loc')[0]).pipe(
    //       map(result => result.formatted_address)
    //     )
    //   });
    this.searchCategoryFormatted$ = Observable.create((obs: any) => {
      obs.next('Restaurants');
    })
    this.searchLocationFormatted$ = Observable.create((obs: any) => {
      obs.next('Newark, OH');
    })
    this.resultsSortType$ = Observable.create((obs: any) => {
      obs.next('Recommended');
    })
  }

}
