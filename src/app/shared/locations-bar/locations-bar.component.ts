import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'rm-locations-bar',
  templateUrl: './locations-bar.component.html',
  styleUrls: ['./locations-bar.component.scss']
})
export class LocationsBarComponent implements OnInit {
  city$: Subject<string>;
  @Input()
  get city(): string { return this._city; }
  set city(city: string) {
    console.log("LocationsBarComponent -> setcity -> city", city)
    this._city = city;
    this.city$.next(city);
  }
  private _city = '';

  constructor() {
    this.city$ = new Subject();
  }

  ngOnInit(): void {

  }

}
