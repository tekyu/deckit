import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  & > div {
    /* display: inline-block; */
    height: 4em;
    label {
      display: inline-block;
      min-width: 140px;
    }
  }
`;
