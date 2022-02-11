import { TextInput } from 'components/TextInput/TextInput.styled';
import { Form } from 'formik';
import { rgba } from 'polished';
import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const HintInput = styled.div`
  ${({ theme: { palette } }) => `
    background: ${rgba(palette.primary.light, 1)};
  `}

  display: flex;
  width: 300px;
  height: 200px;
  padding: 20px;
  z-index: 10;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  ${mediaQuery.greaterThan('small')`
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  `};

  &:before {
    content: "";
    position: fixed;
    top:0; left:0; bottom:0; right:0;
    background: green;
    z-index: -1;
    ${({ theme: { palette } }) => `
      background: ${rgba(palette.backgrounds.primary, 0.6)};
    `}
  }
`;

export const Label = styled.label`
  font-family: ${({ theme: { typography } }) => typography.primary};
  color: ${({ theme: { palette } }) => palette.primary.main};
  font-size: 1.4em;
`;

export const HintForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${TextInput} {
    margin: 20px 0;
    width: 100%;
    border: 2px solid ${({ theme: { palette } }) => palette.primary.main};
  }
`;
