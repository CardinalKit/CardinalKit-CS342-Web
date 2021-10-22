import { ProvidersActionType, ProvidersSortField, ProvidersSortOrder } from '../constants/providersConstants';

import { ProvidersAction } from '../actions/providersActions';

import { ProviderDetails } from '../api/provider';

export interface ProvidersStore
  extends Readonly<{
    loading: boolean;
    sortOrder: ProvidersSortOrder;
    sortField: ProvidersSortField;
    // providers: Map<string, string>;
    providers: Map<string, ProviderDetails>;
    hiddenEIDTypes: string[];
    error: string;
  }> {} // hiddenEIDTypes are filtered out, defining shown in terms of hidden makes it easy to filter out test EIDs (000) by default

export const initialProvidersState: ProvidersStore = {
  loading: false,
  sortOrder: ProvidersSortOrder.Descending,
  sortField: ProvidersSortField.LastActive,
  // providers: new Map<string, string>([
  //   ["key1", "value1"],
  //   ["key2", "value2"]
  // ]),
  providers: new Map<string, ProviderDetails>(),
  // Filter our test EIDs by default to reduce clutter
  hiddenEIDTypes: ['000'],
  error: '',
};

export function providersReducer(state = initialProvidersState, action: ProvidersAction): ProvidersStore {
  switch (action.type) {
    case ProvidersActionType.FETCH_PROVIDERS:
      return { ...state, loading: true };
    case ProvidersActionType.FETCH_PROVIDERS_SUCCESS:
      const newProvidersMap = action.providers.reduce((acc: Map<string, ProviderDetails>, cur: ProviderDetails) => {
        return acc.set(cur.eID, {
          ...acc.get(cur.eID),
          ...cur,
        });
      }, new Map(state.providers.entries()));
      return {
        ...state,
        loading: false,
        providers: newProvidersMap,
      };
    case ProvidersActionType.FETCH_PROVIDERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ProvidersActionType.FETCH_PROVIDER_DETAILS:
      return { ...state, loading: true };
    case ProvidersActionType.FETCH_PROVIDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        providers: new Map(state.providers.entries()).set(action.providerDetails.userID, {
          ...state.providers.get(action.providerDetails.userID),
          ...action.providerDetails,
        })
      };
    case ProvidersActionType.FETCH_PROVIDER_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ProvidersActionType.PROVIDERS_CHANGE_SORT:
      return {
        ...state,
        sortField: action.sortField ? action.sortField : state.sortField,
        sortOrder: action.sortOrder ? action.sortOrder : state.sortOrder,
      };
    case ProvidersActionType.PROVIDERS_TOGGLE_HIDE_EID_TYPE:
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
