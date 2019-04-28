import React, { Component } from "react";
import Contact from "./Contact";
// any component that we want to use the context with, we bring in the Comsumer
import { Consumer } from "../../context";

class Contacts extends Component {
  render() {
    return (
      // "value" is coming fromm Contex Provider
      // consumer tag gives us this value which contains anything we passed in it
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h4 className="mb-1" style={hStyling}>
                CONTACT LIST
              </h4>
              {contacts.map(contact => (
                // Contacts is created in the Provider but we are consuming it here
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

const hStyling = {
  background: "#e0e0e0",
  color: "#555555",
  textAlign: "center",
  padding: "10px"
};

export default Contacts;
