import styled from "styled-components";
import { rgba } from "polished";

export const Container = styled.div`
  height: 270px;
  width: 230px;
  background: white;
  box-shadow: ${props =>
    `0px 4px 18px -2px ${rgba(props.theme.tempPal_charcoal, 0.2)}`};
  margin: 10px 15px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 60px;
  width: 100%;
  position: relative;
`;

export const Logo = styled.div`
  width: 74px;
  height: 74px;
  position: absolute;
  bottom: -37px;
  left: 50%;
  transform: translateX(-50%);
  cursor: default;
  user-select: none;
  background: transparent;
  border: ${props =>
    `3px solid ${rgba(
      props.theme.tempPal_breeze,
      props.theme.tempPal_dark_low
    )}`};
  border-radius: 50%;
  span {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 34px;
    transform: translate(-50%, -50%);
    background: ${props => props.theme.tempPal_breeze};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Content = styled.div`
  height: 150px;
  width: 100%;
  padding: 60px 20px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.label`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: ${props => props.theme.tempPal_dark_high};
`;

export const Owner = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  opacity: ${props => props.theme.tempPal_dark_low};
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 10px;
`;

export const Details = styled.div`
  width: 100%;
  padding: 30px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const Players = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  span:first-of-type {
    display: flex;
    align-items: center;
    &:after {
      content: "/";
      font-size: 10px;
      padding: 0 2px;
    }
  }
`;

export const Mode = styled.div`
  opacity: ${props => props.theme.tempPal_dark_low};
`;

export const Footer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
