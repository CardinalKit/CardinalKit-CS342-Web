import * as React from 'react';

import { Clock, Trash2 } from 'react-feather';
// @ts-ignore
import dateFnsLocalizer from 'react-widgets-date-fns';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { FormattedDate } from 'react-intl';
import Select from 'react-select';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import { Event, EventType, NewEvent } from '../api/event';

import { Button, ButtonColor } from '../ui/Button';
import { CardTableCol, CardTableRow } from '../ui/CardTable';
import { EventTypeBubble } from './EventTypeBubble';

dateFnsLocalizer();

const eventTypeToSelectValue = (eventType: EventType) => {
  switch (eventType) {
    case EventType.Walktest:
      return { value: EventType.Walktest, label: 'Walktest' };
    case EventType.MedicalSurvey:
      return { value: EventType.MedicalSurvey, label: 'Medical Survey' };
    case EventType.SurgicalSurvey:
      return { value: EventType.SurgicalSurvey, label: 'Surgical Survey' };
    case EventType.WalkingSurvey:
      return { value: EventType.WalkingSurvey, label: 'Walking Survey' };
    case EventType.Sf12Survey:
      return { value: EventType.Sf12Survey, label: 'SF12 Survey' };
  }
};

const reactSelectOptions = [
  eventTypeToSelectValue(EventType.Walktest),
  eventTypeToSelectValue(EventType.MedicalSurvey),
  eventTypeToSelectValue(EventType.SurgicalSurvey),
  eventTypeToSelectValue(EventType.WalkingSurvey),
  eventTypeToSelectValue(EventType.Sf12Survey),
];

interface EventEditRowProps {
  event: Event;
  isLast?: boolean;
  deleteEvent: () => void;
}

export class EventEditRow extends React.Component<EventEditRowProps> {
  render() {
    const { event, isLast } = this.props;
    return (
      <CardTableRow isLast={isLast}>
        <CardTableCol widthPercent={25}>
          <EventTypeBubble eventType={event.eventType} />
        </CardTableCol>
        <CardTableCol widthPercent={25}>
          <FormattedDate value={event.scheduled} year="numeric" month="numeric" day="2-digit" />
        </CardTableCol>
        <CardTableCol widthPercent={25}>
          <FormattedDate
            value={event.scheduled}
            hour12={true}
            hour="numeric"
            minute="numeric"
            second="numeric"
          />
        </CardTableCol>
        <CardTableCol widthPercent={25}>
          <Button
            className="p-1 m-1 h-8 w-1/2 shadow flex items-center content-center justify-center"
            disablePadding={true}
            color={ButtonColor.RedLight}
            onClick={this.props.deleteEvent}
          >
            <Trash2 className="" />
          </Button>
        </CardTableCol>
      </CardTableRow>
    );
  }
}

interface NewEventEditRowProps {
  event: NewEvent;
  isLast?: boolean;
  onDeleteEvent: () => void;
  onChangeEventType: (type: EventType) => void;
  onChangeDate: (date: Date) => void;
  onChangeTime: (time: Date) => void;
}

export class NewEventEditRow extends React.Component<NewEventEditRowProps> {
  handleSelectInputChange = ({ value }: any) => {
    this.props.onChangeEventType(value);
  };

  handleDayChange = (day: Date | undefined) => {
    if (day) {
      this.props.onChangeDate(day);
    }
  };

  handleTimeChange = (time: Date | undefined) => {
    if (time) {
      this.props.onChangeTime(time);
    }
  };

  render() {
    const { event, isLast } = this.props;
    return (
      <CardTableRow isLast={isLast}>
        <CardTableCol widthPercent={25}>
          <Select
            className="w-32 h-10 rounded shadow border"
            styles={{
              control: (provided: any) => ({
                ...provided,
                height: '2.5rem',
                borderWidth: '0px',
              }),
            }}
            options={reactSelectOptions}
            onChange={this.handleSelectInputChange}
            value={eventTypeToSelectValue(event.eventType)}
          />
        </CardTableCol>
        <CardTableCol widthPercent={25}>
          <DayPickerInput
            // @ts-ignore
            inputProps={{
              className:
                'border shadow rounded w-32 h-10 py-2 px-3 text-center focus:outline-none focus:shadow-outline',
            }}
            format="YYYY-M-D"
            onDayChange={this.handleDayChange}
            value={event.scheduled}
          />
        </CardTableCol>
        <CardTableCol widthPercent={25}>
          <div className="w-32 h-10 shadow rounded border">
            <DateTimePicker
              containerClassName="border-none"
              timeIcon={<Clock className="m-auto" size={18} />}
              value={event.scheduled}
              date={false}
              time={true}
              onChange={this.handleTimeChange}
              format="h:mm a"
              timeFormat="h:mm a"
              editFormat="h:mm a"
            />
          </div>
        </CardTableCol>
        <CardTableCol widthPercent={25}>
          <Button
            className="p-1 m-1 h-8 w-1/2 shadow flex items-center content-center justify-center"
            disablePadding={true}
            color={ButtonColor.RedLight}
            onClick={this.props.onDeleteEvent}
          >
            <Trash2 className="" />
          </Button>
        </CardTableCol>
      </CardTableRow>
    );
  }
}
