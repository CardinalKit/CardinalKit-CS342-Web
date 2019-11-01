import * as React from 'react';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Check, X } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';

import { Event, EventType, NewEvent } from '../api/event';

import { Button, ButtonColor } from '../ui/Button';
import { Card } from '../ui/Card';
import { CardTable, CardTableCol, CardTableHeader, CardTableTitle } from '../ui/CardTable';
import { EventEditRow, NewEventEditRow } from './EventsTableEditRow';

const messages = defineMessages({
  eventsTableTitle: {
    id: 'app.EventsEditTable.eventsTableTitle',
    defaultMessage: 'Scheduled Events',
  },
  eventTypeHeader: {
    id: 'app.EventsEditTable.eventTypeHeader',
    defaultMessage: 'Event Type',
  },
  scheduledTimeHeader: {
    id: 'app.EventsEditTable.scheduledTimeHeader',
    defaultMessage: 'Scheduled Time',
  },
  scheduledDateHeader: {
    id: 'app.EventsEditTable.scheduledDateHeader',
    defaultMessage: 'Scheduled Date',
  },
  deleteHeader: {
    id: 'app.EventsEditTable.deleteHeader',
    defaultMessage: 'Delete',
  },
});

interface EventsEditTableProps {
  events: Event[];
  onCancelEdit: () => void;
  onFinishEdit: (newEvents: NewEvent[], eventsToDelete: number[]) => void;
}

interface EventsEditTableState {
  newEvents: NewEvent[];
  deletedEventIDs: number[];
}

export default class EventsEditTable extends React.Component<
  EventsEditTableProps,
  EventsEditTableState
> {
  constructor(props: EventsEditTableProps) {
    super(props);
    this.state = {
      newEvents: [],
      deletedEventIDs: [],
    };
  }

  getUpcommingEvents = (): Array<Event | NewEvent> =>
    [
      ...this.props.events.filter(
        (evt: Event) => !evt.userNotified && !this.state.deletedEventIDs.includes(evt.ID)
      ),
      ...this.state.newEvents,
    ]
      .sort(
        (event1: Event | NewEvent, event2: Event | NewEvent): number =>
          event1.scheduled.getTime() - event2.scheduled.getTime()
      )
      .reverse();

  handleDayClick = (day: Date) => {
    day.setHours(7); // default time to 7AM
    this.setState({
      newEvents: [
        ...this.state.newEvents,
        {
          tempID: this.state.newEvents.length,
          scheduled: day,
          eventType: EventType.Walktest,
        },
      ],
    });
  };

  handleDeleteNewEvent = (tempID: number) => {
    const ind = this.state.newEvents.findIndex((evt: NewEvent) => evt.tempID === tempID);
    if (ind >= 0) {
      const newArr = [...this.state.newEvents];
      newArr.splice(ind, 1);

      this.setState({
        newEvents: newArr,
      });
    }
  };

  handleDeleteEvent = (eventID: number) => {
    this.setState({
      deletedEventIDs: [...this.state.deletedEventIDs, eventID],
    });
  };

  handleSelectTypeChangeNewEvent = (tempID: number, newType: EventType) => {
    const ind = this.state.newEvents.findIndex((evt: NewEvent) => evt.tempID === tempID);
    if (ind >= 0) {
      const newArr = [...this.state.newEvents];
      newArr[ind].eventType = newType;

      this.setState({
        newEvents: newArr,
      });
    }
  };

  handleChangeDateNewEvent = (tempID: number, newDate: Date) => {
    const ind = this.state.newEvents.findIndex((evt: NewEvent) => evt.tempID === tempID);
    if (ind >= 0) {
      const newArr = [...this.state.newEvents];
      const lastDate = new Date(this.state.newEvents[ind].scheduled);
      lastDate.setFullYear(newDate.getFullYear());
      lastDate.setMonth(newDate.getMonth());
      lastDate.setDate(newDate.getDate());

      newArr[ind].scheduled = lastDate;

      this.setState({
        newEvents: newArr,
      });
    }
  };

  handleChangeTimeNewEvent = (tempID: number, newDate: Date) => {
    const ind = this.state.newEvents.findIndex((evt: NewEvent) => evt.tempID === tempID);
    if (ind >= 0) {
      const newArr = [...this.state.newEvents];
      const lastDate = new Date(this.state.newEvents[ind].scheduled);
      lastDate.setHours(newDate.getHours());
      lastDate.setMinutes(newDate.getMinutes());

      newArr[ind].scheduled = lastDate;

      this.setState({
        newEvents: newArr,
      });
    }
  };

  cancelEditing = (): void => {
    this.setState({
      newEvents: [],
      deletedEventIDs: [],
    });
    this.props.onCancelEdit();
  };

  finishEditing = (): void => {
    const newEvents = [...this.state.newEvents];
    const deletedEventIDs = [...this.state.deletedEventIDs];
    this.setState({
      newEvents: [],
      deletedEventIDs: [],
    });
    this.props.onFinishEdit(newEvents, deletedEventIDs);
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
    return (
      <CardTable>
        <CardTableTitle>
          <FormattedMessage {...messages.eventsTableTitle} />
        </CardTableTitle>
        <div className="flex items-center justify-center">
          <Button
            className="p-1 m-1 w-1/2 shadow"
            disablePadding={true}
            color={ButtonColor.Red}
            onClick={this.cancelEditing}
          >
            <X className="mr-2" />
            <span>Discard changes</span>
          </Button>
          <Button
            className="p-1 m-1 w-1/2 shadow"
            disablePadding={true}
            color={ButtonColor.Green}
            onClick={this.finishEditing}
          >
            <Check className="mr-2" />
            <span>Save changes</span>
          </Button>
        </div>
        <DayPicker
          numberOfMonths={2}
          fixedWeeks
          disabledDays={{ before: new Date() }}
          onDayClick={this.handleDayClick}
          selectedDays={this.getUpcommingEvents().map((evt: Event | NewEvent) => evt.scheduled)}
        />
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
            <FormattedMessage {...messages.deleteHeader} />
          </CardTableCol>
        </CardTableHeader>
        {this.getUpcommingEvents().map((event: Event | NewEvent, i: number) =>
          (event as NewEvent).tempID >= 0 ? (
            <NewEventEditRow
              key={`new-event-${i}`}
              event={event as NewEvent}
              isLast={events.length - 1 === i}
              onDeleteEvent={() => this.handleDeleteNewEvent((event as NewEvent).tempID)}
              onChangeEventType={(newType: EventType) =>
                this.handleSelectTypeChangeNewEvent((event as NewEvent).tempID, newType)
              }
              onChangeDate={(date: Date) =>
                this.handleChangeDateNewEvent((event as NewEvent).tempID, date)
              }
              onChangeTime={(time: Date) =>
                this.handleChangeTimeNewEvent((event as NewEvent).tempID, time)
              }
            />
          ) : (
            <EventEditRow
              key={`event-${(event as Event).ID}`}
              event={event as Event}
              isLast={events.length - 1 === i}
              deleteEvent={() => this.handleDeleteEvent((event as Event).ID)}
            />
          )
        )}
      </CardTable>
    );
  }
}
