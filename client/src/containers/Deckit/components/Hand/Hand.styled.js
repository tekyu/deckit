import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: block;
  height: 60px;
  transition: height 0.4s ease-in-out;
  @media (min-width: 600px) {
    height: 400px;
  }
  &:hover {
    height: 400px;
  }
`;

export const Hand = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;

export const CardContainer = styled.div`
  transition: all 0.3s ease-in-out;
  &:not(:first-of-type) {
    margin-left: -50px;
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
