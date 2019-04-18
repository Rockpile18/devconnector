import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const checkboxStyle = {
  width: "1rem",
  height: "1rem"
};

const CheckboxGroup = ({ name, value, error, info, onChange, placeholder }) => {
  return (
    <div className="form-group">
      <input
        style={checkboxStyle}
        type="checkbox"
        className={classnames("form-control form-check-input", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label>{placeholder}</label>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default CheckboxGroup;
