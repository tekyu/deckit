import { rgba } from 'polished';
import styled from 'styled-components';

export const ComingSoon = styled.div`
  font-family: ${({ theme: { typography } }) => typography.primary};
  position: relative;
  display: inline-flex;
  color: ${({ theme: { palette } }) => rgba(palette.colors.primary, 0.6)};
  user-select: none;
  font-weight: 400;
  &:after {
    content: "Coming soon";
    font-size: 0.6em;
    position: absolute;
    right: 0;
    bottom: -9px;
    color: ${({ theme: { palette } }) => palette.primary.main};
  }
`;
