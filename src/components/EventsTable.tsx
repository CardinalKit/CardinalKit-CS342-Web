import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import 'react-day-picker/lib/style.css';
import { Edit } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';

import { createEvents, deleteEvents, fetchEvents } from '../actions/eventActions';
import { Store } from '../reducers/rootReducer';
import { selectSortedEvents } from '../selectors/eventSelectors';

import { Event, NewEvent } from '../api/event';

import { Button, ButtonColor } from '../ui/Button';
import { Card } from '../ui/Card';
import { CardTable, CardTableCol, CardTableHeader, CardTableTitle } from '../ui/CardTable';
import EventsEditTable from './EventsEditTable';
import { EventsTableRow } from './EventsTableRow';

const messages = defineMessages({
  eventsTableTitle: {
    id: 'app.EventsTable.eventsTableTitle',
    defaultMessage: 'Scheduled Events',
  },
  eventTypeHeader: {
    id: 'app.EventsTable.eventTypeHeader',
    defaultMessage: 'Event Type',
  },
  scheduledTimeHeader: {
    id: 'app.EventsTable.scheduledTimeHeader',
    defaultMessage: 'Scheduled Time',
  },
  scheduledDateHeader: {
    id: 'app.EventsTable.scheduledDateHeader',
    defaultMessage: 'Scheduled Date',
  },
  statusHeader: {
    id: 'app.EventsTable.statusHeader',
    defaultMessage: 'Status',
  },
});

interface EventsTableState {
  editing: boolean;
}

class EventsTable extends React.Component<EventsTableProps, EventsTableState> {
  constructor(props: EventsTableProps) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  componentDidMount() {
    this.props.loadEvents();
  }

  startEditing = (): void => {
    this.setState({ editing: true });
  };

  handleCancelEdit = (): void => {
    this.setState({
      editing: false,
    });
  };

  handleFinishEdit = (newEvents: NewEvent[], deletedEventIDs: number[]): void => {
    this.props.createEvents(newEvents);
    this.props.deleteEvents(deletedEventIDs);
    this.setState({
      editing: false,
    });
  };

  render() {
    const { events } = this.props;
    if (!events) {
      return (
        <Card>
          <p>Loading...</p>
        </Card>
      );
    }
    if (this.state.editing) {
      return (
        <EventsEditTable
          events={events}
          onCancelEdit={this.handleCancelEdit}
          onFinishEdit={this.handleFinishEdit}
        />
      );
    }
    return (
      <CardTable>
        <CardTableTitle>
          <FormattedMessage {...messages.eventsTableTitle} />
          <div className="absolute pin-r shadow">
            <Button
              className="p-1"
              disablePadding={true}
              color={ButtonColor.White}
              onClick={this.startEditing}
            >
              <Edit />
            </Button>
          </div>
        </CardTableTitle>
        <CardTableHeader>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.eventTypeHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.scheduledDateHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.scheduledTimeHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.statusHeader} />
          </CardTableCol>
        </CardTableHeader>
        {events.map((event: Event, i: number) => (
          <EventsTableRow
            key={`event-${event.ID}`}
            event={event}
            isLast={events.length - 1 === i}
          />
        ))}
      </CardTable>
    );
  }
}

interface EventsTableStateProps {
  events: Event[] | undefined;
}
interface EventsTableDispatchProps {
  loadEvents: () => void;
  createEvents: (newEvents: NewEvent[]) => void;
  deleteEvents: (deletedEventIDs: number[]) => void;
}

interface EventsTableContainerProps {
  userID: number;
}

type EventsTableProps = EventsTableStateProps &
  EventsTableContainerProps &
  EventsTableDispatchProps;

function mapStateToProps(state: Store, props: EventsTableContainerProps): EventsTableStateProps {
  return {
    events: selectSortedEvents(state, props),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: EventsTableContainerProps
): EventsTableDispatchProps {
  return {
    loadEvents: () => {
      dispatch(fetchEvents(props.userID));
    },
    createEvents: (newEvents: NewEvent[]) => {
      dispatch(createEvents(props.userID, newEvents));
    },
    deleteEvents: (deletedEventIDs: number[]) => {
      dispatch(deleteEvents(props.userID, deletedEventIDs));
    },
  };
}

export default connect<
  EventsTableStateProps,
  EventsTableDispatchProps,
  EventsTableContainerProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(EventsTable);
