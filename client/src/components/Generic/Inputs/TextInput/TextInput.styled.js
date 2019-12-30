import styled from "styled-components";
import { rgba } from "polished";

export const Container = styled.div`
  height: 4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  ${props => props.isInputEntered && `> label,`}
  :focus-within > label {
    font-size: 0.75em;
    left: 0.25em;
    top: 0.75em;
  }
`;

export const Label = styled.label`
  color: ${rgba(`black`, 0.5)};
  left: 0.5em;
  pointer-events: none;
  position: absolute;
  transition: all 0.25s ease;
  top: 50%;
  transform: translateY(-50%);
`;

export const Input = styled.input`
  border: 0;
  padding: 0.5em 0.5em;
  border-bottom: ${props => `2px solid ${props.theme.tempPal_sea}`};
  transition: background 0.2s ease-in-out;
  :disabled {
    background: none;
    border-color: grey;
  }
  :focus {
    outline: none;
    background: ${props => rgba(props.theme.tempPal_sea, 0.05)};
  }
`;
