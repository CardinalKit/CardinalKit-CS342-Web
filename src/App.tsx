import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import { Store } from './reducers/rootReducer';
import { isAuthenticated } from './selectors/loginSelectors';

import Header from './components/Header';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import UsersPage from './components/UsersPage';

interface AppProps {
  isAuth: boolean;
}

class App extends React.Component<AppProps> {
  render() {
    const { isAuth } = this.props;

    return (
      <Router>
        <div>
          {isAuth && <Header />}
          <Switch>
            <Route exact={true} path="/login" component={LoginPage} />
            <PrivateRoute exact={true} path="/users" component={UsersPage} />
            {/*<PrivateRoute exact={true} path="/user/:userID" component={UserPage} />*/}
            <Redirect exact={true} from="/" to="/users" />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state: Store) {
  return {
    isAuth: isAuthenticated(state),
  };
}

export default connect(mapStateToProps)(App);
