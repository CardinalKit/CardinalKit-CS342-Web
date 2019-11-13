import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';

import { loginUser } from '../actions/loginActions';
import { getLoginState, isAuthenticated } from '../selectors/loginSelectors';

import { Button, ButtonColor, ButtonType } from '../ui/Button';

import logo from '../images/cardinal_logo.svg';

const messages = defineMessages({
  header: {
    id: 'LoginPage.header',
    defaultMessage: 'Login with Google',
  },
});

export class LoginPage extends React.Component {

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    this.props.onSubmitForm(event);
  };

  render() {
    const { isAuth, location, loading, error } = this.props;
    if (isAuth) {
      return <Redirect to={{ pathname: '/', state: { from: location } }} />;
    }

    return (
      <div className="w-full h-full min-h-screen flex justify-center items-center bg-red-custom">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-lg rounded pl-8 pr-8 pb-8 mb-2" onSubmit={this.handleSubmit}>
            <div className="flex justify-center mb-4">
              <img src={logo} alt="VascTrac" className="h-24" />
            </div>
            <div className="mb-4">
              {error && <p className="text-red text-xs italic">Unable to login. Please make sure you are using a valid @stanford.edu account.</p>}
            </div>
            <Button
              className="w-full"
              type={ButtonType.Submit}
              selected={loading}
              color={ButtonColor.Blue}
            >
              <FormattedMessage {...messages.header} />
            </Button>
          </form>
          <p className="text-center text-white text-xs">©2019 CardinalKit. All rights reserved.</p>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  isAuth: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onSubmitForm: PropTypes.func,
  location: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }

      dispatch(loginUser());
    },
  };
}

export function mapStateToProps(state) {
  const { loading, error } = getLoginState(state);
  return {
    isAuth: isAuthenticated(state),
    loading,
    error: error && error !== '',
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
