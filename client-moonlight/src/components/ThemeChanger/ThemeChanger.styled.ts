import styled from 'styled-components';

export const ThemeChanger = styled.div<{ size: number }>`
  display: flex;
  button {
    width: ${({ size }) => `${size + 1}px`}
  }
`;
