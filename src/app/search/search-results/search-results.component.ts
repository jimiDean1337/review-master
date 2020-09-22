import { BIZ_LIST } from './../../core/mocks/biz-list';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GooglePlacesService } from 'src/app/core/services/google-places.service';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

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
  bizSearchResults$: Observable<any>;
  constructor(private router: Router, private route: ActivatedRoute, private googlePlacesService: GooglePlacesService) { }

  public getBizPriceLevel(level: number) {
    let results = [];
    for (let i = 0, len = level; i < len; i++) {
      results.push('$');
    }
    return results.join('');
  }

  public updateQuery(category: string, location: string) {
    return this.router.navigateByUrl('search', {queryParams: {find_desc: category, find_loc: location}})
  }
  ngOnInit(): void {
    this.bizSearchResults$ = new Observable((obs: any) => {
      obs.next(BIZ_LIST);
    });
    // this.route.queryParamMap
    //   .subscribe((params: ParamMap) => {
    //     this.searchCategory = params.getAll('search_term');
    //     this.searchLocation = params.getAll('find_loc');
    //     this.searchAttributes = params.getAll('attrs');
    //     this.searchCategoryFormatted$ = new Observable((obs: any) => {
    //       const searchTerm = params.getAll('search_term')[0];
    //     })
    //     this.searchLocationFormatted$ = this.googlePlacesService.getAddressByPlaceId(params.getAll('find_loc')[0]).pipe(
    //       map(result => result.formatted_address)
    //     )
    //   });
    this.searchCategoryFormatted$ = new Observable((obs: any) => {
      obs.next('Restaurants');
    })
    this.searchLocationFormatted$ = new Observable((obs: any) => {
      obs.next('Newark, OH');
    })
    this.resultsSortType$ = new Observable((obs: any) => {
      obs.next('Recommended');
    })
  }

}
