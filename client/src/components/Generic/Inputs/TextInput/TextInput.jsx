import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./TextInput.styled";

const TextInput = ({
  disabled,
  id,
  onChange,
  name,
  placeholder,
  styles,
  type,
  value
}) => {
  const onInputChange = e => {
    onChange(e.target.value);
  };
  return (
    <Styled.Container isInputEntered={!!value} styles={styles}>
      {!placeholder && <Styled.Label htmlFor={id}>{name}</Styled.Label>}
      <Styled.Input
        disabled={disabled}
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
  disabled: false,
  styles: [],
  type: `text`
};

TextInput.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default TextInput;
