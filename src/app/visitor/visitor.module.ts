import { NgModule } from '@angular/core';

import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorComponent } from './visitor.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [VisitorComponent],
  imports: [
    SharedModule,
    VisitorRoutingModule
  ]
})
export class VisitorModule { }
