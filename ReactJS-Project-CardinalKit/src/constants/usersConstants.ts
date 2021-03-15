export enum UsersSortField {
  LastWalktest = 'LAST_WALKTEST',
  LastActive = 'LAST_ACTIVE',
  UserID = 'USER_ID',
  UserEID = 'USER_EID',
  UserFirstName = 'USER_FIRST_NAME',
  UserLastName = 'USER_LAST_NAME',
}

export enum UsersSortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
}

export enum UsersActionType {
  FETCH_USERS = 'vasctrac/FETCH_USERS',
  FETCH_USERS_SUCCESS = 'vasctrac/FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE = 'vasctrac/FETCH_USERS_FAILURE',
  FETCH_USER_DETAILS = 'vasctrac/FETCH_USER_DETAILS',
  FETCH_USER_DETAILS_SUCCESS = 'vasctrac/FETCH_USER_DETAILS_SUCCESS',
  FETCH_USER_DETAILS_FAILURE = 'vasctrac/FETCH_USER_DETAILS_FAILURE',
  USERS_CHANGE_SORT = 'vasctrac/USERS_CHANGE_SORT',
  USERS_TOGGLE_HIDE_EID_TYPE = 'vasctrac/USERS_TOGGLE_HIDE_EID_TYPE',
}
