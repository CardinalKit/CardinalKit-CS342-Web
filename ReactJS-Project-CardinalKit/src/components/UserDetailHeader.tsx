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
import {Link} from "react-router-dom";

const messages = defineMessages({
  userIdHeader: {
    id: 'app.containers.UserDetailHeader.userid',
    defaultMessage: 'Email:',
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
          <p className="p-5">Loading...</p>
        </Card>
      );
    }

    const lastActiveTake = new Date(userDetails.lastActive);

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
                  {userDetails.email}
                </p>
              </div>
              <div className="flex justify-center items-center h-8 px-4">
                <p className="text-xl text-center font-bold">
                  <FormattedMessage {...messages.userEidHeader} />
                </p>
                <p className="font-mono text-center border boarder-grey-light bg-grey-lighter rounded-sm px-4 ml-4">
                  {userDetails.eID}
                </p>
              </div>
              {/*<div className="flex justify-center items-center h-8 px-4">*/}
              {/*  <p className="text-xl text-center font-bold">*/}
              {/*    <FormattedMessage {...messages.userEidHeader} />*/}
              {/*  </p>*/}
              {/*  <p className="font-mono text-center border boarder-grey-light bg-grey-lighter rounded-sm px-4 ml-4">*/}
              {/*    {userDetails.eID}*/}
              {/*  </p>*/}
              {/*</div>*/}
              {/*<div className="flex justify-center items-center h-8 px-4">*/}
              {/*  {<Link*/}
              {/*      to="/providers/"*/}
              {/*      className="font-mono text-center border boarder-grey-light bg-grey-lighter rounded-sm px-4 ml-4"*/}
              {/*  >*/}
              {/*    Providers*/}
              {/*  </Link>}*/}
              {/*</div>*/}
            </div>
            {lastActiveTake && (
              <TimeInfoBubble timeType={TimeType.Active} time={lastActiveTake} />
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
  userID: string;
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
