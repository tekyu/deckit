import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import SidePanel from "../GameContainer/SidePanel/SidePanel";
import selectActiveRoom from "../../store/selectors/selectActiveRoom";
import selectHinter from "../../store/deckit/selectors/selectHinter";
import selectHint from "../../store/deckit/selectors/selectHint";
import selectHintCard from "../../store/deckit/selectors/selectHintCard";
import Hand from "./components/Hand/Hand";
import selectUserId from "../../store/selectors/selectUserId";
import {
  sendHint,
  updateMyCardsListener,
  removeUpdateMyCardsListener,
  updateGameOptionsListener
} from "../../store/deckit/deckitActions";
import PickingArea from "./components/PickingArea/PickingArea";
import { startGame } from "../../store/room/roomActions";
import selectActiveRoomId from "../../store/selectors/selectActiveRoomId";
import Message from "./components/Message/Message";
import selectMyCard from "../../store/deckit/selectors/selectMyCard";
import { Button } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./components/Card/Card";

/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const StyledTable = styled.div`
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  /* display: flex;
  flex-direction: column; */
  margin-right: 20px;
  display: block;
`;

const StyledDraft = styled.div`
  height: auto;
  width: 100%;
`;

const StyledMessageContainer = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  background: #fff;
  box-shadow: -5px 5px 15px rgba(207, 119, 243, 0.2),
    0px 5px 15px rgba(0, 155, 255, 0.2), -5px 5px 15px rgba(42, 201, 219, 0.2);
`;

const StyledHintForm = styled(Form)`
  width: 100%;
  /* padding: 20px; */
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 6px;
  text-align: center;
  /* background: #fff; */
  /* box-shadow: 0px 0px 1px 0px rgba(207, 119, 243, 0.2),
    0px 0px 1px 0px rgba(0, 155, 255, 0.2),
    0px 0px 1px 0px rgba(42, 201, 219, 0.2); */
`;

const StyledField = styled(Field)`
  border: 0;
  background: transparent;
  padding: 7px;
  font-size: 18px;
  text-align: center;
  outline: none;
  position: relative;
  width: 100%;
`;

const StyledHintContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const StyledHintButtonContainer = styled.div`
  margin-right: 10px;
  position: relative;
  display: flex;
  background: #fff;
  width: 100%;
  box-shadow: 0px 10px 30px -15px rgba(0, 0, 0, 0.28);
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-image: linear-gradient(
      40deg,
      #2ac9db 0%,
      #009bff 47%,
      #cf77f3 100%
    );
  }
`;

const StyledHintButton = styled(Button)`
  min-width: 130px;
  padding: 16px 24px;
  white-space: nowrap;
  border-radius: 3px;
  background-image: linear-gradient(
    40deg,
    #2ac9db -30%,
    #009bff 47%,
    #cf77f3 150%
  );
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
`;

const Deckit = () => {
  const dispatch = useDispatch();
  const activeRoom = useSelector(selectActiveRoom);
  const activeRoomId = useSelector(selectActiveRoomId);
  const userId = useSelector(selectUserId);
  const hinter = useSelector(selectHinter);
  const hint = useSelector(selectHint);
  const hintCard = useSelector(selectMyCard);
  const cards1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  console.log("hintCard", hintCard);
  return (
    <StyledTable>
      <h2>Center Mode</h2>
      <Slider
        settings={{
          infinite: true,
          centerPadding: "60px",
          slidesToShow: 3,
          speed: 500
        }}
      >
        {cards1.map(card => {
          console.log("CARD IN CAROUSEL", card);
          return <Card card={card} key={card.id} />;
        })}
      </Slider>

      <Message />
      {/* <StyledMessageContainer>
        {hinter && userId === hinter.id
          ? `You are choosing a hint. Field will appear after you choose a card`
          : `${hinter.username} is choosing a hint`}
      </StyledMessageContainer> */}
      <StyledDraft />
      {hintCard && !hint && activeRoom && userId === hinter.id && (
        <Formik
          initialValues={{
            hint: ""
          }}
          onSubmit={({ hint }) => {
            dispatch(sendHint({ activeRoomId, hint }));
          }}
        >
          {() => {
            return (
              <StyledHintForm>
                <StyledHintContainer>
                  <StyledHintButtonContainer>
                    <StyledField
                      name="hint"
                      type="text"
                      placeholder="Place your hint in here"
                    />
                  </StyledHintButtonContainer>
                  <StyledHintButton
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Post hint
                  </StyledHintButton>
                </StyledHintContainer>
              </StyledHintForm>

              // <StyledHintForm>
              //   <Field name="hint" type="text" />
              //   {/* <input type="text" placeholder="Place your hint in here"/> */}
              //   <button type="submit">Give hint</button>
              // </StyledHintForm>
            );
          }}
        </Formik>
      )}
      <PickingArea />
      <Hand />
    </StyledTable>
  );
};

export default Deckit;
