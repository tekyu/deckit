import themes from 'assets/themes';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 20px;
  font-size: 16px;
  text-align: center;
  color: ${themes.default.fontSecondary};
  background-color: ${themes.default.error.main};
`;
