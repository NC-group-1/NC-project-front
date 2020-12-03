import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateUserComponent} from './components/create-user/create-user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {ForgotPassEmailComponent} from './components/reset-pass/forgot-pass-email/forgot-pass-email.component';
import {ChangePassComponent} from './components/reset-pass/change-pass/change-pass.component';
import {SignupComponent} from './components/signup/signup.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileResolverService} from './services/profile/profile-resolver.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SettingsComponent} from './components/settings/settings.component';
import {LoginActivateGuard} from './guards/login-activate.guard';
import {MyProfileResolverService} from './services/profile/my-profile-resolver.service';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ListProjectComponent} from './components/list-project/list-project.component';
import {ActionComponent} from './components/action/action/action.component';
import {ListDataSetComponent} from './components/data-set/list-data-set/list-data-set.component';
import {DataSetDetailsComponent} from "./components/data-set/data-set-details/data-set-details.component";
import {DataSetResolverService} from "./services/data-set/data-set-resolver.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginActivateGuard],
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'password',
    children: [
      {
        path: 'email',
        component: ForgotPassEmailComponent
      },
      {
        path: 'change',
        component: ChangePassComponent
      }
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'user',
    canActivate: [LoginActivateGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: {user: MyProfileResolverService}
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: ':id',
        component: ProfileComponent,
        resolve: {user: ProfileResolverService}
      }
    ]
  },
  {
    path: 'createProject',
    component: CreateProjectComponent
  },
  {
    path: 'listProject',
    component: ListProjectComponent
  },
  {
    path: 'createUser',
    component: CreateUserComponent
  },
  {
    path: 'listUsers',
    component: ListUsersComponent
  },
  {
    path: 'manageAction',
    component: ActionComponent
  },
  {
    path: 'dataSet',
    children: [
      {
        path: 'list',
        component: ListDataSetComponent
      },
      {
        path: ':id',
        component: DataSetDetailsComponent,
        resolve: {dataSet: DataSetResolverService}
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
