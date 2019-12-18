import styled, { css } from "styled-components";
import { rgba } from "polished";

export const $Backdrop = styled.div`
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

export const $Container = styled.div`
  background-color: ${props => props.theme.background};
  display: flex;
  flex-direction: column;
  min-height: 600px;
  width: 500px;
`;

export const $exitButtonStyle = css`
  align-self: flex-end;
  background-color: red;
  color: white;
  font-size: 1.4em;
`;
