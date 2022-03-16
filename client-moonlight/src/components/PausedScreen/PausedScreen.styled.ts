import { rgba } from 'polished';
import styled from 'styled-components';

export const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  ${({ theme: { palette } }) => `
      background: ${rgba(palette.backgrounds.primary, 0.87)}
  `}
`;

export const PausedScreen = styled.div`
  font-family: ${({ theme: { typography } }) => typography.primary};
  margin-top: 60px;
  padding: 20px 40px;
  background: ${({ theme: { palette } }) => palette.primary.light};
  color: ${({ theme: { palette } }) => palette.primary.contrastText};
`;

export const Header = styled.div`
  text-transform: uppercase;
  font-size: 2em;
  text-align: center;
`;

// export const
export const DisconnectedPlayersHeader = styled.div`
  margin-top: 30px;
  text-align: center;
`;

export const DisconnectedPlayers = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const DisconnectedPlayer = styled.div`
  text-align: center;
  padding: 2px;
  margin: 4px 0;
`;

export const Controls = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export const Message = styled.div`
  font-size: 0.8em;
  margin-top: 10px;
`;
