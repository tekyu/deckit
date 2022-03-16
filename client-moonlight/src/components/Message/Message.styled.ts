import { rgba } from 'polished';
import styled from 'styled-components';

export const Message = styled.div<{ special?: boolean }>`
  margin: 4px;
  box-sizing:border-box;
  padding: 8px 24px;
  color: ${({ theme: { palette } }) => palette.primary.light};
  background: transparent;
  font-family: ${({ theme: { typography } }) => typography.primary};
  font-size: 0.9em;
  text-align: center;
  border-radius: 4px;
  ${({ special, theme: { palette } }) => special && `
    background: ${palette.primary.light};
    color: ${palette.primary.contrastText};
    font-size: 1.4em;
    background-image: linear-gradient(
    130deg,
    ${palette.primary.light} 8%,
    ${palette.primary.main} 34%,
    ${palette.secondary.dark} 146% 
    );
    box-shadow: 0px 0px 20px 0px ${rgba(palette.primary.main, 0.5)};
  `}
`;
