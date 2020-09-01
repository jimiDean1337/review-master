import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { VisitorComponent } from './visitor/visitor.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { ReviewComponent } from './pages/review/review.component';
import { BizComponent } from './biz/biz.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: VisitorComponent, loadChildren: () => import('./visitor/visitor.module').then(m => m.VisitorModule) },
  { path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', component: UserComponent, canActivate: [AngularFireAuthGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {path: 'biz/:q', component: BizComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'seeyalater', component: SignoutComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'writeareview', component: ReviewComponent },
  { path: 'search', component: SearchComponent, loadChildren: () => import('./search/search.module').then(m => m.SearchModule)},
  {path: 'welcome', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
