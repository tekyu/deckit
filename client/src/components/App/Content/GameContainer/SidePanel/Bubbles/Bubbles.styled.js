import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid lightGrey;
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
  ${props => props.isOpen && `border: 3px solid crimson;`}
`;
