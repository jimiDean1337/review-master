import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [SearchComponent, SearchResultsComponent],
  imports: [
    SharedModule,
    NavbarModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
