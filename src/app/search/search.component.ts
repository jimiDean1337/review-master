import { LoggerService } from './../core/logger.service';
import { Component, OnInit } from '@angular/core';
import { CookiesService } from '../core/services/cookies.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GooglePlacesService } from '../core/services/google-places.service';

export interface MapConfig {
  [key: string]: any;
}
@Component({
  selector: 'rm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookiesService,
    private googlePlacesService: GooglePlacesService,
    private logger: LoggerService) { }

  initPageState(placeId: string): void {
    this.googlePlacesService.getAddressByPlaceId(placeId)
      .subscribe(result => {
        this.mapConfig.center.lat = result.geometry.location.lat();
        this.mapConfig.center.lng = result.geometry.location.lng();
      })
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
      this.searchCategory = params.getAll('search_term');
      this.searchLocation = params.getAll('find_loc');
      this.searchAttributes = params.getAll('attrs');
      this.initPageState(params.getAll('find_loc')[0]);
    });
  }

  naviageTo(url: string, queryParams: any) {
    return this.router.navigateByUrl(url, { queryParams, relativeTo: this.route });
  }

  updateSearchFilters(filter: any, attrs: any) {

  }

  initMap() {

  }

}
