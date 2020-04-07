import React from "react";
import { useSelector } from "react-redux";
import selectPickedCardsToHint from "../../../../store/deckit/selectors/selectPickedCardsToHint";
import Card from "../Card/Card";
import selectGameStage from "../../../../store/deckit/selectors/selectGameStage";
import selectPlayersPickedCard from "../../../../store/deckit/selectors/selectPlayersPickedCard";
import selectUserId from "../../../../store/selectors/selectUserId";
import selectHinter from "../../../../store/deckit/selectors/selectHinter";
import selectPickedCard from "../../../../store/deckit/selectors/selectPickedCard";
import { Slider } from "@material-ui/core";
import styled from "styled-components";
import PickedCards from "../PickedCards/PickedCards";
import PlaceholderCardsList from "../PlaceholderCardsList/PlaceholderCardsList";
import RoundSummary from "../RoundSummary/RoundSummary";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
`;

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

  const getRoundSummary = (pickedCardsToHint, hintCard) => {
    return pickedCardsToHint.map(({ card, owner, pickedBy }) => {
      return (
        <Card card={card} owner={owner} pickedBy={pickedBy} key={owner.id} />
      );
    });
  };

  return (
    <StyledContainer>
      {stage === 3 && <PlaceholderCardsList cards={playersPickedCard} />}
      {stage === 4 && <PickedCards cards={pickedCardsToHint} />}
      {/* {stage === 5 && getRoundSummary(pickedCardsToHint)} */}
      {stage === 5 && <RoundSummary cards={pickedCardsToHint} />}
    </StyledContainer>
  );
};

export default PickingArea;
