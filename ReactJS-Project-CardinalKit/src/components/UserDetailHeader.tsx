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

import { Link } from 'react-router-dom';

const messages = defineMessages({
  userNameHeader: {
    id: 'app.containers.UserCard.name',
    defaultMessage: 'Patient Name',
  },
  userIdHeader: {
    id: 'app.containers.UserCard.userid',
    defaultMessage: 'ID',
  },
  userEidHeader: {
    id: 'app.containers.UserCard.eid',
    defaultMessage: 'Email',
  },
  editMedicationsButton: {
    id: 'app.containers.UserCard.editMedicationsButton',
    defaultMessage: 'Edit Medications',
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

    const { userID, lastActive, email, lastName, firstName, registrationDate } = userDetails;

    return (
      <Card>
        <div className="flex h-full w-full p-2">
          <div className="w-1/3 py-1 flex flex-col justify-between">
            <p className="text-xl text-center font-bold">
              <FormattedMessage {...messages.userNameHeader} />
            </p>
            <p className="font-mono p-1 text-center border boarder-grey-light bg-grey-lighter rounded-sm mx-4">
              {lastName}, {firstName}
            </p>
            <p className="text-xl text-center font-bold">
              <FormattedMessage {...messages.userEidHeader} />
            </p>
            <p className="font-mono p-1 text-center border boarder-grey-light bg-grey-lighter rounded-sm mx-4">
              {email}
            </p>
          </div>
          <div className={`flex-grow flex flex-col`}>
            {<TimeInfoBubble label={"Last Active"} timeType={TimeType.Active} time={lastActive} />}
            {<TimeInfoBubble label={"Registration Time"} timeType={TimeType.Unactive} time={registrationDate} />}
            <Link to={`/user/${userID}/medication`} className="no-underline">
              <div className="bg-blue hover:bg-blue-dark border border-blue rounded px-2 py-1 my-1 flex justify-center">
                <span className="text-white text-center">
                  <FormattedMessage {...messages.editMedicationsButton} />
                </span>
              </div>
            </Link>
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
