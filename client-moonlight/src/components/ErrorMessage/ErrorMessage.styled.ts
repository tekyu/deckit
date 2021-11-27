import styled from 'styled-components';

export const ErrorMessage = styled.div`
  color: ${({ theme: { palette } }) => palette.error.main};
  font-family: ${({ theme: { typography } }) => typography.primary};
  font-style: italic;
  font-size: 0.9em;
  margin-top: 4px;
`;
