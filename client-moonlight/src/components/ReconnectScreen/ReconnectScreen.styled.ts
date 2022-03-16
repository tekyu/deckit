import { Button } from 'components/Button/Button.styled';
import styled from 'styled-components';

export const ReconnectScreen = styled.div`
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

export const Id = styled.div`
  font-size: 1.4em;
  margin-top 20px;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  ${Button} {
    margin: 0px 4px;
  }
`;

export const Message = styled.div`
  text-align: center;
  margin-top: 20px;
`;
