import * as React from 'react';

//import SurveysTable from './SurveysTable';
import UserDetailHeader from './UserDetailHeader';

interface UserPageProps {
  match: {
    params: {
      userID: string;
    };
  };
}

export default class UserPage extends React.PureComponent<UserPageProps> {
  render() {
    const userID = this.props.match.params.userID;

    return (
      <div className="container mx-auto ">
        <UserDetailHeader userID={userID} />
        {/*<SurveysTable userID={userID} />*/}
      </div>
    );
  }
}
