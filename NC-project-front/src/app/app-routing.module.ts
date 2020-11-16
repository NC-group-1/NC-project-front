import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './components/app/app.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {ForgotPassEmailComponent} from './components/reset-pass/forgot-pass-email/forgot-pass-email.component';
import {ForgotPassCodeComponent} from './components/reset-pass/forgot-pass-code/forgot-pass-code.component';
import {ChangePassComponent} from './components/reset-pass/change-pass/change-pass.component';

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
    path: 'password/code',
    component: ForgotPassCodeComponent
  },
  {
    path: 'password/change',
    component: ChangePassComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
