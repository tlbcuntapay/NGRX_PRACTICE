import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    
    this.store.dispatch(loginStart({email, password}));
  }

  showEmailErrors(): string {
    let errorMessage = '';
    const emailForm = this.loginForm.get('email');
    if (emailForm?.touched && !emailForm?.valid){
      if(emailForm?.errors?.['required']){
        errorMessage = 'Email is required';
      }

      if(emailForm?.errors?.['email']){
        errorMessage = 'Invalid Email';
      }
    }
    return errorMessage;
  }

  showPasswordErrors(): string {
    let errorMessage = '';
    const passwordForm = this.loginForm.get('password');
    if (passwordForm?.touched && !passwordForm?.valid){
      if(passwordForm?.errors?.['required']){
        errorMessage = 'Password is required';
      }
    }
    return errorMessage;
  }
}
