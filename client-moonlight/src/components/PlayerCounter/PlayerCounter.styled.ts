import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const PlayerCounter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme: { typography } }) => typography.secondary};
  font-size: 14px;
  min-width: 40px;
  font-size: 26px;
  ${mediaQuery.greaterThan('waitingScreen')`
    order: 2;
  `};
`;

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  order: 2;
`;

export const Current = styled.div`
`;

export const Separator = styled.div`
  font-size: 0.8em;
  margin: -2px 4px 0 4px;
`;

export const Max = styled.div``;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  margin-left: 0;
  margin-top: 0;
  order: 1;
`;
