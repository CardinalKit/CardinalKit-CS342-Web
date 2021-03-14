import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import SurveysTable from './SurveysTable';
import UserDetailHeader from './UserDetailHeader';
import { deleteFirebaseUser, getUserFromUID } from '../api/getAllUsers';
import { sendSignInEmail } from '../api/registerUser';

interface UserPageProps {
  match: {
    params: {
      userID: string;
    };
  };
}

const messages = defineMessages({
  header: {
    id: 'app.containers.UserPage.header',
    defaultMessage: 'Patient Details',
  },
  removeUserButton: {
    id: 'app.UserList.removeUserButton',
    defaultMessage: 'Remove Patient',
  },
  resendEmailButton: {
    id: 'app.UserList.resendEmailButton',
    defaultMessage: 'Resend Sign-in Email',
  },
});

export default class UserPage extends React.Component<UserPageProps> {

  deleteUser() {
    if(window.confirm(`Are you sure you want to permanently remove this user?`)){
      deleteFirebaseUser(this.props.match.params.userID);
      // TODO: handle deletion and force refresh
    }
  }

  resendEmail() {
    getUserFromUID(this.props.match.params.userID).then((user) => {
      if (user.exists){
        var email = user.data().email;
        sendSignInEmail(email);
      }
    })
  }

  render() {
    const userID = this.props.match.params.userID;

    return (
      <div className="container mx-auto ">
        <div className="w-full mt-4 mb-4 ml-4">
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
        <UserDetailHeader userID={userID} />
        <SurveysTable userID={userID} />
        <div className="flex justify-center">
          <div onClick={() => this.resendEmail()}  className="flex flex-wrap justify-center cursor-pointer">
            <div className="bg-orange hover:bg-orange-dark border border-orange rounded mx-1 px-2 py-2 flex justify-center">
              <span className="text-white text-center">
                <FormattedMessage {...messages.resendEmailButton} />
              </span>
            </div>
          </div>
          <div onClick={() => this.deleteUser()}  className="flex flex-wrap justify-center cursor-pointer">
            <div className="bg-red hover:bg-red-dark border border-red rounded mx-1 px-2 py-2 flex justify-center">
              <span className="text-white text-center">
                <FormattedMessage {...messages.removeUserButton} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
