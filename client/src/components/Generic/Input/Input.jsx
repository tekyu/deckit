import React from "react";
import PropTypes from "prop-types";

const Input = ({
  name, text, value, handler,
}) => (
  <input
    type="text"
    name={name}
    onChange={handler}
    placeholder={text}
    value={value}
  />
);

Input.propTypes = {
  handler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Input;
