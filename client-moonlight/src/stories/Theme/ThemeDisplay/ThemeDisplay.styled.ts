import styled from 'styled-components';

export const ThemeDisplay = styled.div`
display: flex;
align-items: baseline;
justify-content: space-around;

  font-family: ${({ theme }) => theme.typography.primary};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.div`
  display: flex;
`;

export const Header = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;
  `;

export const Description = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  `;

export const PrimaryColorLight = styled.div``;

export const Label = styled.div`
 display:flex;
 align-items: center;
 width: 120px;
`;

export const Grid = styled.div`
 display:flex;
`;

export const Tile = styled.div<{ color: string; variant: string }>`
  height: 50px;
  width: 100px;
  background: ${({ theme, color, variant }) => theme.palette[color][variant]};
  margin: 1px;
  position: relative;
  border: 1px solid rgba(0,0,0,0.05);
`;

export const FTile = styled.div<{ font: string; weight: number; }>`
  height: 50px;
  width: 100px;
  margin: 1px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-family: ${({ theme, font }) => theme.typography[font]};
  font-weight: ${({ weight }) => weight}
`;

export const FTileLabel = styled.div<{ italic: boolean }>`
font-style: ${({ italic }) => (italic ? 'italic' : 'normal')}`;

export const FTileWeight = styled.div`
font-size: 11px;`;

export const Name = styled.div`
  background: rgba(0,0,0,0.4);
    color: #fff;
    font-size: 11px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 14px;
`;

export const HexCode = styled.div`
    background: rgba(0,0,0,0.4);
    color: #fff;
    font-size: 10px;
    text-align: center;
    position: absolute;
    bottom:14px;
    right: 0;
    width: auto;
    display: flex;
    align-items: center;
    height: 16px;
    padding: 0 4px;
`;
