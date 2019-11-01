import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ArrowDown, ArrowUp } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';

import { changeUsersSort, fetchUsers, toggleHideEIDType } from '../actions/usersActions';

import { UserDetails } from '../api/user';
import { UsersSortField, UsersSortOrder } from '../constants/usersConstants';
import { Store } from '../reducers/rootReducer';
import {
  selectEIDTypes,
  selectHiddenEIDTypes,
  selectUsers,
  selectUsersSortField,
  selectUsersSortOrder,
} from '../selectors/usersSelectors';

import UserCard from './UserCard';

import { Card } from '../ui/Card';

const messages = defineMessages({
  sortBy: {
    id: 'app.UserList.sortBy',
    defaultMessage: 'Sort by:',
  },
  sortOrder: {
    id: 'app.UserList.sortOrder',
    defaultMessage: 'Sort order:',
  },
  eidPrefixes: {
    id: 'app.UserList.sortOrder',
    defaultMessage: 'Filter by EID prefix',
  },
  lastActive: {
    id: 'app.UserList.lastActive',
    defaultMessage: 'Last Active',
  },
  lastWalktest: {
    id: 'app.UserList.lastWalktest',
    defaultMessage: 'Last Walktest',
  },
  eid: {
    id: 'app.UserList.eid',
    defaultMessage: 'EID',
  },
  eidTypeFormat: {
    id: 'app.UserList.eidTypeFormat',
    defaultMessage: '{eidType}',
  },
  downArrowText: {
    id: 'app.UserList.downArrowText',
    defaultMessage: 'Descending',
  },
  upArrowText: {
    id: 'app.UserList.upArrowText',
    defaultMessage: 'Ascending',
  },
});

class UserList extends React.Component<UserListProps> {
  componentDidMount() {
    const { loadUsers } = this.props;
    loadUsers();
  }

  selectLastActive = () => this.props.changeUsersSort(UsersSortField.LastActive, undefined);

  selectLastWalktest = () => this.props.changeUsersSort(UsersSortField.LastWalktest, undefined);

  selectUserEID = () => this.props.changeUsersSort(UsersSortField.UserEID, undefined);

  selectAscending = () => this.props.changeUsersSort(undefined, UsersSortOrder.Ascending);

  selectDescending = () => this.props.changeUsersSort(undefined, UsersSortOrder.Descending);

  render() {
    const { userList, sortField, sortOrder, eidTypes, hiddenEIDTypes } = this.props;
    return (
      <div>
        <Card className="flex flex-wrap justify-center">
          <div className="px-4 my-4 flex items-center justify-center">
            <p className="font-semibold text-sm p-2">
              <FormattedMessage {...messages.sortBy} />
            </p>
            <div className="inline-flex h-8">
              <button
                className={`${
                  sortField === UsersSortField.LastActive
                    ? 'bg-grey'
                    : 'bg-grey-light hover:bg-grey'
                }  text-sm text-center font-bold py-2 px-3 rounded-l`}
                onClick={this.selectLastActive}
              >
                <FormattedMessage {...messages.lastActive} />
              </button>
              <button
                className={`${
                  sortField === UsersSortField.LastWalktest
                    ? 'bg-grey'
                    : 'bg-grey-light hover:bg-grey'
                }  text-sm text-center font-bold py-2 px-3`}
                onClick={this.selectLastWalktest}
              >
                <FormattedMessage {...messages.lastWalktest} />
              </button>
              <button
                className={`${
                  sortField === UsersSortField.UserEID ? 'bg-grey' : 'bg-grey-light hover:bg-grey'
                }  text-sm text-center font-bold py-2 px-3 rounded-r`}
                onClick={this.selectUserEID}
              >
                <FormattedMessage {...messages.eid} />
              </button>
            </div>
          </div>
          <div className="px-4 my-4 flex items-center justify-center">
            <p className="font-semibold text-sm p-2">
              <FormattedMessage {...messages.sortOrder} />
            </p>
            <div className="inline-flex h-8">
              <button
                className={`${
                  sortOrder === UsersSortOrder.Descending
                    ? 'bg-grey'
                    : 'bg-grey-light hover:bg-grey'
                } px-3 rounded-l flex items-center justify-center`}
                onClick={this.selectDescending}
              >
                <ArrowDown className="mr-1" color="black" />
                <span className="ml-1 text-sm font-bold">
                  <FormattedMessage {...messages.downArrowText} />
                </span>
              </button>
              <button
                className={`${
                  sortOrder === UsersSortOrder.Ascending ? 'bg-grey' : 'bg-grey-light hover:bg-grey'
                } px-3 rounded-r flex items-center justify-center`}
                onClick={this.selectAscending}
              >
                <ArrowUp className="mr-1" color="black" />
                <span className="ml-1 text-sm font-bold">
                  <FormattedMessage {...messages.upArrowText} />
                </span>
              </button>
            </div>
          </div>
          <div className="px-4 my-4 flex items-center justify-center">
            <p className="font-semibold text-sm p-2">
              <FormattedMessage {...messages.eidPrefixes} />
            </p>
            <div className="inline-flex h-8">
              {eidTypes.map((eidType: string, index: number) => (
                <button
                  key={`eidToggle-${eidType}`}
                  className={`${
                    !hiddenEIDTypes.includes(eidType) ? 'bg-grey' : 'bg-grey-light hover:bg-grey'
                  } px-3 ${index === 0 && 'rounded-l'} ${index === eidTypes.length - 1 &&
                    'rounded-r'} flex items-center justify-center`}
                  onClick={() => {
                    this.props.toggleHideEIDType(eidType);
                  }}
                >
                  <span className="text-sm font-bold">
                    <FormattedMessage
                      {...messages.eidTypeFormat}
                      values={{
                        eidType,
                      }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Card>
        <div>
          {userList.map(user => {
            return <UserCard key={user.userID} user={user} />;
          })}
        </div>
      </div>
    );
  }
}
type UserListProps = UserListStateProps & UserListDispatchProps;

interface UserListStateProps {
  userList: UserDetails[];
  sortOrder: UsersSortOrder;
  sortField: UsersSortField;
  // Defined in terms of hidden, rather than shown to simplify reducer
  hiddenEIDTypes: string[];
  eidTypes: string[];
}

interface UserListDispatchProps {
  loadUsers: () => void;
  changeUsersSort: (sortField?: UsersSortField, sortOrder?: UsersSortOrder) => void;
  toggleHideEIDType: (eidType: string) => void;
}

interface UserListContainerProps {
  userID: number;
}

function mapStateToProps(state: Store): UserListStateProps {
  return {
    userList: selectUsers(state),
    sortOrder: selectUsersSortOrder(state),
    sortField: selectUsersSortField(state),
    hiddenEIDTypes: selectHiddenEIDTypes(state),
    eidTypes: selectEIDTypes(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadUsers: () => {
      dispatch(fetchUsers());
    },
    changeUsersSort: (sortField?: UsersSortField, sortOrder?: UsersSortOrder) => {
      dispatch(changeUsersSort(sortField, sortOrder));
    },
    toggleHideEIDType: (eidType: string) => {
      dispatch(toggleHideEIDType(eidType));
    },
  };
}

export default connect<UserListStateProps, UserListDispatchProps, {}, Store>(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
