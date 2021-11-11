import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const RoomMode = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 60px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const Mode = styled.div`
  margin-top: -1px;
  margin-left: 4px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${({ theme: { typography } }) => typography.secondary};
  ${mediaQuery.greaterThan('waitingScreen')`
    font-size: 14px;
  `};
`;
