import { thisExpression, throwStatement } from '@babel/types';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { registerNewUser } from '../api/registerUser.ts';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      first_name: '',
      last_name: '',
      email: '',
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert('Patient Registered');
    const new_user = {
      firstName: this.state.first_name,
      lastName: this.state.last_name,
      email: this.state.email,
      lastActive: 0,
      userID: this.state.first_name + this.state.last_name,
    };
    registerNewUser(new_user);
    event.preventDefault();

    // reset form
    this.setState(this.initialState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="flex h-full w-full p-2">
          <div className="flex-grow flex flex-col justify-between">
            <div className="w-full mt-4 mb-4 ml-4">
              <h1>Register a New Patient:</h1>
              <br />
              <div className="flex flex-col mb-4 mr-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest">First Name:</label>
                <input
                  className="border py-2 px-3 text-grey-darkest"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="flex flex-col mb-4 mr-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest">Last Name:</label>
                <input
                  className="border py-2 px-3 text-grey-darkest"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="flex flex-col mb-4 mr-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest">Email:</label>
                <input
                  className="border py-2 px-3 text-grey-darkest"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" value="Register">
                <div className="bg-green hover:bg-green-dark border border-green rounded px-2 py-2 my-1 flex flex-wrap justify-center">
                  <span className="text-white text-center">Register</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export { RegisterForm };
