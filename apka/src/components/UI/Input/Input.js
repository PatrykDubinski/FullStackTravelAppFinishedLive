import React from "react";

import PropTypes from "prop-types";

const Input = ({
  type = "text",
  value,
  placeholder = "",
  required,
  className,
  name,
  callback,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      className={className}
      name={name}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  callback: PropTypes.func,
};

export default Input;
