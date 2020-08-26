import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rm-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
