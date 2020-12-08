import * as React from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../images/login-office.jpeg';
import logo2 from '../images/cardinal_logo.svg';

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: null,
      verified_code: false
    };
  }

  onSubmitHandler = () => {
    this.setState({
      userCode: document.getElementById('verificationCode')
    })
    var isLoggedIn = false
    if (this.state.userCode === localStorage.getItem('verify-code')) {
      this.setState({
        verified_code: true
      })
      isLoggedIn = true
      window.sessionStorage.setItem('isLoggedIn', isLoggedIn);
    }
  };

  render() {
    if (this.state.verified_code) {
      window.location.reload()
      return <Redirect to={{ pathname: "/users" }} />
    }

    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">

            <div className=" flex flex-row h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={logo}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={logo2}
                alt="Office"
              />
            </div>

            <div className="flex flex-row overflow-y-auto md:flex-row">
              <div className="px-4 py-3 mb-8 bg-white rounded-lg dark:bg-gray-800">
                <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Two Factor Authentication</h4>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Please Enter the Two Factor Authentication code sent to your email.</span>
                  <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Enter your verification code"
                    type="number"
                    id="verificationCode"
                    onChange={e => this.setState({ userCode: e.target.value })}
                  />
                </label>

                <a
                  href="/users"
                  style={{ marginTop: 24, padding: 175, paddingTop: 10, paddingBottom: 10 }}
                  className="flex items-center justify-between px-auto content-center py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple w-full"
                  onClick={() => this.onSubmitHandler()}
                >
                  <span>Submit</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationPage;
