import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticated } from '../selectors/loginSelectors';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
};

export function mapStateToProps(state) {
  return {
    isAuth: isAuthenticated(state),
  };
}

export default connect(
  mapStateToProps,
  null,
  null,
  {
    pure: false,
  }
)(PrivateRoute);
