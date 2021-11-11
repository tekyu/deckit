import styled from 'styled-components';

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.palette.backgrounds.primary};
  min-height: 100vh;

`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
