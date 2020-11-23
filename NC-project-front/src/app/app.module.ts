import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthorizationInterceptor} from './services/auth/authorization-interceptor.service';
import { ForgotPassEmailComponent } from './components/reset-pass/forgot-pass-email/forgot-pass-email.component';
import { ChangePassComponent } from './components/reset-pass/change-pass/change-pass.component';
import {SignupComponent} from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {ActivatedRouteSnapshot, Router, RouterModule} from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    ForgotPassEmailComponent,
    ChangePassComponent,
    SignupComponent,
    ProfileComponent,
    PageNotFoundComponent,
    NavbarComponent,
    MainMenuComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
