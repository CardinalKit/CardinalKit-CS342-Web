import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ArrowDown, ArrowUp } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';

import { changeProvidersSort, fetchProviders, toggleHideEIDType } from '../actions/providersActions';

import { ProviderDetails } from '../api/provider';
import { ProvidersSortField, ProvidersSortOrder } from '../constants/providersConstants';
import { Store } from '../reducers/rootReducer';
import {
  selectHiddenEIDTypes,
  selectProviders,
  selectProvidersSortField,
  selectProvidersSortOrder,
} from '../selectors/providersSelectors';

import ProviderCard from './ProviderCard';

import { Card } from '../ui/Card';

const messages = defineMessages({
  sortBy: {
    id: 'app.ProviderList.sortBy',
    defaultMessage: 'Sort by:',
  },
  sortOrder: {
    id: 'app.ProviderList.sortOrder',
    defaultMessage: 'Sort order:',
  },
  eidPrefixes: {
    id: 'app.ProviderList.sortOrder',
    defaultMessage: 'Filter by EID prefix',
  },
  lastActive: {
    id: 'app.ProviderList.lastActive',
    defaultMessage: 'Last Active',
  },
  lastWalktest: {
    id: 'app.ProviderList.lastWalktest',
    defaultMessage: 'Last Walktest',
  },
  eid: {
    id: 'app.ProviderList.eid',
    defaultMessage: 'Email',
  },
  eidTypeFormat: {
    id: 'app.ProviderList.eidTypeFormat',
    defaultMessage: '{eidType}',
  },
  downArrowText: {
    id: 'app.ProviderList.downArrowText',
    defaultMessage: 'Descending',
  },
  upArrowText: {
    id: 'app.ProviderList.upArrowText',
    defaultMessage: 'Ascending',
  },
});

class ProviderList extends React.Component<ProviderListProps> {
  componentDidMount() {
    const { loadProviders } = this.props;
    loadProviders();
  }

  selectProviderEID = () => this.props.changeProvidersSort(ProvidersSortField.UserEID, undefined);

  selectAscending = () => this.props.changeProvidersSort(undefined, ProvidersSortOrder.Ascending);

  selectDescending = () => this.props.changeProvidersSort(undefined, ProvidersSortOrder.Descending);

  render() {
    const { providerList, sortField, sortOrder } = this.props;
    return (
        <div>
          <Card className="flex flex-wrap justify-center">
            <div className="px-4 my-4 flex items-center justify-center">
              <p className="font-semibold text-sm p-2">
                <FormattedMessage {...messages.sortBy} />
              </p>
              <div className="inline-flex h-8">
                <button
                    className={`${
                        sortField === ProvidersSortField.UserEID ? 'bg-grey' : 'bg-grey-light hover:bg-grey'
                    }  text-sm text-center font-bold py-2 px-3 rounded-r`}
                    onClick={this.selectProviderEID}
                >
                  <FormattedMessage {...messages.eid} />
                </button>
              </div>
            </div>
            <div className="px-4 my-4 flex items-center justify-center">
              <p className="font-semibold text-sm p-2">
                <FormattedMessage {...messages.sortOrder} />
              </p>
              <div className="inline-flex h-8">
                <button
                    className={`${
                        sortOrder === ProvidersSortOrder.Descending
                            ? 'bg-grey'
                            : 'bg-grey-light hover:bg-grey'
                    } px-3 rounded-l flex items-center justify-center`}
                    onClick={this.selectDescending}
                >
                  <ArrowDown className="mr-1" color="black" />
                  <span className="ml-1 text-sm font-bold">
                  <FormattedMessage {...messages.downArrowText} />
                </span>
                </button>
                <button
                    className={`${
                        sortOrder === ProvidersSortOrder.Ascending ? 'bg-grey' : 'bg-grey-light hover:bg-grey'
                    } px-3 rounded-r flex items-center justify-center`}
                    onClick={this.selectAscending}
                >
                  <ArrowUp className="mr-1" color="black" />
                  <span className="ml-1 text-sm font-bold">
                  <FormattedMessage {...messages.upArrowText} />
                </span>
                </button>
              </div>
            </div>
          </Card>
          <div>
            {providerList.map(provider => {
              return <ProviderCard key={provider.userID} provider={provider} />;
              // return <h3>provider card</h3>;
            })}
          </div>
        </div>
    );
  }
}
type ProviderListProps = ProviderListStateProps & ProviderListDispatchProps;

interface ProviderListStateProps {
  providerList: ProviderDetails[];
  sortOrder: ProvidersSortOrder;
  sortField: ProvidersSortField;
  // Defined in terms of hidden, rather than shown to simplify reducer
  hiddenEIDTypes: string[];
}

interface ProviderListDispatchProps {
  loadProviders: () => void;
  changeProvidersSort: (sortField?: ProvidersSortField, sortOrder?: ProvidersSortOrder) => void;
  toggleHideEIDType: (eidType: string) => void;
}

interface ProviderListContainerProps {
  userID: number;
}

function mapStateToProps(state: Store): ProviderListStateProps {
  return {
    providerList: selectProviders(state),
    sortOrder: selectProvidersSortOrder(state),
    sortField: selectProvidersSortField(state),
    hiddenEIDTypes: selectHiddenEIDTypes(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    loadProviders: () => {
      dispatch(fetchProviders());
    },
    changeProvidersSort: (sortField?: ProvidersSortField, sortOrder?: ProvidersSortOrder) => {
      dispatch(changeProvidersSort(sortField, sortOrder));
    },
    toggleHideEIDType: (eidType: string) => {
      dispatch(toggleHideEIDType(eidType));
    },
  };
}

export default connect<ProviderListStateProps, ProviderListDispatchProps, {}, Store>(
    mapStateToProps,
    mapDispatchToProps
)(ProviderList);
