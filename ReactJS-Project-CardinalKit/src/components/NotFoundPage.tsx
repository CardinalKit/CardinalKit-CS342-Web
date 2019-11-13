import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  header: {
    id: 'app.NotFoundPage.header',
    defaultMessage: 'Page Not Found',
  },
});

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="container mx-auto">
        <div className="w-full mb-4">
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
      </div>
    );
  }
}
