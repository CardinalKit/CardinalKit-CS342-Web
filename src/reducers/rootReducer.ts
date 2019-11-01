import { combineReducers } from 'redux';

import { eventsReducer, EventsStore, initialEventsState } from './eventsReducer';
import { initialLoginState, loginReducer, LoginStore } from './loginReducer';
import { initialSurveyState, surveysReducer, SurveyStore } from './surveysReducer';
import { initialUsersState, usersReducer, UsersStore } from './usersReducer';
import { initialWalktestState, walktestsReducer, WalktestStore } from './walktestsReducer';

export interface Store {
  login: LoginStore;
  users: UsersStore;
  events: EventsStore;
  walktests: WalktestStore;
  surveys: SurveyStore;
}

export const initialState: Store = {
  login: initialLoginState,
  users: initialUsersState,
  events: initialEventsState,
  walktests: initialWalktestState,
  surveys: initialSurveyState,
};

export default combineReducers({
  login: loginReducer,
  users: usersReducer,
  events: eventsReducer,
  walktests: walktestsReducer,
  surveys: surveysReducer,
});
