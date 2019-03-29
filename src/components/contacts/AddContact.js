import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import TextareaTagGroup from "../layout/TextareaTagGroup";
import axios from "axios";

// all inputs is in a state
// when we submit it we're pulling in state
// constructing a new Contact
// calling "dispatch" method and
// send a type of "ADD_CONTACT" which is trigger in context.js
// (we sending the new contact as the payload and
// update the state by adding the new contact)

class AddContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    other: "",
    errors: {}
  };

  // "event" should be last here
  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    // get values from the state
    const { name, phone, email, other } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name Is Required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Phone Is Required" } });
      return;
    }

    // wi'll be construct a new contact object
    const newContact = {
      name, //  if key-value is the same don't need "name: name" etcetera
      phone,
      email,
      other
    };

    // adding Contact to Context State (into newContact should be "id: uuid()")
    /* dispatch({ type: "ADD_CONTACT", payload: newContact }); */

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    // dispatch({ type: "ADD_CONTACT", payload: newContact });

    // Clear state (inputs)
    this.setState({
      name: "",
      phone: "",
      email: "",
      other: "",
      errors: {}
    });

    // rediraction
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, phone, other, email, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card m-auto mb-3 w-50">
              <div className="card-header">Data of Contact</div>
              <div className="card-body">
                {/* we use "dispatch" inside of "onSubmit" */}
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="What should I call you?"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Type Your Phone Here..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <TextInputGroup
                    label="Email"
                    required=""
                    type="email"
                    name="email"
                    placeholder="Enter Your Valid Email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextareaTagGroup
                    label="Other"
                    name="other"
                    value={other}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-outline-primary w-25"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
