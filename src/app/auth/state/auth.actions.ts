import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

// login action name
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

// Signup action name
export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const SIGNUP_FAIL = '[auth page] signup fail';

export const AUTO_LOGIN = '[auth page] auto-login';
export const LOGOUT_ACTION = '[auth page] logout';

// Login actions
export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  LOGIN_START,
  props<{ user: User | null; redirect: boolean }>()
);
export const loginFail = createAction(LOGIN_FAIL);

// Signup actions
export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

// Auto Login actions
export const autoLogin = createAction(AUTO_LOGIN);

export const autoLogout = createAction(LOGOUT_ACTION);
