import { createSelector } from 'reselect';
import { Store } from '../reducers/rootReducer';

import { ProviderDetails } from '../api/provider';
import { ProvidersSortField, ProvidersSortOrder } from '../constants/providersConstants';
import { ProvidersStore } from '../reducers/providersReducer';

const selectProvidersDomain = (state: Store) => state.providers;

export const selectProvidersSortOrder = createSelector(
  [selectProvidersDomain],
  (providersStore: ProvidersStore) => providersStore.sortOrder
);

export const selectProvidersSortField = createSelector(
  [selectProvidersDomain],
  (providersStore: ProvidersStore) => providersStore.sortField
);

export const selectProvidersLoading = createSelector(
  [selectProvidersDomain],
  (providersStore: ProvidersStore) => providersStore.loading
);

export const selectHiddenEIDTypes = createSelector(
  [selectProvidersDomain],
  (providersStore: ProvidersStore) => providersStore.hiddenEIDTypes
);

const selectRawProviderMap = createSelector(
  [selectProvidersDomain],
  (providersStore: ProvidersStore) => providersStore.providers
);

const selectRawProviderList = createSelector(
  [selectRawProviderMap],
  (providerMap: Map<string, ProviderDetails>) => Array.from(providerMap.values())
);

export const selectFilteredProviderList = createSelector(
  [selectRawProviderList, selectHiddenEIDTypes],
  (providers: ProviderDetails[], hiddenEIDTypes: string[]) =>
      providers.filter(provider => !hiddenEIDTypes.includes(provider.eID))

    // providers.filter(provider => !hiddenEIDTypes.includes(provider.eID.substring(0, 3)))
);

export const selectProviderDetails = (state: Store, props: { userID: string }) => {
  return selectRawProviderMap(state).get(props.userID);
};

export const selectEIDTypes = createSelector(
  [selectRawProviderList],
  (providers: ProviderDetails[]) => Array.from(new Set(providers.map(provider => provider.eID.substring(0, 3)))).sort()
);

export const selectProviders = createSelector(
  [selectFilteredProviderList, selectProvidersSortOrder, selectProvidersSortField],
  (providers: ProviderDetails[], sortOrder: ProvidersSortOrder, sortField: ProvidersSortField) => {
    let cmp;
    switch (sortField) {
      case ProvidersSortField.UserID:
        cmp = (provider1: ProviderDetails, provider2: ProviderDetails): number => parseInt(provider1.ID, 10) - parseInt(provider2.ID, 10);
        break;
      case ProvidersSortField.UserEID:
        cmp = (provider1: ProviderDetails, provider2: ProviderDetails): number =>
          parseInt(provider1.eID, 10) - parseInt(provider2.eID, 10);
        break;
    }
    if (sortOrder === ProvidersSortOrder.Ascending) {
      return [...providers].sort(cmp);
    } else {
      return [...providers].sort(cmp).reverse();
    }
  }
);
