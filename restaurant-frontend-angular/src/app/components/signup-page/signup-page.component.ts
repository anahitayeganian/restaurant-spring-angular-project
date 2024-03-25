import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  signUpForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      password: ['', [Validators.required, this.validatePassword()]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.checkPasswords
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
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
    return this.signUpForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.signUpForm.invalid)
      return;
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;
    if (confirmPassword !== '' && password !== confirmPassword)
      group.controls['confirmPassword'].setErrors({ passwordsMismatch: true });
  }

}