import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { defineMessages, FormattedMessage } from 'react-intl';

import { fetchUserDetails } from '../actions/usersActions';
import { Store } from '../reducers/rootReducer';
import { selectUserDetails } from '../selectors/usersSelectors';

import { UserDetails } from '../api/user';

import { Card } from '../ui/Card';

import { TimeInfoBubble, TimeType } from './TimeInfoBubble';

const messages = defineMessages({
  userIdHeader: {
    id: 'app.containers.UserDetailHeader.userid',
    defaultMessage: 'Internal User ID:',
  },
  userEidHeader: {
    id: 'app.containers.UserDetailHeader.eid',
    defaultMessage: 'User EID:',
  },
});

class UserDetailHeader extends React.Component<UserDetailHeaderProps> {
  componentDidMount() {
    this.props.loadUserDetails();
  }

  render() {
    const { userDetails } = this.props;
    if (!userDetails) {
      return (
        <Card>
          <p>Loading...</p>
        </Card>
      );
    }
    return (
      <Card>
        <div className="flex h-full w-full p-2">
          <div className="flex-grow flex flex-col justify-between">
            <div className="flex justify-between items-center h-12">
              <div className="flex justify-center items-center h-8 px-4">
                <p className="text-xl text-center font-bold">
                  <FormattedMessage {...messages.userIdHeader} />
                </p>
                <p className="font-mono text-center border boarder-grey-light bg-grey-lighter rounded-sm px-4 ml-4">
                  {userDetails.ID}
                </p>
              </div>
              <div className="flex justify-center items-center h-8 px-4">
                <p className="text-xl text-center font-bold">
                  <FormattedMessage {...messages.userEidHeader} />
                </p>
                <p className="font-mono text-center border boarder-grey-light bg-grey-lighter rounded-sm px-4 ml-4">
                  {'E' + userDetails.eID}
                </p>
              </div>
            </div>
            {userDetails.lastActive && (
              <TimeInfoBubble timeType={TimeType.Active} time={userDetails.lastActive} />
            )}
            {userDetails.lastWalktest && (
              <TimeInfoBubble timeType={TimeType.Walktest} time={userDetails.lastWalktest} />
            )}
            {userDetails.last6mwt && (
              <TimeInfoBubble timeType={TimeType.SixMinuteWalkTest} time={userDetails.last6mwt} />
            )}
            {userDetails.lastOpenw && (
              <TimeInfoBubble timeType={TimeType.OpenWalk} time={userDetails.lastOpenw} />
            )}
            {userDetails.lastMedSurvey && (
              <TimeInfoBubble timeType={TimeType.MedSurvey} time={userDetails.lastMedSurvey} />
            )}
            {userDetails.lastSurgSurvey && (
              <TimeInfoBubble timeType={TimeType.SurgSurvey} time={userDetails.lastSurgSurvey} />
            )}
            {userDetails.lastWalkSurvey && (
              <TimeInfoBubble timeType={TimeType.WalkSurvey} time={userDetails.lastWalkSurvey} />
            )}
            {userDetails.lastSf12Survey && (
              <TimeInfoBubble timeType={TimeType.Sf12Survey} time={userDetails.lastSf12Survey} />
            )}
          </div>
        </div>
      </Card>
    );
  }
}

interface UserDetailHeaderStateProps {
  userDetails: UserDetails | undefined;
}
interface UserDetailHeaderDispatchProps {
  loadUserDetails: () => void;
}

interface UserDetailHeaderContainerProps {
  userID: number;
}

type UserDetailHeaderProps = UserDetailHeaderStateProps &
  UserDetailHeaderDispatchProps &
  UserDetailHeaderContainerProps;

function mapStateToProps(
  state: Store,
  props: UserDetailHeaderContainerProps
): UserDetailHeaderStateProps {
  return {
    userDetails: selectUserDetails(state, props),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: UserDetailHeaderContainerProps
): UserDetailHeaderDispatchProps {
  return {
    loadUserDetails: () => {
      dispatch(fetchUserDetails(props.userID));
    },
  };
}

export default connect<
  UserDetailHeaderStateProps,
  UserDetailHeaderDispatchProps,
  UserDetailHeaderContainerProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailHeader);
