import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';
import Pagination from './Pagination'




import { selectUserDetails } from '../selectors/usersSelectors';

import { UserDetails } from '../api/user';


import { Store } from '../reducers/rootReducer';

import { defineMessages } from 'react-intl';
import { Card } from '../ui/Card';
import { getSurvey, getSurveys } from '../api/getAllUsers';
import ReactTable from 'react-table-6';

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

interface SurveyList {
  userID: string,
  identifier: string,
  startDate: string,
  endDate: string,
}

interface State {
  surveyList: SurveyList[]
  surveyIds: string[]
}

class SurveysTable extends React.Component<SurveyHeaderProps, State> {
  constructor(props) {
    super(props)
    this.state = {
      surveyIds: [],
      surveyList: []
    }
  }


  componentDidMount() {
    const { userID } = this.props;
    const tempSurveyList: any[] = [];
    getSurveys(userID).then((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.id);
      this.setState({
        surveyIds: [...data]
      })
      data.map((surveyId) => {
        return getSurvey(userID, surveyId)
          .then((data) => {
            if (data.payload) {
              const startDate = moment(data?.payload?.startDate.substring(0, 10)).format('ll')
              const identifier = data?.payload?.identifier
              const surveyData = {
                startDate,
                identifier,
                view:
                  <div><span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                    View Response</span>
                  </div>
              }
              tempSurveyList.push(surveyData)
              this.setState({
                surveyList: [...tempSurveyList]
              })
            }
          })
      })
    })
  }

  render() {
    const { userID } = this.props;

    if (!userID) {
      return (
        <Card>
          <p className="p-5">{userID}</p>
        </Card>
      );
    }

    const columns = [
      {
        Header: () => (
          <div className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">Survey Name</div>
        ),
        accessor: 'identifier',
        className: 'font-semibold',
        width: 300
      },
      {
        Header: () => (
          <div className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">survey submitted</div>
        ),
        accessor: 'startDate',
        className: "px-4 py-3 text-sm",
        width: 200
      },
      {
        Header: () => (
          <div className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">action</div>
        ),
        accessor: 'view',
        filterable: false,
        width: 400
      }
    ];
    return (
      <div className="container px-6 mx-auto " >
        <div className="grid gap-6 mb-8 w-full mt-40 ">
          <ReactTable
            data={this.state.surveyList}
            columns={columns}
            className="surveyTable"
            defaultPageSize={5}
            PaginationComponent={Pagination}
            filterable={true}
          />
        </div>
      </div>
    );
  }
}

type SurveyHeaderProps = SurveysStoreProps &
  SurveysTableProps;

interface SurveysStoreProps {
  userDetails: UserDetails | undefined;
}

interface SurveysTableProps {
  userID: string;
}

function mapStateToProps(
  state: Store,
  props: SurveysTableProps
): SurveysStoreProps {
  return {
    userDetails: selectUserDetails(state, props),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {};
}

export default connect<
  SurveysStoreProps,
  {},
  SurveysTableProps,
  Store
>(
  mapStateToProps,
  mapDispatchToProps
)(SurveysTable);
