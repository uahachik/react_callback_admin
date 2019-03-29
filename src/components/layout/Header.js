import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeDisplay from "./TimeDisplay";

const Header = props => {
  const { greeting } = props;

  const data = () => {
    var today = new Date();
    const y = today.getFullYear();
    let m = today.getMonth() + 1;
    m <= 9 ? (m = "0" + m) : (m = "" + m);
    const d = today.getDate();
    const data = d + ":" + m + ":" + y;
    return data;
  };
  const watch = data();

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark
      badge-secondary mb-3 py-0"
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          {greeting}
        </Link>
        <span className="fas fa-grin-beam ml-auto" />
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
    </nav>
  );
};

Header.defaultProps = {
  greeting: "Callback Admin Page"
};

Header.propTpes = {
  greeting: PropTypes.string.isRequired
};

export default Header;
