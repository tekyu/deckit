import styled, { keyframes } from 'styled-components';
import Icon from "../Icon/Icon";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled(Icon)`
  animation: ${rotate} 0.9s linear infinite;
`;
