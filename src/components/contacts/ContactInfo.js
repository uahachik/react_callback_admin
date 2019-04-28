import React, { Component } from "react";
import PropTypes from "prop-types";

class ContactInfo extends Component {
  state = {
    showEnvelope: false
  };

  // That's one thing they say about React is there are a million ways to do the same things
  /* onEnvelopeClick = () => {
        this.setState({ showEnvelope: !this.state.showEnvelope });
      }; */

  render() {
    const { email, other } = this.props.contact;
    const { showEnvelope } = this.state;

    return (
      <React.Fragment>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          More Info:
          <i
            className="fas fa-envelope-open-text float-right bg-warning"
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "783px",
              // right: "49rem",
              top: "16px"
            }}
            onClick={() => {
              this.setState({ showEnvelope: !this.state.showEnvelope });
            }}
          />
        </div>

        {showEnvelope ? (
          <React.Fragment>
            <React.Fragment>E-mail: {email}</React.Fragment>
            <div className="bg-light">Message: <i>{other}</i></div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

ContactInfo.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactInfo;
