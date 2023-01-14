import styled from 'styled-components';

export const Label = styled.label`
  display: inline-flex;
  font-family: ${({ theme: { typography } }) => typography.primary};
  font-size: 14px;
  color: ${({ theme: { palette } }) => palette.colors.primary};
  margin-bottom: 8px;
  user-select: none;
`;
