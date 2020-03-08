import React from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import selectUser from "../../../../store/selectors/selectUser";
import selectActiveRoom from "../../../../store/selectors/selectActiveRoom";

const StyledContainer = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  background: cornflowerblue;
  height: 120px;
  transition: height 0.4s ease-in-out;
  display: flex;
  flex-wrap: wrap;
  &:hover {
    height: 80%;
  }
`;

const getCards = (cards, isHinter) => {
  return cards.map(card => {
    return <Card {...card} isHinter={isHinter} />;
  });
};

const getState = (hinter, stage, userId) => {
  if (hinter === userId && stage === 2) {
    return "hinter";
  }
  if (stage === 3) {
    return "picker";
  }
  return null;
};

const Hand = () => {
  const activeRoom = useSelector(selectActiveRoom);
  const user = useSelector(selectUser); // select cards from user
  const {
    gameOptions: { hinter, stage }
  } = activeRoom;
  const state = getState(hinter, stage, user.id);
  return (
    <StyledContainer>{user && getCards(user.cards, state)}</StyledContainer>
  );
};

export default Hand;
