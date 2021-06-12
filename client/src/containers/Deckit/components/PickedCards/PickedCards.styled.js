import styled from "styled-components";

export const Container = styled.div`
position: relative;
width: 100%;
height: 400px;
transition: height 0.4s ease-in-out;
margin-top: auto;
overflow: hidden;
`;

export const Hand = styled.div`
padding: 0 40px;
display: flex;
justify-content: center;
`;

export const CardContainer = styled.div`
transition: all 0.3s ease-in-out;
&:not(:first-of-type) {
  margin-left: -160px;
}
&:hover {
  padding-left: 16px;
  padding-right: 16px;
  &:not(:first-of-type) {
    margin-left: 0;
  }
}
&:hover + div {
  &:not(:first-of-type) {
    margin-left: 0;
  }
}
`;
