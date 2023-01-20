import { Button } from 'components/Button/Button.styled';
import { rgba } from 'polished';
import styled from 'styled-components';

export const Card = styled.div<{ url: string; }>`
  min-width: 200px;
  width: 200px;
  height: 296px;
  border: 2px solid rgba(0,0,0, 0.2);
  ${({ url }) => url && `background-image: url(${url}); background-size: cover;`}
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  position: relative;
  &:hover, &:active {
    ${({ theme }) => `
      border: 2px solid ${rgba(theme.palette.primary.light, 1)};
    `}
    ${Button} {
      margin-top: 10px;
      display: flex;
    }
  }

  ${Button} {
    display: none;
  }
`;
