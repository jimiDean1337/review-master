import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserAuthGuard } from './core/guards/user-auth.guard';
import { AdminAuthGuard } from './core/guards/admin-auth.guard';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: VisitorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/visitor-layout/visitor-layout.module').then(m => m.VisitorLayoutModule)
      }
    ]
  },
  {
    path: 'user/:userId',
    component: UserLayoutComponent,
    canActivate: [AngularFireAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule)
      }
    ]
  },
  {
    path: 'admin/:adminId',
    component: AdminLayoutComponent,
    canActivate: [AngularFireAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
