import styled from "styled-components";
import { Field, ErrorMessage, Form } from "formik";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 80px;
`;

export const JoinForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Error = styled(ErrorMessage)`
  margin: 6px 0;
  opacity: 0.6;
  font-size: 14px;
`;

export const RoomIdField = styled(Field)`
  border: 0;
  background: transparent;
  padding: 7px;
  font-size: 18px;
  text-align: center;
  outline: none;
  position: relative;
`;

export const JoinContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

export const JoinFieldContainer = styled.div`
  margin-right: 10px;
  position: relative;
  display: flex;
  box-shadow: 0px 10px 30px -15px rgba(0, 0, 0, 0.28);
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-image: linear-gradient(
      40deg,
      #2ac9db 0%,
      #009bff 47%,
      #cf77f3 100%
    );
  }
`;

export const Separator = styled.div`
  margin: 20px 0;
  font-size: 18px;
`;
