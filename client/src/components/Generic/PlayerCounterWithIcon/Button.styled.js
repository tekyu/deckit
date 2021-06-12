import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => props.theme.secondary};
  border: 0;
  color: ${(props) => props.theme.font};
  cursor: pointer;
  font-family: "Hammersmith One";
  font-size: 14px;
  letter-spacing: 0.1em;
  padding: 7px 21px;
  ${(props) => props.styles}
`;
