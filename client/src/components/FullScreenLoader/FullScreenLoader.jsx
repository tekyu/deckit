import React from "react";
import styled from "styled-components";
import Logo from "../Generic/Logo/Logo";
import background from "../../assets/images/trianglify.svg";

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const StyledLoader = styled.div`
  user-select: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: url(${background});
  background-repeat: no-repeat;
  background-size: 500%;
  background-position: 50% 70%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border: 4px solid #fff;
  cursor: default;
  pointer-events: none;
`;

export const StyledLoaderText = styled.span`
  font-family: "Lobster", cursive;
  font-size: 40px;
  position: absolute;
  top: 26%;
  left: 46%;
  color: #fff;
  transform: translate(-50%) rotate(-24deg) skewX(-12deg);
`;

const FullScreenLoader = () => {
  return (
    <StyledContainer>
      <StyledLoader>
        <StyledLoaderText>Deckit</StyledLoaderText>
      </StyledLoader>
    </StyledContainer>
  );
};

export default FullScreenLoader;
