import { rgba } from 'polished';
import styled from 'styled-components';

export const LanguageSwitch = styled.div`
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

export const Display = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dropdown = styled.div`
  opacity: 0;
  top: 50%;
  right: 0;
  width: auto;
  min-width: 100%;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.backgrounds.secondary};
  box-shadow: 0px 4px 12px -5px rgba(8, 73, 146, 0.18);
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-left: 1px solid ${({ theme }) => rgba(theme.palette.primary.light, 0.1)};
  border-bottom: 1px solid ${({ theme }) => rgba(theme.palette.primary.light, 0.1)};
  border-right: 1px solid ${({ theme }) => rgba(theme.palette.primary.light, 0.1)};
  transition: opacity 0.2s ease-in-out, top 0.2s ease-in-out;
  display: none;

&.languageSwitch-enter {
    opacity: 0;
    display: flex;
  }
  &.languageSwitch-enter-active {
    opacity: 1;
    top: 100%;
  }
  &.languageSwitch-enter-done {
    opacity: 1;
    top: 100%;
    display: flex;
  }
  &.languageSwitch-exit {
    opacity: 1;
    display: flex;
  }
  &.languageSwitch-exit-active {
    opacity: 0;
    top: 70%;
    transition: opacity 0.2s ease-in-out, top 0.3s ease-in-out;
  }
  &.languageSwitch-exit-done {
    opacity: 0;
    top: 50%;
    display: none;
  }
  
`;
