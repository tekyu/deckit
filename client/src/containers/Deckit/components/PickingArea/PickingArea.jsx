import React from "react";
import { useSelector } from "react-redux";
import { deckitSelectors } from "store/selectors";
import PickedCards from "../PickedCards/PickedCards";
import PlaceholderCardsList from "../PlaceholderCardsList/PlaceholderCardsList";
import RoundSummary from "../RoundSummary/RoundSummary";
import * as Styled from "./PickingArea.styled";

const PickingArea = () => {
  const pickedCardsToHint = useSelector(deckitSelectors.pickedCardsToHint);
  const playersPickedCard = useSelector(deckitSelectors.playersPickedCard);
  const hintCard = useSelector(deckitSelectors.hintCard);
  const stage = useSelector(deckitSelectors.gameStage);

  return (
    <Styled.Container>
      {stage === 3 && <PlaceholderCardsList cards={playersPickedCard} />}
      {stage === 4 && <PickedCards cards={pickedCardsToHint} />}
      {stage === 5 && (
        <RoundSummary hintCard={hintCard} cards={pickedCardsToHint} />
      )}
    </Styled.Container>
  );
};

export default PickingArea;
