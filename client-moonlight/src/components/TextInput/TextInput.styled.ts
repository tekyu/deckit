import { Field } from 'formik';
import styled from 'styled-components';

export const TextInput = styled.div<{ showBorder: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ theme: { palette }, showBorder }) => showBorder && `
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-image: linear-gradient( 
        135deg, 
        ${palette.primary.dark} 0%, 
        ${palette.primary.main} 18%, 
        ${palette.primary.light} 67%, 
        ${palette.secondary.light} 100% 
      );
    }
  `}
`;

export const Input = styled(Field) <{ $alignCenter?: boolean }>`
  border: 0;
  padding: 12px 18px;
  font-family: ${({ theme: { typography } }) => typography.primary};
  color: ${({ theme: { palette } }) => palette.colors.primary};
  background: ${({ theme: { palette } }) => palette.backgrounds.primary};
  ${({ $alignCenter }) => $alignCenter && `
    text-align: center;
  `}
  &:focus {
    outline: 2px solid ${({ theme: { palette } }) => palette.primary.main};
  }
`;
