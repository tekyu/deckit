import { Panel } from 'components/Panel/Panel.styled';
import { rgba } from 'polished';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const WaitingScreen = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0;
  ${Panel} {
    width: 100%;
    ${mediaQuery.greaterThan('waitingScreen')`
      width: 650px;
    `};
    ${({ theme: { palette } }) => `
      box-shadow: -7px 7px 40px ${rgba(palette.primary.light, 0.1)},
        10px 10px 40px ${rgba(palette.primary.main, 0.1)},
        7px -7px 40px ${rgba(palette.secondary.dark, 0.1)};
    `}
}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.div`
  color: ${({ theme: { palette } }) => palette.primary.main};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 10px;
`;

export const Label = styled.div`
  margin-top: 6px;
  color: ${({ theme: { palette } }) => palette.colors.secondary};
  text-align: center;
  font-family: ${({ theme: { typography } }) => typography.primary};
  font-size: 12px;
  text-transform: uppercase;
`;

export const RoomIdDisplay = styled.div`
  margin: 50px 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IdDescription = styled.div`
  font-family: ${({ theme: { typography } }) => typography.primary};
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;

export const PlayerList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;