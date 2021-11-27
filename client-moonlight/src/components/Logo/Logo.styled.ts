import styled from 'styled-components';
import background from 'assets/images/trianglify.svg';

export const Logo = styled.div`
  user-select: none;
  transition: all 0.2s ease-in;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${background});
  background-repeat: no-repeat;
  background-size: 500%;
  background-position: 50% 70%;
  position: relative;
  overflow: hidden;
  cursor: default;
  pointer-events: none;
  font-size: 1rem;
`;

export const Text = styled.span`
  font-family: "Lobster", cursive;
  position: absolute;
  top: 48%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%) rotate(-24deg) skewX(-12deg);
`;
