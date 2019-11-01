import { LoginAction } from '../actions/loginActions';
import { LoginActionType } from '../constants/loginConstants';

const AUTH_STORAGE_KEY = 'vasctrac-auth-token';

function getTokenFromStorage(): string | null {
  return sessionStorage.getItem(AUTH_STORAGE_KEY);
}

function persistTokenToStorage(token: string) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, token);
}

function clearTokenFromStorage() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

// enum LoginState {
//   Authenticated,
//   Unauthenticated,
//   CheckingEmail,
//   EmailCheckFailed,
//   EmailVerified,
//   CheckingPassword,
//   PasswordVerified,
//   PasswordCheckFailed,
//   CheckingTwoFactor,
//   TwoFactorCheckFailed,
// }

export interface LoginStore {
  loading: boolean;
  email: string | null;
  password: string | null;
  passwordToken: string | null;
  twoFactorToken: string | null;
  error: string | null;
  token: string | null;
}

// The initial state of the App
export const initialLoginState: LoginStore = {
  email: null,
  password: null,
  passwordToken: null,
  twoFactorToken: null,
  loading: false,
  error: null,
  token: getTokenFromStorage(),
};

export function loginReducer(state = initialLoginState, action: LoginAction): LoginStore {
  switch (action.type) {
    case LoginActionType.LOGIN_USER:
      return { ...state, password: action.password };
    case LoginActionType.LOGIN_USER_SUCCESS:
      persistTokenToStorage(action.token);
      return { ...state, loading: false, token: action.token, email: null, password: null };
    case LoginActionType.LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: action.error };
    case LoginActionType.CHECK_EMAIL:
      return { ...state, loading: true };
    case LoginActionType.CHECK_EMAIL_SUCCESS:
      return {
        ...state,
        passwordToken: action.passwordToken,
        loading: false,
      };
    case LoginActionType.CHECK_EMAIL_FAILURE:
      return {
        ...state,
        passwordToken: null,
        loading: false,
      };
    case LoginActionType.CHECK_PASSWORD:
      return { ...state, loading: true };
    case LoginActionType.CHECK_PASSWORD_FAILURE:
      return { ...state, error: action.error, loading: false };
    case LoginActionType.CHECK_PASSWORD_SUCCESS_TWOFACTOR:
      return { ...state, twoFactorToken: action.twoFactorToken, loading: false };
    case LoginActionType.CHECK_TWO_FACTOR:
      return { ...state, loading: true };
    case LoginActionType.CHECK_TWO_FACTOR_FAILURE:
      return { ...state, loading: false };
    case LoginActionType.LOGOUT_USER:
      clearTokenFromStorage();
      return { ...state, token: null };
    default:
      return state;
  }
}
