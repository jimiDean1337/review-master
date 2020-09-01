import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AppComponent } from './app.component';
import { VisitorModule } from './visitor/visitor.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ReviewComponent } from './pages/review/review.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { BizModule } from './biz/biz.module';
import { SignoutComponent } from './pages/signout/signout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SearchModule } from './search/search.module';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ReviewComponent,
    LocationsComponent,
    SignoutComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FooterModule,
    NavbarModule,
    SidebarModule,
    VisitorModule,
    SharedModule,
    UserModule,
    BizModule,
    AppRoutingModule,
    SearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
