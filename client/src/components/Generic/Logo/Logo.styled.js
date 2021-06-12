import styled from "styled-components";
import background from "assets/images/trianglify.svg";

export const Container = styled.div`
  user-select: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${background});
  background-repeat: no-repeat;
  background-size: 500%;
  background-position: 50% 70%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border: 4px solid #fff;
  cursor: default;
  pointer-events: none;
`;

export const Text = styled.span`
  font-family: "Lobster", cursive;
  font-size: 17px;
  position: absolute;
  top: 28%;
  left: 50%;
  color: #fff;
  transform: translate(-50%) rotate(-24deg) skewX(-12deg);
`;
