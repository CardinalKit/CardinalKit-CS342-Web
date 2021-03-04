import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectUserDetails } from '../selectors/usersSelectors';

import { Survey } from '../api/survey';
import { UserDetails } from '../api/user';

import { Store } from '../reducers/rootReducer';

import { defineMessages, FormattedDate, FormattedMessage } from 'react-intl';
import { Card } from '../ui/Card';
import {
  CardTable,
  CardTableCol,
  CardTableHeader,
  CardTableRow,
  CardTableTitle,
} from '../ui/CardTable';
import { TextInfoBubble } from './TextInfoBubble';

const messages = defineMessages({
  surveyTableHeader: {
    id: 'app.SurveysTable.surveyTableHeader',
    defaultMessage: 'Completed Surveys',
  },
  nameHeader: {
    id: 'app.SurveysTable.dateHeader',
    defaultMessage: 'Survey',
  },
  dateHeader: {
    id: 'app.SurveysTable.dateHeader',
    defaultMessage: 'Date',
  },
  surveyIdHeader: {
    id: 'app.SurveysTable.surveyIdHeader',
    defaultMessage: 'Survey ID',
  },
});

class SurveysTable extends React.Component<SurveyHeaderProps> {
  render() {
    const { userDetails } = this.props;

    if (!userDetails || !userDetails.surveyList) {
      return (
        <Card>
          <h4 className="p-4 text-center">No surveys available</h4>
          {/* <p className="p-5">Loading...</p> */}
        </Card>
      );
    }

    const { surveyList } = userDetails;

    return (
      <CardTable>
        <CardTableTitle>
          <FormattedMessage {...messages.surveyTableHeader} />
        </CardTableTitle>
        <CardTableHeader>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.nameHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.dateHeader} />
          </CardTableCol>
          <CardTableCol widthPercent={25}>
            <FormattedMessage {...messages.surveyIdHeader} />
          </CardTableCol>
        </CardTableHeader>
        {surveyList.map((survey: Survey, i: number) => (
          <CardTableRow
            key={`survey-${survey.payload.taskRunUUID}`}
            isLast={surveyList.length - 1 === i}
          >
            <CardTableCol widthPercent={25}>
              <TextInfoBubble label={survey.payload.identifier} />
            </CardTableCol>
            <CardTableCol widthPercent={25}>
              <FormattedDate
                value={survey.payload.startDate}
                year="numeric"
                month="numeric"
                day="2-digit"
              />
            </CardTableCol>
            <CardTableCol className="font-mono text-sm" widthPercent={25}>
              {survey.payload.taskRunUUID}
            </CardTableCol>
          </CardTableRow>
        ))}
      </CardTable>
    );
  }
}

type SurveyHeaderProps = SurveysStoreProps & SurveysTableProps;

interface SurveysStoreProps {
  userDetails: UserDetails | undefined;
}

interface SurveysTableProps {
  userID: string;
}

function mapStateToProps(state: Store, props: SurveysTableProps): SurveysStoreProps {
  return {
    userDetails: selectUserDetails(state, props),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export default connect<SurveysStoreProps, {}, SurveysTableProps, Store>(
  mapStateToProps,
  mapDispatchToProps
)(SurveysTable);
