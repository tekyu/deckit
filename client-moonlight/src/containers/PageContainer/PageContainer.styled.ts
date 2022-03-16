import styled from 'styled-components';

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.palette.backgrounds.primary};
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
