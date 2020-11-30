import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ActionComponent } from './components/action/action/action.component';
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
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ListProjectComponent } from './components/list-project/list-project.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CompoundListComponent } from './components/compound-list/compound-list.component';
import { CompoundEditComponent } from './components/compound-edit/compound-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    ActionComponent,
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
    CreateProjectComponent,
    ListProjectComponent,
    CreateUserComponent,
    ListUsersComponent,
    CompoundListComponent,
    CompoundEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    DragDropModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    // useValue: { appearance: 'fill' },
    useClass: AuthorizationInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
