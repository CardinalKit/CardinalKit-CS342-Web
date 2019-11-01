import * as React from 'react';

import { Check, Clock } from 'react-feather';
import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl';

import { Event } from '../api/event';

import { CardTableCol, CardTableRow } from '../ui/CardTable';
import { EventTypeBubble } from './EventTypeBubble';

const messages = defineMessages({
  pushSent: {
    id: 'app.EventsTableRow.pushSent',
    defaultMessage: 'Push sent',
  },
  pushPending: {
    id: 'app.EventsTableRow.pushPending',
    defaultMessage: 'Push pending',
  },
});

interface EventsTableRowProps {
  event: Event;
  isLast?: boolean;
}

export class EventsTableRow extends React.Component<EventsTableRowProps> {
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
          {event.userNotified
            ? [
                <Check key="icon" className="mr-2" />,
                <FormattedMessage key="text" {...messages.pushSent} />,
              ]
            : [
                <Clock key="icon" className="mr-2" />,
                <FormattedMessage key="text" {...messages.pushPending} />,
              ]}
        </CardTableCol>
      </CardTableRow>
    );
  }
}
