import * as React from 'react';

import EventsTable from './EventsTable';
import SurveysTable from './SurveysTable';
import UserDetailHeader from './UserDetailHeader';
import WalktestsTable from './WalktestsTable';

interface UserPageProps {
  match: {
    params: {
      userID: string;
    };
  };
}
export default class UserPage extends React.Component<UserPageProps> {
  render() {
    const userID = parseInt(this.props.match.params.userID, 10);
    return (
      <div className="container mx-auto ">
        <UserDetailHeader userID={userID} />
        <EventsTable userID={userID} />
        <WalktestsTable userID={userID} />
        <SurveysTable userID={userID} />
      </div>
    );
  }
}
