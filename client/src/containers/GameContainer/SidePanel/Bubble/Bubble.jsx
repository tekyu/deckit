import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: greenyellow;
  margin: 4px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  &:first-of-type {
    margin-left: 0;
  }
  ${({ opened }) =>
    opened &&
    `
    border: 3px solid magenta;
  `}
  ${({ updated }) =>
    updated &&
    `
    &:after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 10px;
      background: orange;
      top: 0;
      right: -5px;
    }
  `}
`;
const Bubble = ({ handler, opened, updated, name }) => {
  return (
    <Container
      name={name}
      opened={opened}
      updated={updated}
      onClick={handler}
    ></Container>
  );
};

Bubble.propTypes = {
  handler: PropTypes.func.isRequired,
  name: PropTypes.string,
  opened: PropTypes.bool,
  updated: PropTypes.bool
};

Bubble.defaultProps = {
  handler: () => {},
  name: "chat",
  opened: false,
  updated: false
};

export default Bubble;
