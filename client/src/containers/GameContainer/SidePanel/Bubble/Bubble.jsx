import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: greenyellow;
  margin: 4px;
  cursor: pointer;
  box-sizing: border-box;
  &:first-of-type {
    margin-left: 0;
  }
  ${({ openedPanel }) =>
    openedPanel &&
    `
    border: 3px solid magenta;
  `}
`;
const Bubble = ({ handler, ...rest }) => {
  return <Container {...rest} onClick={handler}></Container>;
};

export default Bubble;
