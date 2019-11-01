import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Check, X } from 'react-feather';
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl';

import { fetchWalktests } from '../actions/walktestActions';
import { StoppingReason, Walktest } from '../api/walktest';
import { Store } from '../reducers/rootReducer';
import { selectSortedWalktests } from '../selectors/walktestSelectors';

// import { EventsTableRow } from "./EventsTableRow";
import { Card } from '../ui/Card';
import {
  CardTable,
  CardTableCol,
  CardTableHeader,
  CardTableRow,
  CardTableTitle,
} from '../ui/CardTable';

const messages = defineMessages({
  walktestTableHeader: {
    id: 'app.WalktestsTable.walktestTableHeader',
    defaultMessage: 'Completed Walktests',
  },

  syncIdHeader: {
    id: 'app.WalktestsTable.syncIdHeader',
    defaultMessage: 'Sync ID',
  },
  dateHeader: {
    id: 'app.WalktestsTable.dateHeader',
    defaultMessage: 'Date',
  },
  openWalkHeader: {
    id: 'app.WalktestsTable.openWalkHeader',
    defaultMessage: 'Open walk?',
  },
  inClinicHeader: {
    id: 'app.WalktestsTable.inClinicHeader',
    defaultMessage: 'In clinic?',
  },
  watchHeader: {
    id: 'app.WalktestsTable.watchHeader',
    defaultMessage: 'Watch?',
  },
  chestStrapHeader: {
    id: 'app.WalktestsTable.chestStrapHeader',
    defaultMessage: 'Chest strap?',
  },
  distanceHeader: {
    id: 'app.WalktestsTable.distanceHeader',
    defaultMessage: 'Distance (m)',
  },
  stairsHeader: {
    id: 'app.WalktestsTable.stairsHeader',
    defaultMessage: 'Stairs',
  },
  stepsHeader: {
    id: 'app.WalktestsTable.stepsHeader',
    defaultMessage: 'Steps',
  },
  stoppedHeader: {
    id: 'app.WalktestsTable.stoppedHeader',
    defaultMessage: 'Stopped?',
  },
});

class WalktestsTable extends React.Component<WalktestsTableProps> {
  componentDidMount() {
    this.props.loadWalktests();
  }

  render() {
    const { walktests } = this.props;
    if (!walktests) {
      return (
        <Card>
          <p>Loading...</p>
        </Card>
      );
    }
    return (
      <CardTable>
        <CardTableTitle>
          <FormattedMessage {...messages.walktestTableHeader} />
        </CardTableTitle>
        <CardTableHeader>
          <CardTableCol widthPercent={14}>
            <FormattedMessage {...messages.syncIdHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={14}>
            <FormattedMessage {...messages.dateHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={9}>
            <FormattedMessage {...messages.openWalkHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={9}>
            <FormattedMessage {...messages.inClinicHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={9}>
            <FormattedMessage {...messages.watchHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={9}>
            <FormattedMessage {...messages.chestStrapHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={9}>
            <FormattedMessage {...messages.distanceHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={9}>
            <FormattedMessage {...messages.stairsHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={9}>
            <FormattedMessage {...messages.stepsHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={9}>
            <FormattedMessage {...messages.stoppedHeader} />
          </CardTableCol>
        </CardTableHeader>
        {walktests.map((walktest: Walktest, i: number) => (
          <CardTableRow key={`walktest-${walktest.ID}`} isLast={walktests.length - 1 === i}>
            <CardTableCol className="font-mono text-sm" widthPercent={15}>
              {walktest.syncID}
            </CardTableCol>
            <CardTableCol widthPercent={12}>
              <FormattedDate value={walktest.date} year="numeric" month="numeric" day="2-digit" />
            </CardTableCol>
            <CardTableCol widthPercent={9}>{walktest.openWalk ? <Check /> : <X />}</CardTableCol>
            <CardTableCol widthPercent={9}>{walktest.inClinic ? <Check /> : <X />}</CardTableCol>
            <CardTableCol widthPercent={9}>{walktest.watchUsage ? <Check /> : <X />}</CardTableCol>
            <CardTableCol widthPercent={9}>
              {walktest.chestStrapUsage ? <Check /> : <X />}
            </CardTableCol>
            <CardTableCol widthPercent={9}>{walktest.distance.toFixed(2)}</CardTableCol>
            <CardTableCol widthPercent={9}>{walktest.stairs}</CardTableCol>
            <CardTableCol widthPercent={9}>{walktest.stepsWithoutStopping}</CardTableCol>
            <CardTableCol widthPercent={9}>
              {walktest.stoppingReason === StoppingReason.None ? <X /> : <Check />}
            </CardTableCol>
          </CardTableRow>
        ))}
      </CardTable>
    );
  }
}

interface WalktestsTableStateProps {
  walktests: Walktest[] | undefined;
}
interface WalktestsTableDispatchProps {
  loadWalktests: () => void;
}

interface WalktestsTableContainerProps {
  userID: number;
}

type WalktestsTableProps = WalktestsTableStateProps &
  WalktestsTableDispatchProps &
  WalktestsTableContainerProps;

function mapStateToProps(
  state: Store,
  props: WalktestsTableContainerProps
): WalktestsTableStateProps {
  return {
    walktests: selectSortedWalktests(state, props),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: WalktestsTableContainerProps
): WalktestsTableDispatchProps {
  return {
    loadWalktests: () => {
      dispatch(fetchWalktests(props.userID));
    },
  };
}

export default connect<
  WalktestsTableStateProps,
  WalktestsTableDispatchProps,
  WalktestsTableContainerProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(WalktestsTable);
