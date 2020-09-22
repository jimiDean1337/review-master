import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AgmCoreModule } from '@agm/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { BusinessSearchComponent } from './business-search/business-search.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { LocationsBarComponent } from './locations-bar/locations-bar.component';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';
import { HovercardComponent } from './hovercard/hovercard.component';
import { GaClickComponent } from './directives/ga-click/ga-click.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { BizCardComponent } from './biz-card/biz-card.component';
import { RouterModule } from '@angular/router';
import { SearchCategoriesMenuComponent } from './search-categories-menu/search-categories-menu.component';

@NgModule({
  declarations: [SuggestionsComponent, BusinessSearchComponent, SafeHtmlPipe, LocationsBarComponent, ActivityFeedComponent, HovercardComponent, GaClickComponent, GoogleMapComponent, BizCardComponent, SearchCategoriesMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP9hhmeOGwMrCGNjor-KvDsPdu8cj2Zz4'
    }),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  exports: [
    CommonModule,
    RouterModule,
    BsDropdownModule,
    AlertModule,
    ModalModule,
    TooltipModule,
    PopoverModule,
    AccordionModule,
    CollapseModule,
    TabsModule,
    TypeaheadModule,
    BsDatepickerModule,
    ProgressbarModule,
    PaginationModule,
    TimepickerModule,
    SuggestionsComponent,
    BusinessSearchComponent,
    SafeHtmlPipe,
    LocationsBarComponent,
    ActivityFeedComponent,
    HovercardComponent,
    GaClickComponent,
    GoogleMapComponent,
    BizCardComponent,
    SearchCategoriesMenuComponent,
  ]
})
export class SharedModule { }
