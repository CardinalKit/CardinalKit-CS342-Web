export enum ProvidersSortField {
  LastWalktest = 'LAST_WALKTEST',
  LastActive = 'LAST_ACTIVE',
  UserID = 'User_ID',
  UserEID = 'USER_EID',
}

export enum ProvidersSortOrder {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
}

export enum ProvidersActionType {
  FETCH_PROVIDERS = 'vasctrac/FETCH_PROVIDERS',
  FETCH_PROVIDERS_SUCCESS = 'vasctrac/FETCH_PROVIDERS_SUCCESS',
  FETCH_PROVIDERS_FAILURE = 'vasctrac/FETCH_PROVIDERS_FAILURE',
  FETCH_PROVIDER_DETAILS = 'vasctrac/FETCH_PROVIDER_DETAILS',
  FETCH_PROVIDER_DETAILS_SUCCESS = 'vasctrac/FETCH_PROVIDER_DETAILS_SUCCESS',
  FETCH_PROVIDER_DETAILS_FAILURE = 'vasctrac/FETCH_PROVIDER_DETAILS_FAILURE',
  PROVIDERS_CHANGE_SORT = 'vasctrac/PROVIDERS_CHANGE_SORT',
  PROVIDERS_TOGGLE_HIDE_EID_TYPE = 'vasctrac/PROVIDERS_TOGGLE_HIDE_EID_TYPE',
}