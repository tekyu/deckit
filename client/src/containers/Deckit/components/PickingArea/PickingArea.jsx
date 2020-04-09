import React from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "store/selectors";
import {
  selectGameStage,
  selectHinter,
  selectPickedCard,
  selectPickedCardsToHint,
  selectPlayersPickedCard
} from "store/deckit/selectors";
import Card from "../Card/Card";
import PickedCards from "../PickedCards/PickedCards";
import PlaceholderCardsList from "../PlaceholderCardsList/PlaceholderCardsList";
import RoundSummary from "../RoundSummary/RoundSummary";
import * as Styled from "./PickingArea.styled";

const PickingArea = () => {
  const pickedCardsToHint = useSelector(selectPickedCardsToHint);
  const playersPickedCard = useSelector(selectPlayersPickedCard);
  const hinter = useSelector(selectHinter);
  const userId = useSelector(selectUserId);
  const stage = useSelector(selectGameStage);
  const pickedCard = useSelector(selectPickedCard);
  const getCardState = cardId => {
    if (userId === hinter.id || cardId === pickedCard.id) {
      return null;
    }
    return `chooser`;
  };

  const getRoundSummary = (pickedCardsToHint, hintCard) => {
    return pickedCardsToHint.map(({ card, owner, pickedBy }) => {
      return (
        <Card card={card} owner={owner} pickedBy={pickedBy} key={owner.id} />
      );
    });
  };

  return (
    <Styled.Container>
      {stage === 3 && <PlaceholderCardsList cards={playersPickedCard} />}
      {stage === 4 && <PickedCards cards={pickedCardsToHint} />}
      {/* {stage === 5 && getRoundSummary(pickedCardsToHint)} */}
      {stage === 5 && <RoundSummary cards={pickedCardsToHint} />}
    </Styled.Container>
  );
};

export default PickingArea;
