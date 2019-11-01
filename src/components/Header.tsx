import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Link } from 'react-router-dom';

import { LogOut } from 'react-feather';

import { logoutUser } from '../actions/loginActions';
import { Store } from '../reducers/rootReducer';

import logo from '../images/sigil_white.png';

class Header extends React.Component<HeaderProps> {
  state = { collapsed: false };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { logout } = this.props;
    return (
      <div className="mb-3 h-16 bg-red-custom shadow-md flex justify-between items-center">
        <Link to="/" className="h-16 p-2 flex flex-col justify-center">
          <img src={logo} className="h-12" alt="VascTrac logo" />
        </Link>

        <div className="w-64 flex justify-end items-center">
          <div className="h-16 p-2 flex flex-col justify-center">
            <Link
              to="/users/"
              className="text-white text-xl font-semibold text-center no-underline"
            >
              Users
            </Link>
          </div>
          <div className="h-16 p-2 flex flex-col justify-center" onClick={logout}>
            <LogOut color="white" />
          </div>
        </div>
      </div>
    );
  }
}

type HeaderProps = HeaderDispatchProps;

interface HeaderDispatchProps {
  logout: () => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    logout: () => {
      dispatch(logoutUser());
    },
  };
}

export default connect<{}, HeaderDispatchProps, {}, Store>(
  null,
  mapDispatchToProps
)(Header);
