import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import GenericInputHooks from "utils/genericInputHooks";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
`;

export const Input = styled(GenericInputHooks)`
  border-radius: 18px;
  padding: 6px 8px;
  border: 1px solid rgba(0, 0, 0, 0.28);
  width: 100%;
  transition: border 0.3s ease-in-out;
  margin-right: 12px;
  outline: none;
  &:focus,
  &:active,
  &:hover {
    border: 1px solid #009bff;
  }
`;

export const Icon = styled(SendIcon)`
  color: #009bff;
`;
