import * as React from 'react';

import ProviderDetailHeader from './ProviderDetailHeader';

interface ProviderPageProps {
  match: {
    params: {
      userID: string;
    };
  };
}

export default class ProviderPage extends React.PureComponent<ProviderPageProps> {
  render() {
    const userID = this.props.match.params.userID;

    return (
      <div className="container mx-auto ">
        <ProviderDetailHeader userID={userID} />
      </div>
    );
  }
}
