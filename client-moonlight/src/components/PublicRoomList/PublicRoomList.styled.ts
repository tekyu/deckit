import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const PublicRoomList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Header = styled.div`
  font-size: 1.4em;
  color: ${({ theme: { palette } }) => palette.colors.secondary};
  text-align: center;
  p {
    margin: 6px 0;
  }
`;

export const List = styled.div`
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr;
  ${mediaQuery.greaterThan('waitingScreen')`
    grid-template-columns: 1fr 1fr;
  `};
  ${mediaQuery.greaterThan('large')`
    grid-template-columns: 1fr 1fr 1fr;
  `};
  
`;
