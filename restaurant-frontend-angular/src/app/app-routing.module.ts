import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { RouteGuardService } from './services/route-guard.service';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';
import { ChangePasswordPageComponent } from './components/change-password-page/change-password-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [RouteGuardService], data: {expectedRole: ['admin', 'user']}},
  {path: 'forgotPassword', component: ForgotPasswordPageComponent},
  {path: 'resetPassword', component: ResetPasswordPageComponent},
  {path: 'changePassword', component: ChangePasswordPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }