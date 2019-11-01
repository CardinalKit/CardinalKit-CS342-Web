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
  (userMap: Map<number, UserDetails>) => Array.from(userMap.values())
);

export const selectFilteredUserList = createSelector(
  [selectRawUserList, selectHiddenEIDTypes],
  (users: UserDetails[], hiddenEIDTypes: string[]) =>
    users.filter(user => !hiddenEIDTypes.includes(user.eID.substring(0, 3)))
);

export const selectUserDetails = (state: Store, props: { userID: number }) => {
  return selectRawUserMap(state).get(props.userID);
};

export const selectEIDTypes = createSelector(
  [selectRawUserList],
  (users: UserDetails[]) => Array.from(new Set(users.map(user => user.eID.substring(0, 3)))).sort()
);

export const selectUsers = createSelector(
  [selectFilteredUserList, selectUsersSortOrder, selectUsersSortField],
  (users: UserDetails[], sortOrder: UsersSortOrder, sortField: UsersSortField) => {
    let cmp;
    switch (sortField) {
      case UsersSortField.LastWalktest:
        cmp = (user1: UserDetails, user2: UserDetails): number => {
          if (user1.lastWalktest && user2.lastWalktest) {
            return user1.lastWalktest.getTime() - user2.lastWalktest.getTime();
          } else {
            return 0; // Data missing
          }
        };
        break;
      case UsersSortField.LastActive:
        cmp = (user1: UserDetails, user2: UserDetails): number =>
          user1.lastActive.getTime() - user2.lastActive.getTime();
        break;
      case UsersSortField.UserID:
        cmp = (user1: UserDetails, user2: UserDetails): number => user1.ID - user2.ID;
        break;
      case UsersSortField.UserEID:
        cmp = (user1: UserDetails, user2: UserDetails): number =>
          parseInt(user1.eID, 10) - parseInt(user2.eID, 10);
        break;
    }
    if (sortOrder === UsersSortOrder.Ascending) {
      return [...users].sort(cmp);
    } else {
      return [...users].sort(cmp).reverse();
    }
  }
);
