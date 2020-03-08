import React from "react";
import styled, { keyframes } from "styled-components";
import Icon from "../Icon/Icon";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled(Icon)`
  animation: ${rotate} 0.9s linear infinite;
`;

const Loader = () => {
  return <StyledLoader size={20} icon="loading" />;
};

export default Loader;
