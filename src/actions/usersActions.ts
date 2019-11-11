import { UserDetails } from '../api/user';
import { UsersActionType, UsersSortField, UsersSortOrder } from '../constants/usersConstants';

export type UsersAction =
  | FetchUsersAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction
  | FetchUserDetailsAction
  | FetchUserDetailsSuccessAction
  | FetchUserDetailsFailureAction
  | UsersChangeSortAction
  | UsersToggleHideEIDType;

export interface FetchUsersAction {
  type: UsersActionType.FETCH_USERS;
}

export function fetchUsers(): FetchUsersAction {
  return {
    type: UsersActionType.FETCH_USERS,
  };
}

export interface FetchUsersSuccessAction {
  type: UsersActionType.FETCH_USERS_SUCCESS;
  users: UserDetails[];
}

export function fetchUsersSuccess(userList: UserDetails[]): FetchUsersSuccessAction {
  return {
    type: UsersActionType.FETCH_USERS_SUCCESS,
    users: userList,
  };
}

export interface FetchUsersFailureAction {
  type: UsersActionType.FETCH_USERS_FAILURE;
  error: string;
}

export function fetchUsersFailure(error: string): FetchUsersFailureAction {
  return {
    type: UsersActionType.FETCH_USERS_FAILURE,
    error,
  };
}

export interface FetchUserDetailsAction {
  type: UsersActionType.FETCH_USER_DETAILS;
  userID: string;
}

export function fetchUserDetails(userID: string): FetchUserDetailsAction {
  return {
    type: UsersActionType.FETCH_USER_DETAILS,
    userID,
  };
}

export interface FetchUserDetailsSuccessAction {
  type: UsersActionType.FETCH_USER_DETAILS_SUCCESS;
  userDetails: UserDetails;
}

export function fetchUserDetailsSuccess(userDetails: UserDetails): FetchUserDetailsSuccessAction {
  return {
    type: UsersActionType.FETCH_USER_DETAILS_SUCCESS,
    userDetails,
  };
}

export interface FetchUserDetailsFailureAction {
  type: UsersActionType.FETCH_USER_DETAILS_FAILURE;
  error: string;
}

export function fetchUserDetailsFailure(error: string): FetchUserDetailsFailureAction {
  return {
    type: UsersActionType.FETCH_USER_DETAILS_FAILURE,
    error,
  };
}

export interface UsersChangeSortAction {
  type: UsersActionType.USERS_CHANGE_SORT;
  sortField?: UsersSortField;
  sortOrder?: UsersSortOrder;
}

export function changeUsersSort(
  sortField?: UsersSortField,
  sortOrder?: UsersSortOrder
): UsersChangeSortAction {
  return {
    type: UsersActionType.USERS_CHANGE_SORT,
    sortField,
    sortOrder,
  };
}

// Toggling showing an EID type, means the following:
// - Precondition: EID type is shown, postcondition: EID type is not shown
// - Precondition: EID type is not shown, postcondition: EID type is shown
export interface UsersToggleHideEIDType {
  type: UsersActionType.USERS_TOGGLE_HIDE_EID_TYPE;
  eidType: string;
}

export function toggleHideEIDType(eidType: string): UsersToggleHideEIDType {
  return {
    type: UsersActionType.USERS_TOGGLE_HIDE_EID_TYPE,
    eidType,
  };
}
