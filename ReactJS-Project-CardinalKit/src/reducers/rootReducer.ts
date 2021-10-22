import { combineReducers } from 'redux';

import { initialLoginState, loginReducer, LoginStore } from './loginReducer';
import { initialUsersState, usersReducer, UsersStore } from './usersReducer';
import { initialProvidersState, providersReducer, ProvidersStore } from './providersReducer';

export interface Store {
  login: LoginStore;
  users: UsersStore;
  providers: ProvidersStore;
}

export const initialState: Store = {
  login: initialLoginState,
  users: initialUsersState,
  providers: initialProvidersState,
};

export default combineReducers({
  login: loginReducer,
  users: usersReducer,
  providers: providersReducer,
});
