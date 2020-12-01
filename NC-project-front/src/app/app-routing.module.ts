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

import {CompoundListComponent} from './components/compound-list/compound-list.component';
import {CompoundEditComponent} from './components/compound-edit/compound-edit.component';
import {CompoundListResolverService} from './services/compound/compound-list-resolver.service';
import {CompoundResolverService} from './services/compound/compound-resolver.service';
import {ActionPageResolverService} from './services/action/action-page-resolver.service';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ListProjectComponent} from './components/list-project/list-project.component';
import {ActionComponent} from './components/action/action/action.component';


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
    path: 'compounds',
    canActivate: [LoginActivateGuard],
    children: [
      {
        path: '',
        redirectTo: '0',
        pathMatch: 'full'
      },
      {
        path: 'edit/:compoundId',
        component: CompoundEditComponent,
        resolve: {compound: CompoundResolverService, actionPage: ActionPageResolverService},
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: 'new',
        component: CompoundEditComponent,
        resolve: {actionPage: ActionPageResolverService},
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: ':page',
        component: CompoundListComponent,
        resolve: {compoundPage: CompoundListResolverService},
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
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
    path: '**',
    component: PageNotFoundComponent
  }
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
