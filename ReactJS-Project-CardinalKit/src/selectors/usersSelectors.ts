import { createSelector } from 'reselect';
import { Store } from '../reducers/rootReducer';

import { UserDetails } from '../api/user';
import { UsersSortField, UsersSortOrder } from '../constants/usersConstants';
import { UsersStore } from '../reducers/usersReducer';

const selectUsersDomain = (state: Store) => state.users;

export const selectUsersSortOrder = createSelector(
  [selectUsersDomain],
  (usersStore: UsersStore) => usersStore.sortOrder
);

export const selectUsersSortField = createSelector(
  [selectUsersDomain],
  (usersStore: UsersStore) => usersStore.sortField
);

export const selectUsersLoading = createSelector(
  [selectUsersDomain],
  (usersStore: UsersStore) => usersStore.loading
);

export const selectHiddenEIDTypes = createSelector(
  [selectUsersDomain],
  (usersStore: UsersStore) => usersStore.hiddenEIDTypes
);

const selectRawUserMap = createSelector(
  [selectUsersDomain],
  (usersStore: UsersStore) => usersStore.users
);

const selectRawUserList = createSelector(
  [selectRawUserMap],
  (userMap: Map<string, UserDetails>) => Array.from(userMap.values())
);

export const selectUserDetails = (state: Store, props: { userID: string }) => {
  return selectRawUserMap(state).get(props.userID);
};

export const selectUsers = createSelector(
  [selectRawUserList, selectUsersSortOrder, selectUsersSortField],
  (users: UserDetails[], sortOrder: UsersSortOrder, sortField: UsersSortField) => {
    let cmp;
    switch (sortField) {
      case UsersSortField.UserID:
        cmp = (user1: UserDetails, user2: UserDetails): number =>
          parseInt(user1.ID, 10) - parseInt(user2.ID, 10);
        break;
    }
    if (sortOrder === UsersSortOrder.Ascending) {
      return [...users].sort(cmp);
    } else {
      return [...users].sort(cmp).reverse();
    }
  }
);
