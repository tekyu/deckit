import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as styles from "./Deckit.module.scss";
import SidePanel from "../GameContainer/SidePanel/SidePanel";
import selectActiveRoom from "../../store/selectors/selectActiveRoom";
import selectHinter from "../../store/deckit/selectors/selectHinter";
import selectHint from "../../store/deckit/selectors/selectHint";
import Hand from "./components/Hand/Hand";
import selectUserId from "../../store/selectors/selectUserId";
import { Formik, Field, Form } from "formik";
import {
  sendHint,
  updateMyCardsListener,
  removeUpdateMyCardsListener,
  updateGameOptionsListener
} from "../../store/deckit/deckitActions";
import PickingArea from "./components/PickingArea/PickingArea";
import { startGame } from "../../store/room/roomActions";
import selectActiveRoomId from "../../store/selectors/selectActiveRoomId";
/**
 * TODO:
 * Change the store/actions/socket to topic wise, createGame
 * should be in the main game/room creation topic
 */

const StyledHinter = styled.div`
  width: 100%;
  margin: 20px;
  top: 0;
  left: 0;
  position: sticky;
  background: red;
  border-radius: 6px;
`;

// const StyledHintInput =

const Deckit = () => {
  const dispatch = useDispatch();
  const activeRoom = useSelector(selectActiveRoom);
  const activeRoomId = useSelector(selectActiveRoomId);
  const userId = useSelector(selectUserId);
  const hinter = useSelector(selectHinter);
  const hint = useSelector(selectHint);
  return (
    <div className={styles.table}>
      <StyledHinter>
        {hinter && userId === hinter.id
          ? `You are choosing a hint. Field will appear after you choose a card`
          : `${hinter.username} is choosing a hint`}
      </StyledHinter>
      <div className={styles.draft}></div>
      {!hint && activeRoom && userId === hinter.id && (
        <Formik
          initialValues={{
            hint: ""
          }}
          onSubmit={({ hint }) => {
            console.log("sendHint", hint);
            dispatch(sendHint({ activeRoomId, hint }));
          }}
        >
          {() => {
            return (
              <Form>
                <Field name="hint" type="text" />
                {/* <input type="text" placeholder="Place your hint in here"/> */}
                <button type="submit">Give hint</button>
              </Form>
            );
          }}
        </Formik>
      )}

      <PickingArea />
      <Hand />
    </div>
  );
};

export default Deckit;
