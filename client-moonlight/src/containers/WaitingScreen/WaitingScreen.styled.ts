import { Label as BaseLabel } from 'components/Label/Label.styled';
import { Panel } from 'components/Panel/Panel.styled';
import { PlayerCounter } from 'components/PlayerCounter/PlayerCounter.styled';
import { TextInput } from 'components/TextInput/TextInput.styled';
import { rgba } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const WaitingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
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
  ${PlayerCounter} {
    margin: 10px 0;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Name = styled.div`
  color: ${({ theme: { palette } }) => palette.primary.main};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 2rem;
  padding: 0 10px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled(BaseLabel)`
  margin-top: 6px;
  color: ${({ theme: { palette } }) => palette.colors.secondary};
  text-align: center;
  font-family: ${({ theme: { typography } }) => typography.primary};
  font-size: 14px;
`;

export const RoomIdDisplay = styled.div`
  margin: 20px 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const IdDescription = styled.div`
  font-family: ${({ theme: { typography } }) => typography.primary};
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 15px;
  text-align: center;
`;

export const PlayerList = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 12px;
grid-row-gap: 12px;
`;

export const GoBack = styled(Link)`
  color: ${({ theme: { palette } }) => palette.primary.main};
  align-self: flex-end;
  font-size: 24px;
  margin-right: 8px;
`;

export const Settings = styled.div`
  margin-top: 20px;
  width: 100%;
  /* width: 818px; */
  text-align: center;
  > ${Label} {
    margin-bottom: 2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  ${TextInput} {
    width: 360px;
    margin-right: 10px;
  }
`;
