import { createSelector } from 'reselect';

import { LoginStore } from '../reducers/loginReducer';
import { Store } from '../reducers/rootReducer';

export const getLoginState = (state: Store) => state.login;

export const getAuthToken = createSelector(
  [getLoginState],
  (loginStore: LoginStore): string | null => {
    return loginStore.token;
  }
);

export const isAuthenticated = createSelector(
  [getAuthToken],
  (authToken: string | null) => {
    if (authToken && authToken !== '') {
      return true;
    } else {
      return false;
    }
  }
);
