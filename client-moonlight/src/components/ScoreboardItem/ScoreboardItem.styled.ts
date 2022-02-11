import { rgba } from 'polished';
import styled from 'styled-components';

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

export const ScoreboardItem = styled.div`

  color: ${({ theme: { palette } }) => palette.colors.primary};
  display: flex;
  align-items: center;
  margin: 1px 0;
  padding: 15px 10px;
  position: relative;
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
