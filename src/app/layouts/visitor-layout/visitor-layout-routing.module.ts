import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorWelcomeComponent } from 'src/app/pages/visitor-welcome/visitor-welcome.component';


const routes: Routes = [
  {
    path: '',
    component: VisitorWelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorLayoutRoutingModule { }
