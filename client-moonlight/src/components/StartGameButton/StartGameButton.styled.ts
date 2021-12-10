import { Button } from 'components/Button/Button.styled';
import { rgba } from 'polished';
import styled from 'styled-components';

export const StartGameButton = styled(Button)`
  padding: 16px 32px;
    font-size: 20px;
    ${({ theme: { palette } }) => `
      box-shadow: 0px 0px 20px 0px ${rgba(palette.primary.main, 0.5)}
    `}
`;
