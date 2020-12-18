import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ActionComponent } from './components/action/action/action.component';
import { AppComponent } from './components/app/app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
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
import { CompoundListComponent } from './components/compound-list/compound-list.component';
import { CompoundEditComponent } from './components/compound-edit/compound-edit.component';
import {MatSortModule} from '@angular/material/sort';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ListProjectComponent } from './components/list-project/list-project.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListTestCaseComponent } from './components/list-test-case/list-test-case.component';
import { RunningTestCaseComponent } from './components/running-test-case/running-test-case.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { TestScenariosComponent } from './components/test-scenarios/test-scenarios.component';
import { TestCaseComponent } from './components/test-case/test-case.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ListDataSetComponent } from './components/data-set/list-data-set/list-data-set.component';
import { DataSetDetailsComponent } from './components/data-set/data-set-details/data-set-details.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { DetailsComponent } from './components/details/details.component';
import {WebSocketService} from './services/webSocket/web-socket.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TestCaseHistoryComponent } from './components/test-case-history/test-case-history.component';
import {CreateScenarioComponent} from "./components/create-scenario/create-scenario.component";
import { ReportComponent } from './components/report/report.component';

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
    CompoundListComponent,
    CreateProjectComponent,
    CompoundEditComponent,
    ListProjectComponent,
    CreateUserComponent,
    ListUsersComponent,
    ListTestCaseComponent,
    RunningTestCaseComponent,
    ListDataSetComponent,
    DataSetDetailsComponent,
    TestScenariosComponent,
    TestCaseComponent,
    ListDataSetComponent,
    DataSetDetailsComponent,
    TestCaseHistoryComponent,
    CreateScenarioComponent,
    DetailsComponent,
    ReportComponent
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
        MatSortModule,
        DragDropModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatSnackBarModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    // useValue: { appearance: 'fill' },
    useClass: AuthorizationInterceptor,
    multi: true,
  }, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
