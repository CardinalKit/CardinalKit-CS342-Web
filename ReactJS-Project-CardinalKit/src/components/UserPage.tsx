import * as React from 'react';

import SurveysTable from './SurveysTable';

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
        <h2 className="px-6 my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Survey List
            </h2>
        <SurveysTable userID={userID} />
      </div>
    );
  }
}
