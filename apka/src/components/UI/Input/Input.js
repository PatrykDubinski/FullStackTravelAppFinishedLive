import React from "react";

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

export default Input;
