import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import UserList from './UserList';

import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';

const messages = defineMessages({
  header: {
    id: 'app.containers.UserPage.header',
    defaultMessage: 'Users',
  },
  addUserButton: {
    id: 'app.UserList.addUserButton',
    defaultMessage: 'Register a New Patient',
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
          <div className="flex flex-wrap justify-center">
            <Link to={`/register`} className="no-underline">
              <div className="bg-green hover:bg-green-dark border border-green rounded px-2 py-2 flex justify-center">
                <span className="text-white text-center">
                  <FormattedMessage {...messages.addUserButton} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
