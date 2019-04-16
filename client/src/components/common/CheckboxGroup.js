import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const CheckboxGroup = ({ name, value, error, info, onChange }) => {
  return (
    <div className="form-group">
      <input
        type="checkbox"
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default CheckboxGroup;
