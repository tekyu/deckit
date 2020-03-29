import React from "react";
import { useSelector } from "react-redux";
import selectPickedCardsToHint from "../../../../store/deckit/selectors/selectPickedCardsToHint";
import Card from "../Card/Card";
import selectGameStage from "../../../../store/deckit/selectors/selectGameStage";
import selectPlayersPickedCard from "../../../../store/deckit/selectors/selectPlayersPickedCard";
import selectUserId from "../../../../store/selectors/selectUserId";
import selectHinter from "../../../../store/deckit/selectors/selectHinter";
import selectPickedCard from "../../../../store/deckit/selectors/selectPickedCard";

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
    return "chooser";
  };
  const getPickedCards = cards => {
    return cards.map(({ card }) => {
      return <Card card={card} key={card.id} state={getCardState(card.id)} />;
    });
  };
  const placeHolderCards = () => {
    return playersPickedCard.map((player, i) => {
      return <Card card={{ id: i }} />;
    });
  };

  const getRoundSummary = (pickedCardsToHint, hintCard) => {
    return pickedCardsToHint.map(({ card, owner, pickedBy }) => {
      return (
        <Card card={card} owner={owner} pickedBy={pickedBy} key={owner.id} />
      );
    });
  };

  return (
    <div>
      PICKING AREA {JSON.stringify(playersPickedCard)}
      {stage === 3 && placeHolderCards()}
      {stage === 4 && getPickedCards(pickedCardsToHint)}
      {stage === 5 && getRoundSummary(pickedCardsToHint)}
    </div>
  );
};

export default PickingArea;
