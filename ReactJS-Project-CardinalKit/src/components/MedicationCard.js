import * as React from 'react';

import { Card } from '../ui/Card';

import { TimeInfoBubble, TimeType } from './TimeInfoBubble';

import { defineMessages, FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';
import MedicationPage from './MedicationPage';

import { BsUnlockFill, BsLockFill } from 'react-icons/bs';

const messages = defineMessages({
  medicineName: {
    id: 'app.containers.UserCard.name',
    defaultMessage: 'Name: ',
  },
  userIdHeader: {
    id: 'app.containers.UserCard.userid',
    defaultMessage: 'ID',
  },
  medicineInterval: {
    id: 'app.containers.UserCard.eid',
    defaultMessage: 'Interval: ',
  },
  viewUserButton: {
    id: 'app.containers.UserCard.viewUserButton',
    defaultMessage: 'See more',
  },
});

class MedicationCard extends React.Component {

  constructor(props) {
    super(props);
    var startOnEditMode = (this.props.medication == false);
    this.state = {editing: startOnEditMode, 
                  medication: this.props.medication,
                  interval: this.props.interval
    };
  }

  toggleEdit(){

    // on save, pass data to parent
    if (this.state.editing){
      console.log("Saving", this.state);
      this.props.parentCallback(this.props.id, {medication: this.state.medication,
                                                interval: parseInt(this.state.interval)});
    }

    this.setState({editing: !this.state.editing});
  }

  deleteRow = () => {
    this.props.parentCallback(this.props.id, {medication: false,
      interval: parseInt(false)});
  }

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    console.log(name, value)
    this.setState({
        [name]: value
    });
  }

  render() {
    return (
      <Card>
        <div className="flex h-full w-full p-2">
          <div className="py-1 flex justify-between">
            <p className="text-xl text-center font-bold">
              <FormattedMessage {...messages.medicineName} />
            </p>
            <input 
              className="font-mono p-1 text-center border boarder-grey-light bg-grey-lighter rounded-sm mx-4" 
              name="medication" 
              disabled={!this.state.editing}
              defaultValue={this.state.medication} 
              onChange={this.handleChange}
            />
            <p className="text-xl text-center font-bold">
              <FormattedMessage {...messages.medicineInterval} />
            </p>
            <input 
              className="font-mono p-1 text-center border boarder-grey-light bg-grey-lighter rounded-sm mx-4" 
              disabled={!this.state.editing}
              name="interval"
              defaultValue={this.state.interval}
              onChange={this.handleChange}
            />
            <div style={{"flexGrow": 1}} className="w-full"></div>
            <div onClick={() => this.toggleEdit()} className="bg-grey hover:bg-grey-dark border border-grey rounded mx-2 px-2 py-1 my-1 flex justify-center">
              <span className="text-black text-center">
                {(!this.state.editing) ? <BsLockFill/> : <BsUnlockFill/>}
              </span>
            </div>
            <div onClick={() => this.deleteRow()} className="bg-red hover:bg-red-dark border border-red rounded mx-1 px-2 py-1 my-1 flex justify-center"
                 style={{"display": (this.state.editing ? "block" : "none")}}>
              <span className="text-white text-center">
                Delete
              </span>
            </div>            
          </div>
        </div>
      </Card>
    );
  }
}

export { MedicationCard };
