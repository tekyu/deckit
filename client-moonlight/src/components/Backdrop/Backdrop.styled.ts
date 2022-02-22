import { rgba } from 'polished';
import styled from 'styled-components';

export const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  ${({ theme: { palette } }) => `
    background: ${rgba(palette.backgrounds.primary, 0.87)}
  `}
`;
