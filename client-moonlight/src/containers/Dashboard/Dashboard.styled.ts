import { Button } from 'components/Button/Button.styled';
import { TextInput } from 'components/TextInput/TextInput.styled';
import styled from 'styled-components';
import { rgba } from 'polished';
import { mediaQuery } from 'theme/mediaQueries';

export const Dashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Controls = styled.div`
  margin-top: 80px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${Button} {
    padding: 16px 32px;
    font-size: 20px;
    ${({ theme: { palette } }) => `
      box-shadow: 0px 0px 20px 0px ${rgba(palette.primary.main, 0.5)}
    `}
  }
  
`;

export const RoomIdInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  ${Button} {
    padding: 12px 24px;
    font-size: 14px;
    box-shadow: none;
    margin-top: 12px;
    justify-content: center;
    ${mediaQuery.greaterThan('small')`
      padding: 6px 24px;
      margin-left: 6px;
      margin-top: 0;
    `};
  }

  ${mediaQuery.greaterThan('small')`
    flex-direction: row;
  `};

   ${TextInput} {
     input {
       padding: 16px 32px;
       font-size: 20px;
     }
     
    ${({ theme: { palette } }) => `
      box-shadow: 0px 0px 40px -10px ${rgba(palette.primary.light, 0.3)}
    `}

   }
`;

export const Separator = styled.div`
  margin: 18px 0;
  font-size: 18px;
`;
