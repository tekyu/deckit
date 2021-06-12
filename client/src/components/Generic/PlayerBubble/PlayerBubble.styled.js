import styled from "styled-components";

export const Container = styled.div`
width: 30px;
height: 30px;
min-height: 30px;
min-width: 30px;
border-radius: 100%;
background: black;
transition: all 0.3s ease-in-out;
${({ avatar }) => avatar
    && `
  background-image: ${avatar};
`}
${({ color }) => color
    && `
  box-shadow: 0px 0px 10px 0px ${color};
  background-color: ${color};
`}
${({ didPick }) => didPick
    && `
  box-shadow: 0px 0px 12px 4px rgba(237,227,83,1);
`}
`;
