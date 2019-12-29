import styled from "styled-components";
import { rgba } from "polished";

export const Container = styled.div`
  align-items: center;
  display: flex !important;
`;

export const Label = styled.label`
  padding-left: 10px;
  color: ${rgba(`black`, 0.5)};
`;

export const Input = styled.input`
  border: 0;
  border-bottom: ${props => `2px solid ${props.theme.tempPal_sea}`};
  margin: 0 1em;
  transition: background 0.2s ease-in-out;
  &:focus {
    outline: none;
    background: ${props => rgba(props.theme.tempPal_sea, 0.05)};
  }
`;
