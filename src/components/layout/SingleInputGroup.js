import React from "react";
import PropTypes from "prop-types";

const SingleInputGroup = ({ name, value, placeholder, type, onChange }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

SingleInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

SingleInputGroup.defaultProps = {
  type: "text"
};

export default SingleInputGroup;
