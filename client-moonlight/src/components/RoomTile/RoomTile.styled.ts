import { PlayerCounter } from 'components/PlayerCounter/PlayerCounter.styled';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const RoomTile = styled.div`
  /* background: ${({ theme: { palette } }) => palette.primary.main};   */
  font-family: ${({ theme: { typography } }) => typography.primary};
  border: 1px solid ${({ theme: { palette } }) => palette.primary.main};
  border-radius: 4px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
  padding: 10px;
  box-shadow: 0px 4px 12px -5px rgba(8, 73, 146, 0.18);
  color: ${({ theme: { palette } }) => palette.colors.primary};
  ${PlayerCounter} {
    font-size: 1em;
    margin: 0;
    flex-direction: row;
  }
  ${mediaQuery.greaterThan('waitingScreen')`
    width: 220px;
  `};
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.3em;
`;

export const Id = styled.div`
  color: ${({ theme: { palette } }) => palette.colors.primary};
  font-size: 0.8em;
  span {
    display: block;
  }
`;

export const PlayerInfo = styled.div`
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Owner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  color: ${({ theme: { palette } }) => palette.colors.primary};
  font-size: 0.7em;
  span {
    color: ${({ theme: { palette } }) => palette.colors.primary};
    display: block;
  }
`;
