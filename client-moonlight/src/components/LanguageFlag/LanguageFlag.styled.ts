import styled from 'styled-components';

export const Icon = styled.span`
  font-size: 20px;
  position: absolute;
`;

export const LanguageFlag = styled.div`
  white-space: nowrap;
  position: relative;
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme: { palette } }) => palette.primary.main};
  border-radius: 50%;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
`;
