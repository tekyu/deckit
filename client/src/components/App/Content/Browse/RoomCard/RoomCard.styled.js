import styled from "styled-components";
import { rgba } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 270px;
  width: 230px;
  box-shadow: ${props =>
    `0px 4px 18px -2px ${rgba(props.theme.tempPal_charcoal, 0.2)}`};
  margin: 0.6em 1em;
  padding: 1em;
`;

export const Logo = styled.div`
  background: ${props => props.theme.tempPal_breeze};
  background-clip: content-box;
  border: ${props =>
    `3px solid ${rgba(
      props.theme.tempPal_breeze,
      props.theme.tempPal_dark_low
    )}`};
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  height: 74px;
  width: 74px;
  line-height: 74px;
  padding: 0.1em;
  user-select: none;
`;

export const Name = styled.label`
  font-weight: 500;
  margin-top: 1.2em;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${props => props.theme.tempPal_dark_high};
`;

export const Owner = styled.p`
  font-size: 0.9em;
  margin-top: 0.8em;
  opacity: ${props => props.theme.tempPal_dark_low};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Content = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8em;
  width: 100%;
`;

export const Players = styled.div`
  font-size: 0.8em;
`;

export const Mode = styled.div`
  opacity: ${props => props.theme.tempPal_dark_low};
`;
