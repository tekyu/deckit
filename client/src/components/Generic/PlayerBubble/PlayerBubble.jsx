import React from "react";
import styled from "styled-components";
// import { styled } from "@material-ui/styles";

const StyledContainer = styled.div`
  width: 30px;
  height: 30px;
  min-height: 30px;
  min-width: 30px;
  border-radius: 100%;
  background: black;
  /* margin-right: 12px; */
  ${({ avatar }) =>
    avatar &&
    `
    background-image: ${avatar};
  `}
  ${({ color }) =>
    color &&
    `
    box-shadow: 0px 0px 10px 0px ${color};
    background-color: ${color};
  `}
`;

const PlayerBubble = ({ avatar, color }) => {
  return <StyledContainer avatar={avatar} color={color} />;
};

export default PlayerBubble;
