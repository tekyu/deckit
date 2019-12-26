import styled, { css } from "styled-components";
import { rgba } from "polished";

export const Backdrop = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${rgba(`black`, 0.8)};
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

export const Container = styled.div`
  background-color: ${props => props.theme.background};
  display: flex;
  flex-direction: column;
  min-height: 600px;
  padding: 3em 1em 1em 1em;
  position: relative;
  width: 500px;
`;

export const Icon = styled.div`
  align-self: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: ${props =>
    `0px 2px 10px 0px ${rgba(props.theme.tempPal_sandstone, 0.24)}`};
  background: linear-gradient(
    45deg,
    ${props => props.theme.tempPal_sandstone} 0%,
    ${props => props.theme.tempPal_burnt_orange} 100%
  );
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8em;
  p {
    color: ${rgba(`black`, 0.5)};
  }
`;

export const ExitButton = css`
  background-color: red;
  color: white;
  font-size: 1.2em;
  position: absolute;
  right: 0;
  top: 0;
`;
