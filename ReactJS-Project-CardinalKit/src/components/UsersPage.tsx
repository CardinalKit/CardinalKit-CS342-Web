import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import UserList from './UserList';

const messages = defineMessages({
  header: {
    id: 'app.containers.UserPage.header',
    defaultMessage: 'Dashboard',
  },
});

export default class UsersPage extends React.PureComponent {
  render() {
    return (
      <div className="container mx-auto">
        <div className="w-full mt-4 mb-4 ml-4">
          <h2 className="px-6 my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            <FormattedMessage {...messages.header} />
          </h2>
        </div>
        <div className="w-full">
          <UserList />
        </div>
      </div>
    );
  }
}
