import React, { Component } from "react";
import { Consumer } from "../../context";
import SingleInputGroup from "../layout/SingleInputGroup";
import axios from "axios";

class AddNote extends Component {
  state = {
    state: ""
  };

  // fetching data from JsonAPI
  async componentDidMount() {
    const { id } = this.props.match.params;
    // const { id } = this.props.contact;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      other: contact.other,
      note: contact.note
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    // get values from the state
    const { name, phone, email, other, note } = this.state;
    // get id from parameters
    const { id } = this.props.match.params;
    // const { id } = this.props.contact;

    const addNote = {
      name,
      phone,
      email,
      other,
      note
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      addNote
    );
    dispatch({ type: "ADD_NOTE", payload: res.data });

    // Clear state (inputs)
    this.setState({
      // note: ""
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    // const { note } = this.props.contact;
    const { note } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="btn w-50" style={noteStyle}>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <SingleInputGroup
                  name="note"
                  placeholder="No notes yet"
                  value={note}
                  onChange={this.onChange}
                />
                <input
                  className="fas fa-pencil-alt"
                  //  hidden
                  type="submit"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

const noteStyle = {
  position: "absolute",
  right: "200px",
  top: "-16px",
  padding: "0"
};

export default AddNote;
