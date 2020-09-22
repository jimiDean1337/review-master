import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rm-locations-bar',
  templateUrl: './locations-bar.component.html',
  styleUrls: ['./locations-bar.component.scss']
})
export class LocationsBarComponent implements OnInit {
  currentCity$: Observable<any>;
  constructor() { }

  ngOnInit(): void {
    this.currentCity$ = new Observable((obs: any) => {
      obs.next('Newark')
    })
  }

}
