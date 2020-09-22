import { LoggerService } from './../core/logger.service';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { CookiesService } from '../core/services/cookies.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
import { GooglePlacesService } from '../core/services/google-places.service';

export interface MapConfig {
  [key: string]: any;
}
@Component({
  selector: 'rm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  pageConfig$: Observable<any>;
  pageConfig: any;
  showMap = true;
  showFilter = true;
  mapConfig: MapConfig;
  locationStream$: Observable<any>;
  searchCategory: string[];
  searchLocation: string[];
  searchAttributes: string[];
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookiesService,
    private googlePlacesService: GooglePlacesService,
    private logger: LoggerService) { }

  private initSearchParams(placeId: string): void {
    this.googlePlacesService.getAddressByPlaceId(placeId)
      .subscribe(result => {
        this.mapConfig.center.lat = result.geometry.location.lat();
        this.mapConfig.center.lng = result.geometry.location.lng();
      })
  }

  public updateFilterAttributes(attr: string) {
    const url = location.href;
    this.router.navigateByUrl(url, { queryParams: { attr } })
  }

  ngOnInit(): void {
    this.mapConfig = {
      center: {
        lat: null,
        lng: null
      }
    };
    this.route.queryParamMap
    .subscribe((params: ParamMap) => {
    console.log("SearchComponent -> ngOnInit -> params", params)
      this.searchCategory = params.getAll('search_term');
      this.searchLocation = params.getAll('find_loc');
      this.searchAttributes = params.getAll('attrs');
      this.initSearchParams(params.get('find_loc'));
    });
  }

  ngAfterViewInit() {
  }

  naviageTo(url: string, queryParams: any) {
    return this.router.navigateByUrl(url, { queryParams, relativeTo: this.route });
  }

  updateSearchFilters(filter: any, attrs: any) {

  }

  initMap() {

  }

}
