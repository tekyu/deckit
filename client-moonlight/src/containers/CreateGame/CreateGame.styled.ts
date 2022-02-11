import Button from 'components/Button/Button';
import { Label } from 'components/Label/Label.styled';
import { Panel } from 'components/Panel/Panel.styled';
import { rgba } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const CreateGame = styled.div` 
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0;
  ${Panel} {
    width: 500px;
    max-width: 500px;
    align-self: flex-start;
    ${({ theme: { palette } }) => `
      box-shadow: -7px 7px 40px ${rgba(palette.primary.light, 0.1)},
        10px 10px 40px ${rgba(palette.primary.main, 0.1)},
        7px -7px 40px ${rgba(palette.secondary.dark, 0.1)};  
    `}
}
`;

export const Header = styled.div`
  font-size: 28px;
  text-align: center;
  margin: 10px 0 30px 0;
  transition: margin 0.2s ease-in-out;
  ${mediaQuery.greaterThan('medium')`
    margin-bottom: 50px;
  `};
`;

export const Form = styled.form`
  padding: 10px 20px 20px 20px;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0 24px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  padding: 18px 68px;
  font-size: 16px;
  ${({ theme: { palette } }) => `
    background-image: linear-gradient(
    130deg,
    ${palette.primary.light} 8%,
    ${palette.primary.main} 34%,
    ${palette.secondary.dark} 146% 
    );
  `}
`;

export const GoBack = styled(Link)`
  color: ${({ theme: { palette } }) => palette.primary.main};
  align-self: flex-end;
  font-size: 24px;
`;

export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  ${Label} {
    margin-bottom: 0;
  }
`;

export const GenerateRandomName = styled(Button)`
  padding: 0;
  font-size: 11px;
`;
