import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './components/pages/category-page/category-page.component';
import { ChangePasswordPageComponent } from './components/pages/change-password-page/change-password-page.component';
import { DashboardPageAdminComponent } from './components/pages/dashboard-page-admin/dashboard-page-admin.component';
import { DashboardPageUserComponent } from './components/pages/dashboard-page-user/dashboard-page-user.component';
import { ForgotPasswordPageComponent } from './components/pages/forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './components/pages/reset-password-page/reset-password-page.component';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'admin/dashboard', component: DashboardPageAdminComponent, canActivate: [RouteGuardService], data: {expectedRole: ['admin']}},
  {path: 'dashboard', component: DashboardPageUserComponent, canActivate: [RouteGuardService], data: {expectedRole: ['user']}},
  {path: 'forgotPassword', component: ForgotPasswordPageComponent},
  {path: 'resetPassword', component: ResetPasswordPageComponent},
  {path: 'changePassword', component: ChangePasswordPageComponent, canActivate: [RouteGuardService], data: {expectedRole: ['admin', 'user']}},
  {path: 'categories', component: CategoryPageComponent, canActivate: [RouteGuardService], data: {expectedRole: ['admin']}},
  {path: 'items', component: ItemPageComponent, canActivate: [RouteGuardService], data: {expectedRole: ['admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }