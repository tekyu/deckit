import styled from 'styled-components';

export const SliderWithTooltip = styled.div<{ palette: string }>`
  .rc-slider {
    margin-top: 36px;
    height: 16px;
    display: flex;
    align-items: center;
  }
  .rc-slider-tooltip-inner {
    background: ${({ theme, palette }) => theme.palette[palette].main};
    color: ${({ theme, palette }) => theme.palette[palette].contrastText};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${({ theme: { typography } }) => typography.primary}
  }
  .rc-slider-tooltip-arrow {
    border-top-color: ${({ theme, palette }) => theme.palette[palette].main} !important;
  }

  .rc-slider-handle {
    &:active {
      box-shadow: 0 0 5px ${({ theme, palette }) => theme.palette[palette].main};
    }
  }
`;
