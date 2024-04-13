import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryDialogComponent } from './components/dialogs/category-dialog/category-dialog.component';
import { CategoryPageComponent } from './components/pages/category-page/category-page.component';
import { ChangePasswordPageComponent } from './components/pages/change-password-page/change-password-page.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { ForgotPasswordPageComponent } from './components/pages/forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './components/pages/reset-password-page/reset-password-page.component';
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    SignupPageComponent,
    DashboardPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    ChangePasswordPageComponent,
    CategoryPageComponent,
    SidebarComponent,
    CategoryDialogComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    }),
    HttpClientModule,
    IonicModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
