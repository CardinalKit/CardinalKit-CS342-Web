import { combineReducers } from 'redux';

import { initialLoginState, loginReducer, LoginStore } from './loginReducer';
import { initialUsersState, usersReducer, UsersStore } from './usersReducer';

export interface Store {
  login: LoginStore;
  users: UsersStore;
}

export const initialState: Store = {
  login: initialLoginState,
  users: initialUsersState,
};

export default combineReducers({
  login: loginReducer,
  users: usersReducer,
});
