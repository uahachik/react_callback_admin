import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
import PropTypes from "prop-types";
import ContactInfo from "./ContactInfo";
import AddRemark from "../layout/AddRemark";
import axios from "axios";
import "../../css/InlineHelpTips.css";

class Contact extends Component {
  state = {
    showContactInfo: false,
    showAddRemark: false
  };

  onDeleteClick = async (id, name, dispatch) => {
    // 
    if (window.confirm("Do you want to Delete this Contact?")) {
      var person = prompt("Please enter contact name.");

      if (person === null) {
        person = null;
      } else if (
        name ===
        person
          .toLowerCase()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.substring(1))
          .join(" ")
      ) {
        /*{
              // Delete Contact from Context State
                axios
                  .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
                  .then(res => dispatch({ type: "DELETE_CONTACT", payload: id }));
              }*/
        /*{
              // Delete Contact from Database
                await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
                dispatch({ type: "DELETE_CONTACT", payload: id });
              }*/
        // Delete Contact from DOM using Fake API
        try {
          await axios.delete(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          dispatch({ type: "DELETE_CONTACT", payload: id });
        } catch (e) {
          await axios.delete(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          dispatch({ type: "DELETE_CONTACT", payload: id });
        }
      } else {
        alert("The name does not match.");
      }
    }
  };

  render() {
    const { id, name, phone, remark } = this.props.contact;
    const { showContactInfo, showAddRemark } = this.state;

    return (
      // we need the Consumer in order to access from the Context
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card card-header mb-3">
              <h4>
                <div className="float-left">{name} </div>

                {/* CSS help-tip above showContactInfo */}
                <span id="about" className="help-tip">
                  <i>About Contact</i>
                </span>

                <i
                  className="fas fa-address-book"
                  style={{ position: "absolute", right: "50rem", top: "1rem" }}
                  onClick={() => {
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    });
                  }}
                />
              

                <i
                  className="fas fa-times float-right mr-1 mt-1 text-danger"
                  style={{ backgroundColor: "#ffffff" }}
                  onClick={this.onDeleteClick.bind(this, id, name, dispatch)}
                />

                {/* <span className="bg-warning float-right mr-5 pb-1">:)</span>  */}

                <Link to={`contact/edit/${id}`}>
                  <i className="fas fa-pencil-alt float-right mr-5 mt-1" />
                </Link>

                {/* !!! enable form input*/}
                  <i className="fas fa-bell text-warning float-right mr-5 mt-1" 
                  onClick={() => {
                    this.setState({
                      showAddRemark: !this.state.showAddRemark
                    });
                  }}
                  />

                {/* !!! form input */}
                {showAddRemark ? (                
                <AddRemark contact={this.props.contact} />
                ) : null}

                <div className="btn float-right w-50 mr-4 pt-1"
                     style={{backgroundColor: '#ffffff', height: '30px', border: "1px solid #e2e2e2"}}>{remark} </div>

              </h4>
              
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Phone: {phone}</li>
                  <li className="list-group-item">
                    <ContactInfo contact={this.props.contact} />
                  </li>
                </ul>
              ) : null}
            
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
