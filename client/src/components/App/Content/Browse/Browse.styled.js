import styled from "styled-components";
import { Link } from "react-router-dom";

export const Separator = styled.div`
  text-align: center;
  margin: 24px 0;
  font-size: 18px;
`;

export const AboutLink = styled(Link)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: rgba(0, 0, 0, 0.58);
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  margin-top: 40px;
`;

export const CardsPlaceholder = styled.div`
  text-align: center;
  padding: 60px;
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.3);
  p {
    margin-bottom: 30px;
  }
`;
