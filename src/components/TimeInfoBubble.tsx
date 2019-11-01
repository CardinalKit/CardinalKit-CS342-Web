import * as React from 'react';

import { selectUnit } from '@formatjs/intl-utils';
import { defineMessages, FormattedDate, FormattedMessage, FormattedRelativeTime } from 'react-intl';

import { BubbleColor, InfoBubble } from '../ui/InfoBubble';

const messages = defineMessages({
  relativeDate: {
    id: 'app.TimeInfoBubble.relativeDate',
    defaultMessage: 'Last {type} {reldate}',
  },
  absoluteDate: {
    id: 'app.TimeInfoBubble.absoluteDate',
    defaultMessage: 'on {date} at {time}',
  },
  active: {
    id: 'app.TimeInfoBubble.active',
    defaultMessage: 'active',
  },
  walktest: {
    id: 'app.TimeInfoBubble.walktest',
    defaultMessage: 'walktest',
  },
  sixMinuteWalkTest: {
    id: 'app.TimeInfoBubble.sixMinuteWalkTest',
    defaultMessage: 'six minute walktest',
  },
  openWalk: {
    id: 'app.TimeInfoBubble.openWalk',
    defaultMessage: 'open walk',
  },
  medSurvey: {
    id: 'app.TimeInfoBubble.medSurvey',
    defaultMessage: 'medical survey',
  },
  surgSurvey: {
    id: 'app.TimeInfoBubble.surgSurvey',
    defaultMessage: 'surgery survey',
  },
  walkSurvey: {
    id: 'app.TimeInfoBubble.walkSurvey',
    defaultMessage: 'walk survey',
  },
  sf12Survey: {
    id: 'app.TimeInfoBubble.sf12Survey',
    defaultMessage: 'sf12 survey',
  },
});

export enum TimeType {
  Active = 1,
  Walktest,
  SixMinuteWalkTest,
  OpenWalk,
  MedSurvey,
  SurgSurvey,
  WalkSurvey,
  Sf12Survey,
}

const typeToMessage = (type: TimeType) => {
  switch (type) {
    case TimeType.Active:
      return <FormattedMessage {...messages.active} />;
    case TimeType.Walktest:
      return <FormattedMessage {...messages.walktest} />;
    case TimeType.SixMinuteWalkTest:
      return <FormattedMessage {...messages.sixMinuteWalkTest} />;
    case TimeType.OpenWalk:
      return <FormattedMessage {...messages.openWalk} />;
    case TimeType.MedSurvey:
      return <FormattedMessage {...messages.medSurvey} />;
    case TimeType.SurgSurvey:
      return <FormattedMessage {...messages.surgSurvey} />;
    case TimeType.WalkSurvey:
      return <FormattedMessage {...messages.walkSurvey} />;
    case TimeType.Sf12Survey:
      return <FormattedMessage {...messages.sf12Survey} />;
    default:
      return <span />;
  }
};

const assignBubbleBreakpoints = (time: Date, colors: BubbleColor[], msBreakpoints: number[]) => {
  const diffMs = Date.now() - time.getTime();
  for (let i = 0; i < colors.length; i++) {
    if (diffMs < msBreakpoints[i]) {
      return colors[i];
    }
  }
  return colors[colors.length - 1];
};

const HOUR_MS = 3600000;

const DAY_MS = 86400000;

const GREEN_ORANGE_RED = [BubbleColor.Green, BubbleColor.Orange, BubbleColor.Red];

const assignBubbleColor = (time: Date, type: TimeType) => {
  switch (type) {
    case TimeType.Active:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [24 * HOUR_MS, 72 * HOUR_MS]);
    case TimeType.Walktest:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [7 * DAY_MS, 14 * DAY_MS]);
    case TimeType.SixMinuteWalkTest:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [7 * DAY_MS, 14 * DAY_MS]);
    case TimeType.OpenWalk:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [7 * DAY_MS, 14 * DAY_MS]);
    case TimeType.MedSurvey:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [7 * DAY_MS, 14 * DAY_MS]);
    case TimeType.SurgSurvey:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [7 * DAY_MS, 14 * DAY_MS]);
    case TimeType.WalkSurvey:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [7 * DAY_MS, 14 * DAY_MS]);
    case TimeType.Sf12Survey:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [7 * DAY_MS, 14 * DAY_MS]);
    default:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [24 * HOUR_MS, 72 * HOUR_MS]);
  }
};

interface TimeInfoBubbleProps {
  timeType: TimeType;
  time: Date;
}

export const TimeInfoBubble: React.StatelessComponent<TimeInfoBubbleProps> = (
  props: TimeInfoBubbleProps
) => {
  const { value, unit } = selectUnit(Date.now() - 48 * 3600 * 1000);
  return (
    <InfoBubble
      color={assignBubbleColor(props.time, props.timeType)}
      className="flex justify-between content-center"
    >
      <div className="mr-1">
        <strong>
          <FormattedMessage
            {...messages.relativeDate}
            values={{
              type: typeToMessage(props.timeType),
              reldate: <FormattedRelativeTime value={value} unit={unit} />,
            }}
          />
        </strong>
      </div>
      <div className="ml-1 font-mono">
        <FormattedDate
          value={props.time}
          hour12={true}
          hour="numeric"
          minute="numeric"
          second="numeric"
          year="numeric"
          month="numeric"
          day="2-digit"
        />
      </div>
    </InfoBubble>
  );
};
