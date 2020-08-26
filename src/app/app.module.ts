import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
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


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ReviewComponent,
    LocationsComponent,
    SignoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP9hhmeOGwMrCGNjor-KvDsPdu8cj2Zz4',
      libraries: ['places']
    }),
    CoreModule,
    FooterModule,
    NavbarModule,
    SidebarModule,
    AppRoutingModule,
    VisitorModule,
    SharedModule,
    UserModule,
    BizModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
