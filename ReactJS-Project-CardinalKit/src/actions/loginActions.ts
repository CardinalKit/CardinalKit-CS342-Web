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
  | LogoutAction;

export interface LoginUserAction {
  type: LoginActionType.LOGIN_USER;
}

export function loginUser(): LoginUserAction {
  return {
    type: LoginActionType.LOGIN_USER,
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

export interface LogoutAction {
  type: LoginActionType.LOGOUT_USER;
}

export function logoutUser(): LogoutAction {
  return {
    type: LoginActionType.LOGOUT_USER,
  };
}
