import { NgModule } from '@angular/core';

import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorComponent } from './visitor.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [VisitorComponent],
  imports: [
    SharedModule,
    NavbarModule,
    FooterModule,
    VisitorRoutingModule
  ]
})
export class VisitorModule { }
