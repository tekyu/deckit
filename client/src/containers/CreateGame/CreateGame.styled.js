import styled from "styled-components";
import { Form } from "formik";
import * as core from "@material-ui/core";

export const Header = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
`;

export const CreateForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 20px 5px 100px rgba(207, 119, 243, 0.1),
    0px 5px 100px rgba(0, 155, 255, 0.1),
    -20px 5px 100px rgba(42, 201, 219, 0.1);
  border-radius: 6px;
  padding: 60px;
  @media (max-width: 600px) {
    width: 100%;
    padding: 40px;
    margin-top: 60px;
  }
`;

export const CreateButton = styled(core.Button)`
  border: 0;
  border-radius: 3px;
  background: transparent;
  background-image: linear-gradient(
    35deg,
    #2ac9db -10%,
    #009bff 47%,
    #cf77f3 130%
  );
  font-size: 14px;
  padding: 16px 32px;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease-out;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.28);
  &:focus,
  &:hover,
  &:active {
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.28);
  }
`;

export const TextField = styled(core.TextField)`
  width: 100%;
  margin: 15px 0;
`;

export const ControlLabel = styled(core.FormControlLabel)`
  width: 100%;
  margin: 15px 0;
`;

export const Slider = styled(core.Slider)`
  width: 100%;
  margin: 45px 0 15px 0;
  color: #009bff;
`;

export const SliderLabel = styled.label`
  width: 100%;
  margin: 25px 0 0 0;
`;
