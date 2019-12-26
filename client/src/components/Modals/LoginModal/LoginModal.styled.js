import styled, { css } from "styled-components";
import { rgba } from "polished";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  & > * {
    margin-top: 2em;
  }
`;

export const LoginButton = css`
  border-radius: 50px;
  font-size: 1em;
  height: 2.5em;
`;

export const PasswordRecovery = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 6px;
  color: ${rgba(`black`, 0.5)};
`;

export const CreateAccount = styled.span`
  font-size: 16px;
  color: ${rgba(`black`, 0.5)};
`;
