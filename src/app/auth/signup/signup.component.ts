import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signupStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSignupSubmit() {
    if (!this.signupForm.valid) {
      return;
    }
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.store.dispatch(setLoadingSpinner({showloading: true}));
    this.store.dispatch(signupStart({email, password}));
  }

  showEmailErrors(): string {
    let errorMessage = '';
    const emailForm = this.signupForm.get('email');
    if (emailForm?.touched && !emailForm?.valid) {
      if (emailForm?.errors?.['required']) {
        errorMessage = 'Email is required';
      }

      if (emailForm?.errors?.['email']) {
        errorMessage = 'Invalid Email';
      }
    }
    return errorMessage;
  }

  showPasswordErrors(): string {
    let errorMessage = '';
    const passwordForm = this.signupForm.get('password');
    if (passwordForm?.touched && !passwordForm?.valid) {
      if (passwordForm?.errors?.['required']) {
        errorMessage = 'Password is required';
      }
    }
    return errorMessage;
  }
}
