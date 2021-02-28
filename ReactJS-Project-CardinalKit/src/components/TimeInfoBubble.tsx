import * as React from 'react';

// import { selectUnit } from '@formatjs/intl-utils';
import {
  FormattedDate /*, defineMessages, FormattedMessage, FormattedRelativeTime*/,
} from 'react-intl';

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

// const DAY_MS = 86400000;

const GREEN_ORANGE_RED = [BubbleColor.Green, BubbleColor.Orange, BubbleColor.Red];

const assignBubbleColor = (time: number, type: TimeType) => {
  if (time == 0) {
    return GREEN_ORANGE_RED[2];
  }

  const date_time: Date = new Date(time);
  switch (type) {
    case TimeType.Active:
      return assignBubbleBreakpoints(date_time, GREEN_ORANGE_RED, [24 * HOUR_MS, 72 * HOUR_MS]);
    default:
      return assignBubbleBreakpoints(date_time, GREEN_ORANGE_RED, [24 * HOUR_MS, 72 * HOUR_MS]);
  }
};

interface TimeInfoBubbleProps {
  timeType: TimeType;
  time: number;
}

class TimeInfoBubble extends React.Component<TimeInfoBubbleProps> {
  constructor(props: TimeInfoBubbleProps) {
    super(props);
  }

  // const targetDate : any =  props.time.getTime();
  // const { value, unit } = selectUnit(Date.now() - targetDate);

  render() {
    return (
      <InfoBubble
        color={assignBubbleColor(this.props.time, this.props.timeType)}
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
          {this.props.time ? (
            <FormattedDate
              value={this.props.time}
              hour12={true}
              hour="numeric"
              minute="numeric"
              second="numeric"
              year="numeric"
              month="numeric"
              day="2-digit"
            />
          ) : (
            'Never (has not registered)'
          )}
        </div>
      </InfoBubble>
    );
  }
}

export { TimeInfoBubble };
