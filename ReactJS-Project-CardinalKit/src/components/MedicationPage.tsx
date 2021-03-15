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

import { MedicationForm } from './MedicationForm';

const messages = defineMessages({
  userEmailHeader: {
    id: 'app.containers.UserDetailHeader.userid',
    defaultMessage: 'Email:',
  },
  userIdHeader: {
    id: 'app.containers.UserDetailHeader.id',
    defaultMessage: 'User ID:',
  },
});

interface MedicationPageProps {
  match: {
    params: {
      userID: string;
    };
  };
}

class MedicationPage extends React.Component<MedicationPageProps> {
  render() {
    let userID = this.props.match.params.userID;

    return (
      <div className="container mx-auto ">
        <Card>
          <MedicationForm userID={userID} />
        </Card>
      </div>
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
)(MedicationPage);
