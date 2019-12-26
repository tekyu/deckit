import styled from "styled-components";
import { rgba } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  padding-left: 10px;
  margin-bottom: 2px;
  color: ${rgba(`black`, 0.5)};
`;

export const Input = styled.input`
  border: 0;
  padding: 16px 12px;
  border-bottom: ${props => `2px solid ${props.theme.tempPal_sea}`};
  transition: background 0.2s ease-in-out;
  &:focus {
    outline: none;
    background: ${props => rgba(props.theme.tempPal_sea, 0.05)};
  }
`;
