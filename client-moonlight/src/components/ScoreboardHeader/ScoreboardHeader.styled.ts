import { rgba } from 'polished';
import styled from 'styled-components';

export const ScoreboardHeader = styled.div`
  padding: 15px 10px;
  position: sticky;
  top: 0;
  background: ${({ theme: { palette } }) => palette.primary.light};
  color: ${({ theme: { palette } }) => palette.primary.contrastText};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.typography.primary};
  border-bottom: 1px solid ${({ theme }) => theme.palette.colors.secondary};
  ${({ theme: { palette } }) => `
    border-bottom: 1px solid ${rgba(palette.primary.light, 0.4)};
  `}
`;

export const InfoContainer = styled.div`
  min-width: 60px;
  display: flex;
  align-items: center;
  font-size: 2em;
  &.round {
    font-size: 1.7em;
  }
  &.maxScore {
    font-size: 1.6em;
  }
  &:nth-of-type(2) {
    justify-content: center;
  }
  &:last-of-type {
    justify-content: flex-end;
  }
`;

export const Text = styled.p`
  margin: 0;
  font-size: 1.2rem;
  margin-right: 6px;
`;
