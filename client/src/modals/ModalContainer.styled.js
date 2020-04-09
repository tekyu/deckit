import styled, { css } from "styled-components";
import { rgba } from "polished";

export const Backdrop = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255,255,255, 0.7);
  /* background: ${rgba(`black`, 0.8)}; */
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
`;

export const Container = styled.div`
  background: #ffffff;
  box-shadow: -5px 5px 100px rgba(207, 119, 243, 0.3),
    0px 5px 100px rgba(0, 155, 255, 0.3),
    -15px 5px 100px rgba(42, 201, 219, 0.3);
  display: flex;
  flex-direction: column;
  width: 500px;
  border-radius: 6px;
  overflow: hidden;
`;

export const ExitButton = css`
  align-self: flex-end;
  background-color: red;
  color: cyan;
`;
