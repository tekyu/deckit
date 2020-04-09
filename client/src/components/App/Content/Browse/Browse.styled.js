import styled from "styled-components";
import { Link } from "react-scroll";

export const Separator = styled.div`
  text-align: center;
  margin: 24px 0;
  font-size: 18px;
`;

export const AboutLink = styled(Link)`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  margin-top: 40px;
`;
