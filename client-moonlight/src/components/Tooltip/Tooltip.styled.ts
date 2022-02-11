import styled from 'styled-components';

export const Tooltip = styled.div`
  .moonlight-tooltip-override {
    background: ${({ theme: { palette } }) => palette.primary.light} !important;
    color: ${({ theme: { palette } }) => palette.primary.contrastText} !important;
    font-family: ${({ theme: { typography } }) => typography.primary} !important;
    visibility: visible !important;
    &.place-top {
      &:after {
      border-top-color: ${({ theme: { palette } }) => palette.primary.light} !important;
      border-top-style: solid !important;
      border-top-width: 6px !important;
      }
    }
    &.place-bottom {
      &:after {
      border-bottom-color: ${({ theme: { palette } }) => palette.primary.light} !important;
      border-bottom-style: solid !important;
      border-bottom-width: 6px !important;
      }
    }
    &.place-left {
      &:after {
      border-left-color: ${({ theme: { palette } }) => palette.primary.light} !important;
      border-left-style: solid !important;
      border-left-width: 6px !important;
      }
    }
    &.place-right {
      &:after {
      border-right-color: ${({ theme: { palette } }) => palette.primary.light} !important;
      border-right-style: solid !important;
      border-right-width: 6px !important;
      }
    }
  }
`;
