import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl';

import { fetchSurveys } from '../actions/surveyActions';
import { Survey } from '../api/survey';
import { Store } from '../reducers/rootReducer';
import { selectSortedSurveys } from '../selectors/surveySelectors';

// import { EventsTableRow } from "./EventsTableRow";
import { Card } from '../ui/Card';
import { EventTypeBubble } from './EventTypeBubble';

import {
  CardTable,
  CardTableCol,
  CardTableHeader,
  CardTableRow,
  CardTableTitle,
} from '../ui/CardTable';

const messages = defineMessages({
  surveyTableHeader: {
    id: 'app.SurveysTable.surveyTableHeader',
    defaultMessage: 'Completed Surveys',
  },
  eventTypeHeader: {
    id: 'app.EventsTable.eventTypeHeader',
    defaultMessage: 'Event Type',
  },
  dateHeader: {
    id: 'app.SurveysTable.dateHeader',
    defaultMessage: 'Date',
  },
  surveyIdHeader: {
    id: 'app.SurveysTable.surveyIdHeader',
    defaultMessage: 'Survey ID',
  },
  syncIdHeader: {
    id: 'app.SurveysTable.syncIdHeader',
    defaultMessage: 'Sync ID',
  },
});

class SurveysTable extends React.Component<SurveysTableProps> {
  componentDidMount() {
    this.props.loadSurveys();
  }

  render() {
    const { surveys } = this.props;
    if (!surveys) {
      return (
        <Card>
          <p>Loading...</p>
        </Card>
      );
    }
    return (
      <CardTable>
        <CardTableTitle>
          <FormattedMessage {...messages.surveyTableHeader} />
        </CardTableTitle>
        <CardTableHeader>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.eventTypeHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.dateHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.surveyIdHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.syncIdHeader} />
          </CardTableCol>
        </CardTableHeader>
        {surveys.map((survey: Survey, i: number) => (
          <CardTableRow key={`survey-${survey.ID}`} isLast={surveys.length - 1 === i}>
            <CardTableCol widthPercent={25}>
              <EventTypeBubble eventType={survey.eventType} />
            </CardTableCol>
            <CardTableCol widthPercent={25}>
              <FormattedDate
                value={survey.createdAt}
                year="numeric"
                month="numeric"
                day="2-digit"
              />
            </CardTableCol>
            <CardTableCol className="font-mono text-sm" widthPercent={25}>
              {survey.ID}
            </CardTableCol>
            <CardTableCol className="font-mono text-sm" widthPercent={25}>
              {survey.syncID}
            </CardTableCol>
          </CardTableRow>
        ))}
      </CardTable>
    );
  }
}

interface SurveysTableStateProps {
  surveys: Survey[] | undefined;
}
interface SurveysTableDispatchProps {
  loadSurveys: () => void;
}

interface SurveysTableContainerProps {
  userID: number;
}

type SurveysTableProps = SurveysTableStateProps &
  SurveysTableDispatchProps &
  SurveysTableContainerProps;

function mapStateToProps(state: Store, props: SurveysTableContainerProps): SurveysTableStateProps {
  return {
    surveys: selectSortedSurveys(state, props),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: SurveysTableContainerProps
): SurveysTableDispatchProps {
  return {
    loadSurveys: () => {
      dispatch(fetchSurveys(props.userID));
    },
  };
}

export default connect<
  SurveysTableStateProps,
  SurveysTableDispatchProps,
  SurveysTableContainerProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(SurveysTable);
