import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "components/Generic";
import { deckitActions } from "store/actions";
import { deckitSelectors, roomSelectors } from "store/selectors";
import PickedBy from "./components/PickedBy";

const StyledContainer = styled.div`
  width: 270px;
  height: 400px;
  background-color: yellow;
  ${({ url }) =>
    url && `background-image: url(${url}); background-size: cover;`}
  ${({ clicked }) =>
    clicked &&
    `box-shadow: 0px 0px 7px 3px #fded81
`}
  ${({ clicked }) =>
    !clicked &&
    `cursor: pointer;
`}
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 0 4px; */
`;

const Card = ({ card = {}, state = null, owner, pickedBy } = {}, props) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const { id = 123, title = `placeholder`, url = `` } = card;
  const activeRoomId = useSelector(roomSelectors.activeRoomId);
  const pickedCard = useSelector(deckitSelectors.pickedCard);
  const showButtonHandler = () => {
    setShowButton(lastState =>
      (state === `picker` && pickedCard) ||
      (state === `chooser` && pickedCard && pickedCard.id === id)
        ? false
        : !lastState
    );
  };
  const pickCardHandler = () => {
    switch (state) {
      case `hinter`:
        dispatch(deckitActions.sendHintCard({ activeRoomId, card }));
        break;
      case `picker`:
        dispatch(deckitActions.pickMyCard({ activeRoomId, card }));
        break;
      case `chooser`:
        dispatch(deckitActions.chooseHinterCard({ activeRoomId, card }));
        break;
      default:
        break;
    }
  };

  return (
    <StyledContainer
      clicked={showButton}
      id={id}
      key={id}
      url={url}
      onClick={showButtonHandler}
    >
      {state && showButton && (
        <Button color="primary" variant="contained" onClick={pickCardHandler}>
          Pick card
        </Button>
      )}
      {pickedBy && pickedBy.length > 0 && <PickedBy pickedBy={pickedBy} />}
    </StyledContainer>
  );
};

export default Card;
