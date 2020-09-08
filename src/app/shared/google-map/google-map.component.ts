import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rm-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() lat: number;
  @Input() lng: number;
  @Input() zoom: number;
  @Input() height: string = '600px';
  @Input() width: string = '600px';
  constructor() { }

  ngOnInit(): void {

  }

}
// TODO: Add map options and config
// TODO: Add map data injection for search results markers etc
