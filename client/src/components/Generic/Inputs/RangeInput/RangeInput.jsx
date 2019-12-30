import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./RangeInput.styled";

const RangeInput = ({ disabled, id, max, min, name, onChange, value }) => {
  const onInputChange = e => {
    onChange(e.target.value);
  };
  return (
    <Styled.Container>
      <Styled.Label htmlFor={id}>{name} </Styled.Label>
      <Styled.Input
        disabled={disabled}
        min={min}
        max={max}
        name={id}
        onChange={onInputChange}
        value={value}
        type="range"
      />
      {value}
    </Styled.Container>
  );
};

RangeInput.defaultProps = {
  disabled: false,
  type: `text`
};

RangeInput.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default RangeInput;
