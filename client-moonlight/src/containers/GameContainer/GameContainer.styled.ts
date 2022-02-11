import { rgba } from 'polished';
import styled from 'styled-components';

export const GameContainer = styled.div<{ showHintInput: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: stretch;
  position: relative;
  overflow: hidden;
  &:after {
    ${({ showHintInput, theme: { palette } }) => showHintInput && `
      content: "";
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: fixed;
      z-index: 9;
      background: ${rgba(palette.backgrounds.primary, 0.6)};
    `}
  }
`;

export const Main = styled.div`
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  height: 100%;
  position: relative;
`;

export const BoardPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: auto;
`;
export const SidebarPlaceholder = styled.div``;
