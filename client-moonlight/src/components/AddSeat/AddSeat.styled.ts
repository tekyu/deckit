import styled from 'styled-components';
import { mediaQuery } from 'theme/mediaQueries';

export const AddSeat = styled.div`
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  color: ${({ theme: { palette } }) => palette.colors.primary};
  font-family: ${({ theme: { typography } }) => typography.primary};
  transition: background 0.2s ease-in-out;
  padding: 10px 0;
  width: 100%;
  border-radius: 6px;
  justify-content: center;
  cursor: pointer;
  ${mediaQuery.greaterThan('waitingScreen')`
    cursor: default;
    flex-direction: column;
    justify-content: initial;
    margin: 10px 20px;
    width: auto;
    padding: 0;
    border-radius: 0;
    color: ${({ theme: { palette } }) => palette.colors.primary};
    background: initial;
  `};
`;

export const Bubble = styled.div`
  cursor: pointer;
  display: inline-flex;
  border-radius: 50%;
  font-size: 1.6rem;
  padding: 0 10px;
  transition: color 0.2s ease-in-out;
  color: ${({ theme: { palette } }) => palette.colors.primary};
  
  
  ${mediaQuery.greaterThan<{ ready: boolean }>('waitingScreen')`
    font-size: 2.8rem;  
    padding: 0px;
    position: relative;
    padding: 10px;
    color: ${({ theme: { palette } }) => palette.colors.secondary};
    &:hover {
      color: ${({ theme: { palette } }) => palette.primary.main};
    }
  `};
`;

export const Label = styled.div`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  margin-right: 10px;
  ${mediaQuery.greaterThan('waitingScreen')`
    width: auto;
    margin-top: 10px;
    margin-right: 0px;
    display: none;
  `};

`;
