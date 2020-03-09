import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import selectActiveRoomId from "../../../../store/selectors/selectActiveRoomId";
import {
  pickMyCard,
  sendHintCard,
  chooseHinterCard
} from "../../../../store/deckit/deckitActions";

const StyledContainer = styled.div`
  width: 344px;
  height: 534px;
  background-color: yellow;
  ${({ url }) =>
    url && `background-image: url(${url}); background-size: cover;`}
  margin: 0 10px;
  border-radius: 6px;
`;

const Card = (card, state = null) => {
  const { id, title, url } = card;
  const dispatch = useDispatch();
  const activeRoomId = useSelector(selectActiveRoomId);
  const pickCardHandler = () => {
    switch (state) {
      case "hinter":
        dispatch(sendHintCard(activeRoomId, card));
        break;
      case "picker":
        dispatch(pickMyCard(activeRoomId, card));
        break;
      case "chooser":
        dispatch(chooseHinterCard(activeRoomId, card));
        break;
      default:
        break;
    }
  };

  return (
    <StyledContainer id={id} key={id} url={url}>
      {state && <button onClick={pickCardHandler}>Pick card</button>}
    </StyledContainer>
  );
};

export default Card;