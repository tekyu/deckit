import styled from 'styled-components';

export const LanguageSwitchItem = styled.div`
  white-space: nowrap;
  padding: 12px 18px;
  font-size: 0.9em;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: ${({ theme: { palette } }) => palette.primary.main};
  }
`;

export const Name = styled.span`
  margin-left: 12px;
`;
