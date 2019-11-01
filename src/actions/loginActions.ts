/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LoginActionType } from '../constants/loginConstants';

export type LoginAction =
  | LoginUserAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | CheckEmailAction
  | CheckEmailSuccessAction
  | CheckEmailFailureAction
  | CheckPasswordAction
  | CheckPasswordFailureAction
  | CheckPasswordSuccessTwoFactorAction
  | CheckTwoFactorAction
  | CheckTwoFactorFailureAction;

export interface LoginUserAction {
  type: LoginActionType.LOGIN_USER;
  email: string;
  password: string;
}

export function loginUser(email: string, password: string): LoginUserAction {
  return {
    type: LoginActionType.LOGIN_USER,
    email,
    password,
  };
}

export interface LoginSuccessAction {
  type: LoginActionType.LOGIN_USER_SUCCESS;
  token: string;
}

export function loginUserSuccess(apiToken: string): LoginSuccessAction {
  return {
    type: LoginActionType.LOGIN_USER_SUCCESS,
    token: apiToken,
  };
}

export interface LoginFailureAction {
  type: LoginActionType.LOGIN_USER_FAILURE;
  error: string;
}

export function loginUserFailure(error: string): LoginFailureAction {
  return {
    type: LoginActionType.LOGIN_USER_FAILURE,
    error,
  };
}

export interface CheckEmailAction {
  type: LoginActionType.CHECK_EMAIL;
  email: string;
}

export function checkEmail(email: string): CheckEmailAction {
  return {
    type: LoginActionType.CHECK_EMAIL,
    email,
  };
}

export interface CheckEmailSuccessAction {
  type: LoginActionType.CHECK_EMAIL_SUCCESS;
  passwordToken: string;
}

export function checkEmailSuccess(passwordToken: string): CheckEmailSuccessAction {
  return {
    type: LoginActionType.CHECK_EMAIL_SUCCESS,
    passwordToken,
  };
}

export interface CheckEmailFailureAction {
  type: LoginActionType.CHECK_EMAIL_FAILURE;
  error: string;
}

export function checkEmailFailure(error: string): CheckEmailFailureAction {
  return {
    type: LoginActionType.CHECK_EMAIL_FAILURE,
    error,
  };
}

export interface CheckPasswordAction {
  type: LoginActionType.CHECK_PASSWORD;
  password: string;
}

export function checkPassword(password: string): CheckPasswordAction {
  return {
    type: LoginActionType.CHECK_PASSWORD,
    password,
  };
}

export interface CheckPasswordSuccessTwoFactorAction {
  type: LoginActionType.CHECK_PASSWORD_SUCCESS_TWOFACTOR;
  twoFactorToken: string;
}

export function checkPasswordSuccessTwoFactor(
  twoFactorToken: string
): CheckPasswordSuccessTwoFactorAction {
  return {
    type: LoginActionType.CHECK_PASSWORD_SUCCESS_TWOFACTOR,
    twoFactorToken,
  };
}

export interface CheckPasswordFailureAction {
  type: LoginActionType.CHECK_PASSWORD_FAILURE;
  error: string;
}

export function checkPasswordFailure(error: string): CheckPasswordFailureAction {
  return {
    type: LoginActionType.CHECK_PASSWORD_FAILURE,
    error,
  };
}

export interface CheckTwoFactorAction {
  type: LoginActionType.CHECK_TWO_FACTOR;
  duoCode?: string;
}

export function checkTwoFactor(duoCode?: string): CheckTwoFactorAction {
  return {
    type: LoginActionType.CHECK_TWO_FACTOR,
    duoCode,
  };
}

export interface CheckTwoFactorFailureAction {
  type: LoginActionType.CHECK_TWO_FACTOR_FAILURE;
  error: string;
}

export function checkTwoFactorFailure(error: string): CheckTwoFactorFailureAction {
  return {
    type: LoginActionType.CHECK_TWO_FACTOR_FAILURE,
    error,
  };
}

export interface LogoutAction {
  type: LoginActionType.LOGOUT_USER;
}

export function logoutUser(): LogoutAction {
  return {
    type: LoginActionType.LOGOUT_USER,
  };
}
