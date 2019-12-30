import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./Checkbox.styled";

const Checkbox = ({ id, onChange, name, value }) => {
  const onInputChange = e => {
    onChange(e.target.checked);
  };
  return (
    <Styled.Container>
      <Styled.Label htmlFor={id}>{name} </Styled.Label>
      <Styled.Input
        type="checkbox"
        name={id}
        onChange={onInputChange}
        checked={value}
      />
    </Styled.Container>
  );
};

Checkbox.defaultProps = {
  disabled: false,
  type: `text`
};

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired
};

export default Checkbox;
