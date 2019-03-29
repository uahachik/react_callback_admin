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
    errors: {}
  };

  // fetching data from JsonAPI
  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      other: contact.other
    });
  }

  // "event" should be last here
  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    // get values from the state
    const { name, phone, email, other } = this.state;
    // get id from parameters
    const { id } = this.props.match.params;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name Is Required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Phone Is Required" } });
      return;
    }

    const updContact = {
      name,
      phone,
      email,
      other
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    // Clear state (inputs)
    this.setState({
      //   name: "",
      //   phone: "",
      //   email: "",
      //   other: "",
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
              <div className="card-header">Edit Contact</div>
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
                  />
                  <TextareaTagGroup
                    label="Other"
                    name="other"
                    value={other}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
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
