import { thisExpression, throwStatement } from '@babel/types';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { registerNewUser } from '../api/registerUser.ts';
import { Link } from 'react-router-dom';
import { getUserFromUID, saveNewMedications } from '../api/getAllUsers.ts';
import { MedicationCard } from './MedicationCard';
import isEqual from 'lodash.isequal';

class MedicationForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      firstName: '',
      lastName: '',
      email: '',
      medications: {},
    };

    this.firebaseState = null;  // will store upstream copy
    this.state = this.initialState;  // will store local copy
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getDetails(userID) {
    console.log("Getting details for userID");
    getUserFromUID(userID).then((docSnapshot) => {
      var userData = docSnapshot.data();
      this.firebaseState = JSON.parse(JSON.stringify(userData.medications)) // deep copy
      this.setState(userData);
      console.log(this.state.medications);
    });
  }

  componentDidMount() {
    this.getDetails(this.props.userID);
  }

  addRow = () => {
    var newState = this.state.medications;
    newState[""] = ""
    this.setState({medications: newState});
  }

  saveMedications = () => {
    var newMeds = this.state.medications;
    saveNewMedications(this.state.email, this.state.medications);
  }

  discardChanges = () => {
    this.getDetails(this.props.userID);
  }

  handleCallback = (id, data) => {
    var newState = this.state.medications;
    delete newState[id];  // remove old one
    console.log(data)
    if (data.medication){
      newState[data.medication] = data.interval;  // add new one
    }
    this.setState({medications: newState});
    console.log("Updated state: ", this.state.medications)
  }

  render() {

    const medications = this.state.medications;
    const handleCallback = this.handleCallback;
    const isModified = !isEqual(this.firebaseState, this.state.medications);

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="flex h-full w-full p-2">
          <div className="flex-grow flex flex-col justify-between">
            <div className="w-full mt-4 mb-4 ml-4">
              <h1>Medications for {this.state.firstName + " " + this.state.lastName}</h1>
              <h4>Email: {this.state.email}</h4>
              <br />
              <div>
              {Object.keys(medications).sort().map(function(medication) {
                  const interval = medications[medication];
                  return <MedicationCard parentCallback={handleCallback}
                          id={medication}
                          key={medication}
                          medication={medication}
                          interval={interval}/>;
              })}
              </div>
              <button type="button" onClick={() => this.addRow()}>
              <div className="bg-blue hover:bg-blue-dark border border-blue rounded mx-1 px-2 py-2 my-1 flex flex-wrap justify-center">
                <span className="text-white text-center">Add</span>
              </div>
              </button>
              {(isModified) &&
                <button type="button" onClick={() => this.saveMedications()}>
                  <div className="bg-green hover:bg-green-dark border border-green rounded mx-1 px-2 py-2 my-1 flex flex-wrap justify-center">
                    <span className="text-white text-center">Save</span>
                  </div>
                </button>
              }
              {(isModified) &&
                <button type="button" onClick={() => this.discardChanges()}>
                  <div className="bg-orange hover:bg-orange-dark border border-orange rounded mx-1 px-2 py-2 my-1 flex flex-wrap justify-center">
                    <span className="text-white text-center">Discard Changes</span>
                  </div>
                </button>
              }
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export { MedicationForm };
