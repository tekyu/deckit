import { rgba } from 'polished';
import styled from 'styled-components';

export const Icon = styled.div<{ clickable: boolean; color: string }>`
  
  ${({ clickable }) => clickable && `
    cursor: pointer;
  `}
  transition: background 0.15s ease-in;
  color: inherit;
  border-radius: 50%;
  padding: 4px;
  display: inline-flex;
  &:hover {
    ${({ theme, clickable, color }) => clickable && `
      background: ${color ? rgba(theme.palette[color].light, 0.2) : 'inherit'};
  `}
  }
  &:active {
    ${({ theme, clickable, color }) => clickable && `
      background: ${color ? rgba(theme.palette[color].light, 0.2) : 'inherit'};
  `}
  }
`;
