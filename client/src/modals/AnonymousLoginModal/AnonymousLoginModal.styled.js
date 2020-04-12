import styled from "styled-components";
import { Button } from "components/Generic";

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 40px;
  &:first-of-type {
    margin-top: 16px;
  }
  .input_label {
    padding-left: 10px;
    margin-bottom: 2px;
    color: rgba(map-get($map: $color-map, $key: "black"), 0.54);
  }
  .input_input {
    border: 0;
    padding: 16px 12px;
    border-bottom: 2px solid map-get($map: $color-map, $key: "sea");
    transition: background 0.2s ease-in-out;
    &:focus {
      outline: none;
      background: rgba(map-get($map: $color-map, $key: "sea"), 0.05);
    }
  }
`;

export const SubmitButton = styled(Button)`
  margin-top: 32px;
`;
