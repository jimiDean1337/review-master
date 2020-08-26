import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BizRoutingModule } from './biz-routing.module';
import { BizComponent } from './biz.component';


@NgModule({
  declarations: [BizComponent],
  imports: [
    CommonModule,
    BizRoutingModule
  ]
})
export class BizModule { }
