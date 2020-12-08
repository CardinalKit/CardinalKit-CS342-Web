import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import App from './App';

import 'core-js/es7/map'; // To fix Map in devtools
import 'core-js/es7/set';

import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-relativetimeformat/polyfill';

import '@formatjs/intl-pluralrules/dist/locale-data/en'; // locale-data for en
import '@formatjs/intl-relativetimeformat/dist/locale-data/en'; // Add locale data for en

import './index.css';
import { unregister } from './registerServiceWorker';
import './styles/root.css';
// import './tailwind.out.css';

import store from './store';

import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}>
      <IntlProvider locale="en">
        <App />
      </IntlProvider>
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root') as HTMLElement
);

// Register service worker
unregister();
