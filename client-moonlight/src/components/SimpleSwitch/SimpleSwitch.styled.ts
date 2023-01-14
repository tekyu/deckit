import styled from 'styled-components';

export const SimpleSwitch = styled.div`
  display: inline-flex;
  flex-direction: column;

  .react-switch-bg {
    background: none !important;
    ${({ theme: { palette } }) => `
    background-image: linear-gradient( 
        90deg, 
        ${palette.primary.light} 13%, 
        ${palette.secondary.light} 76% 
      ) !important;
    `}
  }
`;
