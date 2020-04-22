import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import LaurelIcon from "../../../../components/Generic/Icons/LaurelIcon";

export const StyledContainer = styled.div`
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

export const StyledHeader = styled.div`
  padding: 20px;
  padding-top: 0;
  text-align: center;
  margin-bottom: 30px;
  margin-top: auto;
`;

export const StyledAnnouncement = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const StyledLaurel = styled(LaurelIcon)`
  font-size: 8rem;
  margin-bottom: 10px;
`;

export const StyledName = styled.h4`
  font-size: 46px;
  margin-bottom: 20px;
`;

export const StyledRunnersupHeader = styled.h4`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: auto;
`;

export const StyledRunnersup = styled.div`
  margin-bottom: auto;
  overflow-y: auto;
  width: 80%;
  max-width: 600px;
  max-height: 50vh;
`;

export const StyledScoreElement = styled.div`
  margin: 10px 0;
`;

export const StyledLink = styled(Link)`
  margin: 40px;
`;

export const StyledReturnButton = styled(Button)`
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
