import { rgba } from 'polished';
import styled from 'styled-components';

export const AccountBox = styled.div`
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Display = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  cursor: pointer;
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 1.4rem;
`;

export const Label = styled.div`
  color: ${({ theme: { palette } }) => palette.colors.primary};
  font-size: 12px;
  margin-bottom: 4px;
`;

export const Name = styled.div`
  color: ${({ theme: { palette } }) => palette.primary.main};
`;

export const Dropdown = styled.div`
  opacity: 0;
  top: 50%;
  /* top: 100%; */
  right: 0;
  width: auto;
  min-width: 100%;
  position: absolute;
  display: flex;
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

  &.accountBoxDropdown-enter {
    opacity: 0;
  }
  &.accountBoxDropdown-enter-active {
    opacity: 1;
    top: 100%;
  }
  &.accountBoxDropdown-enter-done {
    opacity: 1;
    top: 100%;
  }
  &.accountBoxDropdown-exit {
    opacity: 1;
  }
  &.accountBoxDropdown-exit-active {
    opacity: 0;
    top: 70%;
    transition: opacity 0.2s ease-in-out, top 0.3s ease-in-out;
  }
  &.accountBoxDropdown-exit-done {
    opacity: 0;
    top: 50%;
  }
  
`;

export const Item = styled.div`
  padding: 14px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.primary};
  font-weight: 400;
  font-size: 16 px;
  color: ${({ theme }) => theme.palette.colors.primary};
  transition: all 0.2s ease-in;
  white-space: nowrap;
  &:hover {
    background: ${({ theme }) => rgba(theme.palette.primary.light, 0.1)};
  }
`;

export const NameChangeContainer = styled.form`
  display: flex;
`;
