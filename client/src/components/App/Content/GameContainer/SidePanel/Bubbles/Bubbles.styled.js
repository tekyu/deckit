import styled from "styled-components";

export const Container = styled.div`
  background-color: green;
  display: flex;
`;

export const Bubble = styled.div`
  background: ${props => props.color};
  border-radius: 100%;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-size: 22px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  margin: 0.5em 0 0.5em 0.5em;
  ${props => props.isOpen && `border: 2px solid red;`}
`;
