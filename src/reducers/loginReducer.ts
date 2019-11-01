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
  error: string | null;
  token: string | null;
}

// The initial state of the App
export const initialLoginState: LoginStore = {
  loading: false,
  error: null,
  token: getTokenFromStorage(),
};

export function loginReducer(state = initialLoginState, action: LoginAction): LoginStore {
  switch (action.type) {
    case LoginActionType.LOGIN_USER:
      return { ...state};
    case LoginActionType.LOGIN_USER_SUCCESS:
      persistTokenToStorage(action.token);
      return { ...state, loading: false, token: action.token };
    case LoginActionType.LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: action.error };
    case LoginActionType.LOGOUT_USER:
      clearTokenFromStorage();
      return { ...state, token: null };
    default:
      return state;
  }
}
