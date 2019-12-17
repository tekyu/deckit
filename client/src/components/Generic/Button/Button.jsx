import React, { memo } from "react";
import PropTypes from "prop-types";
import * as Styled from "./Button.styled";

/**
 * Button component
 * @param {node} children The content of the button
 * @param {onClick} function Fired on event click
 * @param {preset} string Predefined styles(primary or secondary)
 * @param {Array.<string>} styles Additional styles to apply
 * @param {string} type One of button types - [button, reset, submit]
 */
const Button = ({ children, onClick, preset, styles, type }) => {
  return (
    <Styled.Button
      className={preset}
      onClick={onClick}
      styles={styles}
      type={type}
    >
      {children}
    </Styled.Button>
  );
};

Button.defaultProps = {
  styles: [],
  preset: ``,
  type: `button`
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  preset: PropTypes.oneOf([``, `primary`, `secondary`]),
  styles: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf([`button`, `reset`, `submit`])
};

export default memo(Button);
