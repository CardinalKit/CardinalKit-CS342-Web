import { UsersActionType, UsersSortField, UsersSortOrder } from '../constants/usersConstants';

import { UsersAction } from '../actions/usersActions';

import { UserDetails } from '../api/user';

export interface UsersStore
  extends Readonly<{
    loading: boolean;
    sortOrder: UsersSortOrder;
    sortField: UsersSortField;
    users: Map<string, UserDetails>;
    hiddenEIDTypes: string[];
    error: string;
  }> {} // hiddenEIDTypes are filtered out, defining shown in terms of hidden makes it easy to filter out test EIDs (000) by default

export const initialUsersState: UsersStore = {
  loading: false,
  sortOrder: UsersSortOrder.Descending,
  sortField: UsersSortField.LastActive,
  users: new Map<string, UserDetails>(),
  // Filter our test EIDs by default to reduce clutter
  hiddenEIDTypes: ['000'],
  error: '',
};

export function usersReducer(state = initialUsersState, action: UsersAction): UsersStore {
  switch (action.type) {
    case UsersActionType.FETCH_USERS:
      return { ...state, loading: true };
    case UsersActionType.FETCH_USERS_SUCCESS:
      const newUsersMap = action.users.reduce((acc: Map<string, UserDetails>, cur: UserDetails) => {
        return acc.set(cur.eID, {
          ...acc.get(cur.eID),
          ...cur,
        });
      }, new Map(state.users.entries()));
      return {
        ...state,
        loading: false,
        users: newUsersMap,
      };
    case UsersActionType.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case UsersActionType.FETCH_USER_DETAILS:
      return { ...state, loading: true };
    case UsersActionType.FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: new Map(state.users.entries()).set(action.userDetails.userID, {
          ...state.users.get(action.userDetails.userID),
          ...action.userDetails,
          surveyList: action.surveyList,
        })
      };
    case UsersActionType.FETCH_USER_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case UsersActionType.USERS_CHANGE_SORT:
      return {
        ...state,
        sortField: action.sortField ? action.sortField : state.sortField,
        sortOrder: action.sortOrder ? action.sortOrder : state.sortOrder,
      };
    case UsersActionType.USERS_TOGGLE_HIDE_EID_TYPE:
      const ind = state.hiddenEIDTypes.findIndex((eType: string) => eType === action.eidType);
      return {
        ...state,
        hiddenEIDTypes:
          action.eidType.length === 3 && ind !== -1
            ? state.hiddenEIDTypes.slice(0, ind).concat(state.hiddenEIDTypes.slice(ind + 1))
            : [...state.hiddenEIDTypes, action.eidType],
      };

    default:
      return state;
  }
}
