import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {ForgotPassEmailComponent} from './components/reset-pass/forgot-pass-email/forgot-pass-email.component';
import {ChangePassComponent} from './components/reset-pass/change-pass/change-pass.component';
import {SignupComponent} from './components/signup/signup.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileResolverService} from './services/profile/profile-resolver.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'password/email',
    component: ForgotPassEmailComponent
  },
  {
    path: 'password/change',
    component: ChangePassComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'user/:email',
    component: ProfileComponent,
    resolve: {user: ProfileResolverService}
  },
  {
    path: 'user/profile',
    component: ProfileComponent
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
