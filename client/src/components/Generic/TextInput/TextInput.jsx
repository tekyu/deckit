import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./TextInput.styled";

const TextInput = ({ id, onChange, name, placeholder, type, value }) => {
  const onInputChange = e => {
    onChange(e.target.value);
  };
  return (
    <Styled.Container>
      <Styled.Label htmlFor={id}>{name}</Styled.Label>
      <Styled.Input
        type={type}
        name={id}
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
      />
    </Styled.Container>
  );
};

TextInput.defaultProps = {
  type: `text`
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default TextInput;
