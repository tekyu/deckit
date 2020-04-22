import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "swiper/swiper.scss";
import Swiper from "react-id-swiper";
import { deckitSelectors, userSelectors } from "store/selectors";
import Card from "../Card/Card";
import Blocker from "../../../../components/Generic/Blocker/Blocker";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  display: block;
  height: 60px;
  transition: height 0.4s ease-in-out;
  /* margin-top: auto; */
  @media (min-width: 600px) {
    height: 400px;
  }
  &:hover {
    height: 400px;
  }
`;

const StyledHand = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: center;
`;

const StyledCardContainer = styled.div`
  transition: all 0.3s ease-in-out;
  &:not(:first-of-type) {
    margin-left: -50px;
  }
  &:hover {
    padding-left: 16px;
    padding-right: 16px;
    &:not(:first-of-type) {
      margin-left: 0;
    }
  }
  &:hover + div {
    &:not(:first-of-type) {
      margin-left: 0;
    }
  }
`;

const getState = (hinterId, stage, userId) => {
  if (stage === 2 && hinterId === userId) {
    return "hinter";
  }
  if (stage === 3 && hinterId !== userId) {
    return "picker";
  }
  return null;
};

const Hand = () => {
  const cards = useSelector(deckitSelectors.myCards);
  const hinter = useSelector(deckitSelectors.hinter);
  const stage = useSelector(deckitSelectors.gameStage);
  const user = useSelector(userSelectors.user); // select cards from user
  const blockHand = useSelector(deckitSelectors.blockHand);
  return (
    <StyledContainer>
      {blockHand && <Blocker />}
      <div style={{ height: "100%" }}>
        <StyledHand>
          {cards.map(card => {
            return (
              <StyledCardContainer key={card.id}>
                <Card card={card} state={getState(hinter.id, stage, user.id)} />
              </StyledCardContainer>
            );
          })}
        </StyledHand>
      </div>
    </StyledContainer>
  );
};

export default Hand;
