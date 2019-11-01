import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import { EventType } from '../api/event';

import { BubbleColor, InfoBubble } from '../ui/InfoBubble';

const messages = defineMessages({
  walktest: {
    id: 'app.EventTypeBubble.walktest',
    defaultMessage: 'Walktest',
  },
  medSurvey: {
    id: 'app.EventTypeBubble.medSurvey',
    defaultMessage: 'Medical Survey',
  },
  surgSurvey: {
    id: 'app.EventTypeBubble.surgSurvey',
    defaultMessage: 'Surgery Survey',
  },
  walkSurvey: {
    id: 'app.EventTypeBubble.walkSurvey',
    defaultMessage: 'Walk Survey',
  },
  sf12Survey: {
    id: 'app.EventTypeBubble.sf12Survey',
    defaultMessage: 'SF12 Survey',
  },
});

interface EventTypeBubbleProps {
  eventType: EventType;
}

const eventTypeToMessage = (eventType: EventType) => {
  switch (eventType) {
    case EventType.Walktest:
      return <FormattedMessage {...messages.walktest} />;
    case EventType.MedicalSurvey:
      return <FormattedMessage {...messages.medSurvey} />;
    case EventType.SurgicalSurvey:
      return <FormattedMessage {...messages.surgSurvey} />;
    case EventType.WalkingSurvey:
      return <FormattedMessage {...messages.walkSurvey} />;
    case EventType.Sf12Survey:
      return <FormattedMessage {...messages.sf12Survey} />;
    default:
      return <span>{eventType}</span>;
  }
};

const eventTypeToColor = (eventType: EventType) => {
  switch (eventType) {
    case EventType.Walktest:
      return BubbleColor.Teal;
    case EventType.MedicalSurvey:
      return BubbleColor.Purple;
    case EventType.SurgicalSurvey:
      return BubbleColor.Indigo;
    case EventType.WalkingSurvey:
      return BubbleColor.Blue;
    case EventType.Sf12Survey:
        return BubbleColor.Pink;
    default:
      return BubbleColor.Teal;
  }
};

export const EventTypeBubble: React.StatelessComponent<EventTypeBubbleProps> = (
  props: EventTypeBubbleProps
) => (
  <InfoBubble color={eventTypeToColor(props.eventType)} className="font-semibold">
    <span>{eventTypeToMessage(props.eventType)}</span>
  </InfoBubble>
);
