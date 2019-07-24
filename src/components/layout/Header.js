import React, {Component} from 'react';
// import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeDisplay from "./TimeDisplay";

// const Header = props => {
class Header extends Component {
  render() {
  const greeting = this.props.greeting;
  // console.log(greeting);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark badge-secondary mb-3 py-0">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {greeting}
        </Link>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain">
            <span className="navbar-toggler-icon"></span>
        </button>
        {/* <span className="fas fa-grin-beam ml-auto" /> */}
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ml-auto mr-4">
            <li className="nav-item">
              <Link to="/" className="fas fa-home text-light nav nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact/add"
                className="fas fa-calendar-plus nav-link text-light"
              >
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="fas fa-question nav-link text-light">
                About
              </Link>
            </li>
          </ul>
          <TimeDisplay/>
        </div>
      </div>
    </nav>
    );
  }
};

Header.defaultProps = {
  greeting: "Callback Admin Page"
};

Header.propTpes = {
  greeting: PropTypes.string.isRequired
};

export default Header;
