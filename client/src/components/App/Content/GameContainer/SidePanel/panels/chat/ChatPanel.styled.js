import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

export const Messages = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`;

export const InputContainer = styled.div`
  margin-top: auto;

  position: relative;
`;

export const SendButton = css`
  background-color: deepSkyBlue;
  border-radius: 100%;
  padding: 0.5em;
  position: absolute;
  right: 0.25em;
  top: 50%;
  transform: translateY(-50%);
`;

export const MessageInput = css`
  background-color: white;
  color: red;
  height: auto;
  input {
    border: none;
    border-top: 1px solid lightGrey;
    :disabled {
      border: none;
    }
    :focus {
      background: inherit;
    }
  }
`;
