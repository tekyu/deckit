import { Button } from 'components/Button/Button.styled';
import { rgba } from 'polished';
import styled from 'styled-components';

export const ReadyButton = styled(Button) <{ isReady: boolean }>`
  padding: 6px 10px;
  font-size: 11px;
  text-transform: initial;
  /* ${({ theme: { palette } }) => `
    box-shadow: 0px 0px 20px 0px ${rgba(palette.primary.main, 0.5)}
  `}; */
  ${({ isReady, theme: { palette } }) => isReady && `
    background: ${palette.primary.dark}
  `};
`;
