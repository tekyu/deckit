import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import selectActiveRoomId from "../../../../store/selectors/selectActiveRoomId";
import {
  pickMyCard,
  sendHintCard,
  chooseHinterCard
} from "../../../../store/deckit/deckitActions";
import PickedBy from "./components/PickedBy";
import selectPickedCard from "../../../../store/deckit/selectors/selectPickedCard";
import selectMyCard from "../../../../store/deckit/selectors/selectMyCard";

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
  margin: 0 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 3px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
  background-image: linear-gradient(
    40deg,
    #2ac9db -30%,
    #009bff 47%,
    #cf77f3 150%
  );
`;

const StyledPickedBy = styled.div`
  background: blue;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-self: flex-end;
  justify-self: right;
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 10px;
  width: 30px;
  height: 30px;
`;

const StyledPickedBy2 = styled(PickedBy)`
  background: blue;
`;

const Card = ({ card = {}, state = null, owner, pickedBy } = {}, props) => {
  console.log("card", card, state, props);
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const { id = 123, title = "placeholder", url = "" } = card;
  const activeRoomId = useSelector(selectActiveRoomId);
  const pickedCard = useSelector(selectPickedCard);
  const showButtonHandler = () => {
    setShowButton(lastState =>
      (state === "picker" && pickedCard) ||
      (state === "chooser" && pickedCard && pickedCard.id === id)
        ? false
        : !lastState
    );
    console.log("showbutton", showButton);
  };
  const pickCardHandler = () => {
    switch (state) {
      case "hinter":
        dispatch(sendHintCard({ activeRoomId, card }));
        break;
      case "picker":
        dispatch(pickMyCard({ activeRoomId, card }));
        break;
      case "chooser":
        dispatch(chooseHinterCard({ activeRoomId, card }));
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
        <StyledButton
          color="primary"
          variant="contained"
          onClick={pickCardHandler}
        >
          Pick card
        </StyledButton>
      )}
      {pickedBy && <PickedBy pickedBy={pickedBy} />}
    </StyledContainer>
  );
};

export default Card;
