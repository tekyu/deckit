import styled from "styled-components";

export const Container = styled.div`
  width: 270px;
  height: 400px;
  border: 2px solid rgba(0,0,0, 0.2);
  ${({ url }) => url && `background-image: url(${url}); background-size: cover;`}
  ${({ clicked }) => clicked
    && `box-shadow: 0px 0px 7px 3px #cf77f3
`}
  ${({ clicked }) => !clicked
    && `cursor: pointer;
`}
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
