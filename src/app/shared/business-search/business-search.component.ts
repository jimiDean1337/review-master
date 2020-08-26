import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';

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

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  search(q: string, location?: any) {
    this.searchService.search(q, location);
  }

}
