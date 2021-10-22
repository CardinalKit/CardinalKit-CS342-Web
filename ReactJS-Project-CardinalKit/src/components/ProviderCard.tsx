import * as React from 'react';

import { ProviderDetails } from '../api/provider';

import { Card } from '../ui/Card';

import { TimeInfoBubble, TimeType } from './TimeInfoBubble';

import { defineMessages, FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';

const messages = defineMessages({
  providerIdHeader: {
    id: 'app.containers.ProviderCard.userID',
    defaultMessage: 'ID',
  },
  providerEidHeader: {
    id: 'app.containers.ProviderCard.eid',
    defaultMessage: 'Email',
  },
  viewProviderButton: {
    id: 'app.containers.ProviderCard.viewProviderButton',
    defaultMessage: 'See more',
  },
});

interface ProviderCardProps {
  provider: ProviderDetails;
}

class ProviderCard extends React.Component<ProviderCardProps> {
  render() {

    const { userID, lastActive, email } = this.props.provider;
    const lastActiveTake = new Date(lastActive);

    return (
      <Card>
        <div className="flex h-full w-full p-2">
          <div className="w-1/3 py-1 flex flex-col justify-between">
            <p className="text-xl text-center font-bold">
              <FormattedMessage {...messages.providerEidHeader} />
            </p>
            <p className="font-mono p-1 text-center border boarder-grey-light bg-grey-lighter rounded-sm mx-4">
              {email}
            </p>

            <p className="text-xl text-center font-bold">
              <FormattedMessage {...messages.providerIdHeader} />
            </p>
            <p className="font-mono p-1 text-center border boarder-grey-light bg-grey-lighter rounded-sm mx-4">
              {userID.substring(0, 16) + "..."}
            </p>
          </div>
          <div className={`flex-grow flex flex-col justify-between`}>
            {lastActiveTake && <TimeInfoBubble timeType={TimeType.Active} time={lastActiveTake} />}
            {/*lastActive && <TimeInfoBubble timeType={TimeType.Active} time={lastActive} />*/}
            <Link to={`/provider/${userID}`} className="no-underline">
              <div className="bg-blue hover:bg-blue-dark border border-blue rounded px-2 py-1 my-1 flex justify-center">
                <span className="text-white text-center">
                  <FormattedMessage {...messages.viewProviderButton} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    );
  }
}

export default ProviderCard;
