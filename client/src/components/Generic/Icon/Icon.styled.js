import styled from 'styled-components';

export const Icon = styled.img`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  min-width: ${({ size }) => `${size}px`};
  min-height: ${({ size }) => `${size}px`};
`;
