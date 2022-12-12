import { rgba } from 'polished';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(NavLink) <{ $hamburger: boolean }>`
  font-family: ${({ theme: { typography } }) => typography.primary};
  position: relative;
  display: inline-flex;
  color: ${({ theme: { palette } }) => palette.colors.primary};
  font-weight: 400;
  align-items: center;
  padding: 6px 12px;
  &:hover {
    color: ${({ theme: { palette }, $hamburger }) => ($hamburger ? palette.colors.primary : palette.primary.main)};
  }

  ${({ theme: { palette }, $hamburger }) => $hamburger && `
    padding: 14px 12px;
    margin: 10px 0;
    color: ${palette.primary.contrastText};
  `}

  ${({ theme: { palette }, activeClassName, $hamburger }) => `
    &.${activeClassName} {
      color: ${$hamburger ? palette.primary.main : palette.primary.dark};
      background: ${$hamburger ? palette.backgrounds.primary : 'transparent'};
      border-radius: 6px;
    }
  `}


`;

export const ComingSoon = styled.div<{ hamburger: boolean }>`
  font-family: ${({ theme: { typography } }) => typography.primary};
  position: relative;
  display: inline-flex;
  font-weight: 400;
  align-items: center;
  padding: 6px 12px;
  color: ${({ theme: { palette }, hamburger }) => rgba(hamburger ? palette.backgrounds.primary : palette.colors.primary, 0.6)};
  /* user-select: none; */

  &:after {
    content: "Coming soon";
    font-size: 0.6em;
    position: absolute;
    right: 10px;
    bottom: ${({ hamburger }) => (hamburger ? 'initial' : '-4px')};
    color: ${({ theme: { palette }, hamburger }) => (hamburger ? rgba(palette.backgrounds.primary, 0.6) : palette.primary.main)};
  }

  ${({ hamburger }) => hamburger && `
    margin: 10px 0;
  `}
`;
