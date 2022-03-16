import { rgba } from 'polished';
import styled, { keyframes } from 'styled-components';

interface IPosition {
  [key: number]: string;
}

const positionColorMap: IPosition = {
  1: '#FFD700',
  2: '#C0C0C0',
  3: '#CD7F32',
};

const positionScoreFontSize: IPosition = {
  1: '2em',
  2: '1.8em',
  3: '1.6em',
};

const positionNameFontSize: IPosition = {
  1: '1.6em',
  2: '1.4em',
  3: '1.2em',
};

const offlineBeat = keyframes`
  100% {
    opacity: 0.2;
  }
  
  40% {
    opacity: 1;
  }
`;

export const DisconnectedIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const DisconnectedIconContainer = styled.div`
  animation: ${offlineBeat} .6s infinite alternate;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScoreboardItem = styled.div<{ disabled: boolean }>`

  color: ${({ theme: { palette } }) => palette.colors.primary};
  display: flex;
  align-items: center;
  margin: 1px 0;
  padding: 15px 10px;
  position: relative;
  ${({ disabled, theme: { palette } }) => disabled && `
   &:after {
     content: "";
     top:0; left: 0; bottom: 0; right: 0;
     position: absolute;
     background: ${rgba(palette.colors.secondary, 0.1)};
   }
   > * {
     opacity: 0.5;
   }
   ${DisconnectedIcon} {
    opacity: 1;
  }
  `}
  &:not(:last-of-type) {
  ${({ theme: { palette } }) => `
    border-bottom: 1px solid ${rgba(palette.colors.secondary, 0.2)};
  `}
  }
`;

export const Score = styled.div<{ position: number; isHinter: boolean; picked: boolean }>`
  font-size: ${({ position }) => (positionScoreFontSize[position] ? positionScoreFontSize[position] : '1.4em')};
  margin-right: 10px;
  min-width: 38px;
  max-width: 38px;
  width: 38px;
  text-align: center;
  color: ${({ position }) => (positionColorMap[position] ? positionColorMap[position] : 'inherit')};
  padding-left: ${({ isHinter, picked }) => (isHinter || picked ? '0px' : '26px')};
  `;

export const Info = styled.div`
  overflow: hidden;
  `;

export const Name = styled.div<{ position: number; picked: boolean }>`
  /* ${({ picked, theme: { palette } }) => picked && `
    color: ${palette.success.main};
  `} */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ position }) => (positionNameFontSize[position] ? positionNameFontSize[position] : '1em')};
`;

export const Owner = styled.div`
  position: absolute;
  top: 4px;
  right: 10px;
  font-size: 0.7em;
  opacity: 0.87;
  user-select: none;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typography.primary};
  color: ${({ theme }) => theme.palette.primary.light};
`;

export const StateIcon = styled.div<{ picked: boolean }>`
  display: flex;
  aling-items: center;
  font-size: 1.9em;
  ${({ picked, theme: { palette } }) => picked && `
    color: ${palette.success.main};
  `}
`;
