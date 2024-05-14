import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/authResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { autoLogout } from '../auth/state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval!: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    // debugger;
    const apiKey = environment.FIREBASE_API_KEY;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      { email, password, returnSecureToken: true }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    const apiKey = environment.FIREBASE_API_KEY;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      { email, password, returnSecureToken: true }
    );
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  getUserInLocalStorage() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);

      return user;
    }
    return null;
  }

  runTimeoutInterval(user: User) {
    // Auto log out Function
    const todaysDate = new Date().getTime();
    const expDate = user.expDate.getTime();
    const timeInterval = expDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      // logout Functionality
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  // Utilities functions
  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        return 'INVALID LOGIN CREDENTIALS';
      case 'EMAIL_EXISTS':
        return 'EMAIL EXISTS';
      default:
        return 'UNKNOWN ERROR';
    }
  }

  logout() {
    localStorage.removeItem('userData');

    if(this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
