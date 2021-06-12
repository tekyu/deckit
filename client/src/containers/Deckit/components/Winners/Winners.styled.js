import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import LaurelIcon from "components/Generic/Icons/LaurelIcon";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  z-index: 100000;
  background: #fff;
`;

export const Header = styled.div`
  padding: 20px;
  padding-top: 0;
  text-align: center;
  margin-bottom: 30px;
  margin-top: auto;
`;

export const Announcement = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const Laurel = styled(LaurelIcon)`
  font-size: 8rem;
  margin-bottom: 10px;
`;

export const Name = styled.h4`
  font-size: 46px;
  margin-bottom: 20px;
`;

export const RunnersupHeader = styled.h4`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: auto;
`;

export const Runnersup = styled.div`
  margin-bottom: auto;
  overflow-y: auto;
  width: 80%;
  max-width: 600px;
  max-height: 50vh;
`;

export const ScoreElement = styled.div`
  margin: 10px 0;
`;

export const ReturnLink = styled(Link)`
  margin: 40px;
`;

export const ReturnButton = styled(Button)`
  padding: 16px 32px;
  border-radius: 3px;
  background-image: linear-gradient(
    40deg,
    #2ac9db -30%,
    #009bff 47%,
    #cf77f3 150%
  );
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
`;
