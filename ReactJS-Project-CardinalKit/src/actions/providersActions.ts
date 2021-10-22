import { ProviderDetails } from '../api/provider';
import {
  ProvidersActionType,
  ProvidersSortField,
  ProvidersSortOrder,
} from '../constants/providersConstants';

export type ProvidersAction =
  | FetchProvidersAction
  | FetchProvidersSuccessAction
  | FetchProvidersFailureAction
  | FetchProviderDetailsAction
  | FetchProviderDetailsSuccessAction
  | FetchProviderDetailsFailureAction
  | ProvidersChangeSortAction
  | ProvidersToggleHideEIDType;

export interface FetchProvidersAction {
  type: ProvidersActionType.FETCH_PROVIDERS;
}

export function fetchProviders(): FetchProvidersAction {
  return {
    type: ProvidersActionType.FETCH_PROVIDERS,
  };
}

export interface FetchProvidersSuccessAction {
  type: ProvidersActionType.FETCH_PROVIDERS_SUCCESS;
  providers: ProviderDetails[];
}

export function fetchProvidersSuccess(
  providerList: ProviderDetails[]
): FetchProvidersSuccessAction {
  return {
    type: ProvidersActionType.FETCH_PROVIDERS_SUCCESS,
    providers: providerList,
  };
}

export interface FetchProvidersFailureAction {
  type: ProvidersActionType.FETCH_PROVIDERS_FAILURE;
  error: string;
}

export function fetchProvidersFailure(error: string): FetchProvidersFailureAction {
  return {
    type: ProvidersActionType.FETCH_PROVIDERS_FAILURE,
    error,
  };
}

export interface FetchProviderDetailsAction {
  type: ProvidersActionType.FETCH_PROVIDER_DETAILS;
  userID: string;
}

export function fetchProviderDetails(userID: string): FetchProviderDetailsAction {
  return {
    type: ProvidersActionType.FETCH_PROVIDER_DETAILS,
    userID,
  };
}

export interface FetchProviderDetailsSuccessAction {
  type: ProvidersActionType.FETCH_PROVIDER_DETAILS_SUCCESS;
  providerDetails: ProviderDetails;
}

export function fetchProviderDetailsSuccess(
  providerDetails: ProviderDetails
): FetchProviderDetailsSuccessAction {
  return {
    type: ProvidersActionType.FETCH_PROVIDER_DETAILS_SUCCESS,
    providerDetails,
  };
}

export interface FetchProviderDetailsFailureAction {
  type: ProvidersActionType.FETCH_PROVIDER_DETAILS_FAILURE;
  error: string;
}

export function fetchProviderDetailsFailure(error: string): FetchProviderDetailsFailureAction {
  return {
    type: ProvidersActionType.FETCH_PROVIDER_DETAILS_FAILURE,
    error,
  };
}

export interface ProvidersChangeSortAction {
  type: ProvidersActionType.PROVIDERS_CHANGE_SORT;
  sortField?: ProvidersSortField;
  sortOrder?: ProvidersSortOrder;
}

export function changeProvidersSort(
  sortField?: ProvidersSortField,
  sortOrder?: ProvidersSortOrder
): ProvidersChangeSortAction {
  return {
    type: ProvidersActionType.PROVIDERS_CHANGE_SORT,
    sortField,
    sortOrder,
  };
}

// Toggling showing an EID type, means the following:
// - Precondition: EID type is shown, postcondition: EID type is not shown
// - Precondition: EID type is not shown, postcondition: EID type is shown
export interface ProvidersToggleHideEIDType {
  type: ProvidersActionType.PROVIDERS_TOGGLE_HIDE_EID_TYPE;
  eidType: string;
}

export function toggleHideEIDType(eidType: string): ProvidersToggleHideEIDType {
  return {
    type: ProvidersActionType.PROVIDERS_TOGGLE_HIDE_EID_TYPE,
    eidType,
  };
}
