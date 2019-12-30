import React, { useCallback } from "react";
import PropTypes from "prop-types";
import * as Styled from "./Select.styled";

const Select = ({ handler, options, selected }) => {
  const onSelectionChanged = useCallback(
    e => {
      handler(e.target.value);
    },
    [handler]
  );
  return (
    <Styled.Select
      onBlur={onSelectionChanged}
      onChange={onSelectionChanged}
      defaultValue={selected}
    >
      {options.map(option => {
        const { id = option, name = option } = option;
        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      })}
    </Styled.Select>
  );
};

Select.propTypes = {
  handler: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    PropTypes.arrayOf(PropTypes.string.isRequired)
  ]).isRequired,
  selected: PropTypes.string.isRequired
};

export default Select;
