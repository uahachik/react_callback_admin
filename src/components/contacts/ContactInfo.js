import React, {Component} from "react";
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
        const {email, other} = this.props.contact;
        const {showEnvelope} = this.state;

        return (
            <React.Fragment>
                <div style={{backgroundColor: "#f5f5f5"}}>
                    More Info:
                    <i
                        className="fas fa-envelope-open-text float-right"
                        style={other || email ? showEnvelopeColor : dontShowEnvelopeColor}
                        onClick={() => {
                            this.setState({showEnvelope: !this.state.showEnvelope});
                        }}
                    />
                </div>

                {showEnvelope && (other || email) &&
                    <React.Fragment>
                        <React.Fragment>E-mail: {email}</React.Fragment>
                        <div className="bg-light">Message: <i>{other}</i></div>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

ContactInfo.propTypes = {
    contact: PropTypes.object.isRequired
};

const showEnvelopeColor = {
    cursor: 'pointer',
    position: 'absolute',
    right: '783px',
    // right: '49rem',
    top: 16,
    backgroundColor: "yellow"
};

const dontShowEnvelopeColor = {
    position: 'absolute',
    right: '783px',
    // right: '49rem',
    top: 16,
};

export default ContactInfo;
