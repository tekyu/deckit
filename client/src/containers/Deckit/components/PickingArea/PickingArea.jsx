import React from "react";
import { useSelector } from "react-redux";
import { deckitSelectors, userSelectors } from "store/selectors";
import Card from "../Card/Card";
import PickedCards from "../PickedCards/PickedCards";
import PlaceholderCardsList from "../PlaceholderCardsList/PlaceholderCardsList";
import RoundSummary from "../RoundSummary/RoundSummary";
import * as Styled from "./PickingArea.styled";

const PickingArea = () => {
  const pickedCardsToHint = useSelector(deckitSelectors.pickedCardsToHint);
  const playersPickedCard = useSelector(deckitSelectors.playersPickedCard);
  const hintCard = useSelector(deckitSelectors.hintCard);
  const hinter = useSelector(deckitSelectors.hinter);
  const stage = useSelector(deckitSelectors.gameStage);
  const pickedCard = useSelector(deckitSelectors.pickedCard);
  const userId = useSelector(userSelectors.userId);
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
      {stage === 5 && (
        <RoundSummary hintCard={hintCard} cards={pickedCardsToHint} />
      )}
    </Styled.Container>
  );
};

export default PickingArea;
