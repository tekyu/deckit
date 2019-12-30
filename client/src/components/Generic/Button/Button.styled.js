import styled from "styled-components";

export const Button = styled.button`
  border: 0;
  font-family: "Hammersmith One";
  font-size: 14px;
  letter-spacing: 0.1em;
  padding: 7px 21px;
  &.primary {
    background: linear-gradient(
      45deg,
      ${props => props.theme.tempPal_lagoon} 0%,
      ${props => props.theme.tempPal_sea} 100%
    );
    color: white;
    &:hover {
      background: linear-gradient(
        45deg,
        ${props => props.theme.tempPal_burnt_orange} 0%,
        ${props => props.theme.tempPal_sea} 100%
      );
    }
  }
  &.secondary {
    color: black;
    &:hover {
      color: ${props => props.theme.tempPal_sea};
    }
  }
  ${props => props.styles}
`;
