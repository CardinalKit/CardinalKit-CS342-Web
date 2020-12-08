import * as React from 'react';
import { FormattedDate } from 'react-intl';

import { BubbleColor, InfoBubble } from '../ui/InfoBubble';

/*const messages = defineMessages({
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
  }
});*/

export enum TimeType {
  Active = 1,
}

/*const typeToMessage = (type: TimeType) => {
  switch (type) {
    case TimeType.Active:
      return <FormattedMessage {...messages.active} />;
    default:
      return <span />;
  }
};*/

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

//const DAY_MS = 86400000;

const GREEN_ORANGE_RED = [BubbleColor.Green, BubbleColor.Orange, BubbleColor.Red];

const assignBubbleColor = (time: Date, type: TimeType) => {
  switch (type) {
    case TimeType.Active:
      return assignBubbleBreakpoints(time, GREEN_ORANGE_RED, [24 * HOUR_MS, 72 * HOUR_MS]);
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

  //const targetDate : any =  props.time.getTime();
  //const { value, unit } = selectUnit(Date.now() - targetDate);

  return (
    <InfoBubble
      color={assignBubbleColor(props.time, props.timeType)}
      className="flex justify-between content-center"
    >
      <div className="mr-1">
        <strong>
          <div>Last active</div>
          {/*<FormattedMessage
            {...messages.relativeDate}
            values={{
              type: typeToMessage(props.timeType),
              reldate: <FormattedRelativeTime value={value} unit={unit} />,
            }}
          />*/}
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
