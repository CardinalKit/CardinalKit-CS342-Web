import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import UserList from './UserList';

const messages = defineMessages({
  header: {
    id: 'app.containers.UserPage.header',
    defaultMessage: 'Users',
  },
});

export default class UsersPage extends React.PureComponent {
  render() {
    return (
      <div className="container mx-auto">
        <div className="w-full mt-4 mb-4 ml-4">
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
        <div className="w-full">
          <UserList />
        </div>
      </div>
    );
  }
}
