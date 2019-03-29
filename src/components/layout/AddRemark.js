import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";

class Addremark extends Component {
  constructor(props) {
    super(props);

    this.remarkInput = React.createRef();
  }

  // fetching data from JsonAPI
  async componentDidMount() {
    const { id } = this.props.contact;
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

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    // remark: this.remarkInput.current.value

    // get values from the state
    const { /* remark, */ name, phone, email, other } = this.state;
    // get id from parameters
    const { id } = this.props.contact;

    const updContact = {
      name,
      phone,
      email,
      other,
      // remark,
      remark: this.remarkInput.current.value
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });
  };

  render() {
    const { remark } = this.props;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="btn w-50" style={remarkStyle}>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <input style={{width: "520px", padding: "5px", marginLeft: "8px", border: "1px solid #ccccccc"}}
                  type="text"                  
                  name="remark"
                  placeholder="Add a remark"
                  value={remark}
                  defaultValue={remark}
                  ref={this.remarkInput}
                />
                <input
                  className="fas fa-pencil-alt"
                  //  hidden
                  type="Submit"
                  value="Add"
                  type="Add"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

const remarkStyle = {
  position: "absolute",
  right: "360px",
  top: "-41px",
  // padding: "10"
};

export default Addremark;
