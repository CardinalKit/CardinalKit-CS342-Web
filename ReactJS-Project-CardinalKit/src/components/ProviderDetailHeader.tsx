import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { defineMessages, FormattedMessage } from 'react-intl';

import { fetchProviderDetails } from '../actions/providersActions';
import { Store } from '../reducers/rootReducer';
import { selectProviderDetails } from '../selectors/providersSelectors';

import { ProviderDetails } from '../api/provider';

import { Card } from '../ui/Card';

import { TimeInfoBubble, TimeType } from './TimeInfoBubble';

const messages = defineMessages({
  providerIdHeader: {
    id: 'app.containers.ProviderDetailHeader.providerid',
    defaultMessage: 'Email:',
  },
  providerEidHeader: {
    id: 'app.containers.ProviderDetailHeader.eid',
    defaultMessage: 'Provider EID:',
  },
});

class ProviderDetailHeader extends React.Component<ProviderDetailHeaderProps> {
  componentDidMount() {
    this.props.loadProviderDetails();
  }

  render() {
    const { providerDetails } = this.props;

    if (!providerDetails) {
      return (
        <Card>
          <p className="p-5">Loading...</p>
        </Card>
      );
    }

    const lastActiveTake = new Date(providerDetails.lastActive);

    return (
      <Card>
        <div className="flex h-full w-full p-2">
          <div className="flex-grow flex flex-col justify-between">
            <div className="flex justify-between items-center h-12">
              <div className="flex justify-center items-center h-8 px-4">
                <p className="text-xl text-center font-bold">
                  <FormattedMessage {...messages.providerIdHeader} />
                </p>
                <p className="font-mono text-center border boarder-grey-light bg-grey-lighter rounded-sm px-4 ml-4">
                  {providerDetails.email}
                </p>
              </div>
              <div className="flex justify-center items-center h-8 px-4">
                <p className="text-xl text-center font-bold">
                  <FormattedMessage {...messages.providerEidHeader} />
                </p>
                <p className="font-mono text-center border boarder-grey-light bg-grey-lighter rounded-sm px-4 ml-4">
                  {providerDetails.eID}
                </p>
              </div>
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

interface ProviderDetailHeaderStateProps {
  providerDetails: ProviderDetails | undefined;
}
interface ProviderDetailHeaderDispatchProps {
  loadProviderDetails: () => void;
}

interface ProviderDetailHeaderContainerProps {
  userID: string;
}

type ProviderDetailHeaderProps = ProviderDetailHeaderStateProps &
  ProviderDetailHeaderDispatchProps &
  ProviderDetailHeaderContainerProps;

function mapStateToProps(
  state: Store,
  props: ProviderDetailHeaderContainerProps
): ProviderDetailHeaderStateProps {
  return {
    providerDetails: selectProviderDetails(state, props),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: ProviderDetailHeaderContainerProps
): ProviderDetailHeaderDispatchProps {
  return {
    loadProviderDetails: () => {
      dispatch(fetchProviderDetails(props.userID));
    },
  };
}

export default connect<
  ProviderDetailHeaderStateProps,
  ProviderDetailHeaderDispatchProps,
  ProviderDetailHeaderContainerProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(ProviderDetailHeader);
