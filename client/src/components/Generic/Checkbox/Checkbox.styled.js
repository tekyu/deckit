import styled from "styled-components";
import { rgba } from "polished";

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const Label = styled.label`
  color: ${rgba(`black`, 0.5)};
  padding-left: 10px;
`;

export const Input = styled.input`
  border: 0;
  border-bottom: ${props => `2px solid ${props.theme.tempPal_sea}`};
  transition: background 0.2s ease-in-out;
  &:focus {
    outline: none;
    background: ${props => rgba(props.theme.tempPal_sea, 0.05)};
  }
`;
