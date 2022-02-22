import { Button } from 'components/Button/Button.styled';
import styled from 'styled-components';

export const ExitRoomPopup = styled.div`
    background: ${({ theme: { palette } }) => palette.backgrounds.primary};
  border: 2px solid ${({ theme: { palette } }) => palette.primary.main};
  color: ${({ theme: { palette } }) => palette.colors.primary};
  font-family: ${({ theme: { typography } }) => typography.primary};
  margin-top: 60px;
`;

export const Header = styled.div`
  padding: 40px 20px;
  background: ${({ theme: { palette } }) => palette.primary.main};
  color: ${({ theme: { palette } }) => palette.primary.contrastText};
  text-align: center;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  ${Button} {
    margin: 0px 4px;
  }
`;
