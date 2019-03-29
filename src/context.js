import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

// Reducer that is going to evaluate the action type and then to filter out whatever the id is which is sent in the payload
// Submit action when we call it, which will be an object and it will be have a type
// the type is what we want to evaluate to figure out what we're going to be doing
// type is going to be a capitalized string of what it does
const reducer = (state, action) => {
  switch (action.type) {
    // When we click the delete button it calls a member of state "dispatch", then
    // call this function, pass in a type of DELETE_CONTACT and then
    // it runs "return" and delete it from the state.
    case "DELETE_CONTACT":
      return {
        // we use spread operator here to initial State
        ...state,
        // payload is just some data that you want to send along with your action
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      // case "add" we want to return an object and initial state
      return {
        ...state,
        // a "payload" that we're going to send
        //  which will be entire contact whith "name, phone, other, id"
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
      // case "update" we want to return an object and initial state
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    case "ADD_NOTE":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};

// context holds application level state
export class Provider extends Component {
  state = {
    contacts: [],
    // dispatch is part of our state that we're passing
    // to any component that want to use it and uses the Consumer
    dispatch: action => this.setState(state => reducer(state, action))
  };

  /*  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => this.setState({ contacts: res.data }));
  }*/

  // asyncronous operation
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ contacts: res.data });
  }

  render() {
    return (
      // Provider that is given off this Value which holds the state
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
