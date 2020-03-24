import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import selectUser from "../../../../store/selectors/selectUser";
import selectActiveRoom from "../../../../store/selectors/selectActiveRoom";
import selectMyCards from "../../../../store/deckit/selectors/selectMyCards";
import {
  updateMyCardsListener,
  removeUpdateMyCardsListener
} from "../../../../store/deckit/deckitActions";
import selectGameStage from "../../../../store/deckit/selectors/selectGameStage";
import selectHinter from "../../../../store/deckit/selectors/selectHinter";

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

const getCards = (cards, state) => {
  return cards.map(card => {
    return <Card card={card} key={card.id} state={state} />;
  });
};

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
  // const dispatch = useDispatch();
  // const activeRoom = useSelector(selectActiveRoom);
  const cards = useSelector(selectMyCards);
  const hinter = useSelector(selectHinter);
  const stage = useSelector(selectGameStage);
  const user = useSelector(selectUser); // select cards from user
  const state = getState(hinter.id, stage, user.id);
  return <StyledContainer>{cards && getCards(cards, state)}</StyledContainer>;
};

export default Hand;
