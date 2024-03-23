import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.validatePassword()]]
    });
  }

  /* Custom validator function for password */
  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      const errors: ValidationErrors = {};
      if (!value) {
        return null;
      }
      if (!/[A-Z]/.test(value)) {
        errors['uppercaseRequired'] = true;
        return errors;
      }
      if (!/\d/.test(value)) {
        errors['numberRequired'] = true;
        return errors;
      }
      if (!/[!*,.?]/.test(value)) {
        errors['specialCharRequired'] = true;
        return errors;
      }
      if (value.length < 8) {
        errors['minLengthRequired'] = true;
        return errors;
      }
      return null; // Password meets all criteria
    };
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid)
      return;
    //alert(`email: ${this.loginForm.get('email')?.value}, password: ${this.loginForm.get('password')?.value}`);
    alert(`email: ${this.fc['email'].value}, password: ${this.fc['password'].value}`);
  }

}
