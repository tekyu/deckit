import { Icon } from 'components/Icon/Icon.styled';
import styled from 'styled-components';

export const Increment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${Icon} {
    color: ${({ theme: { palette } }) => palette.colors.primary};
  }
`;

export const Display = styled.div`
  margin: 0 4px;
  background: ${({ theme: { palette } }) => palette.backgrounds.primary};
  font-family: ${({ theme: { typography } }) => typography.primary};
  color: ${({ theme: { palette } }) => palette.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  min-width: 60px;
  min-height: 55px;
  user-select: none;
`;
