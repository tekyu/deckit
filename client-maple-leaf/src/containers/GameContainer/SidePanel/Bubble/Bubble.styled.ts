import styled from 'styled-components';

export const Container = styled.div <{ opened: boolean; updated: boolean; name: string }>`
width: 40px;
height: 40px;
border-radius: 100%;
margin: 4px;
cursor: pointer;
box-sizing: border-box;
position: relative;
display: flex;
align-items: center;
justify-content: center;
color: #000;
&:first-of-type {
  margin-left: 0;
}
${({ opened }) => opened
    && `
  background-image: linear-gradient(
  40deg,
  #2ac9db -30%,
  #009bff 47%,
  #cf77f3 150%
  );
  color: #fff;
`}
${({ updated }) => updated
    && `
  &:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 10px;
    background: orange;
    top: 0;
    right: -5px;
  }
`}
`;
