import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { roomActions, socketActions } from "store/actions";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { roomSelectors, userSelectors } from "store/selectors";
import Icon from "components/Generic/Icon/Icon";
import { Button } from "components/Generic";
import PlayersList from "./PlayersList/PlayersList";
import ActionButton from "./ActionButton/ActionButton";
import PlayerCounterWithIcon from "../Generic/PlayerCounterWithIcon/PlayerCounterWithIcon";
import * as Styled from "./WaitingScreen.styled";

const WaitingScreen = () => {
  const [hideMessage, setHideMessage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const room = useSelector(roomSelectors.activeRoom);
  const myId = useSelector(userSelectors.userId);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (room) {
      setIsAdmin(myId === room.admin);
    }
  }, [myId, room]);

  useEffect(() => {
    dispatch(
      socketActions.listener(`KICKED`, () => {
        history.replace(`/`);
        toast.error(`You have been kicked from the room`, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
    );
  }, [dispatch, history]);

  const hideMessageHandler = () => {
    setHideMessage(hide => !hide);
  };

  const changeRoomModeHandler = () => {
    dispatch(roomActions.changeRoomMode(room.id));
    toast.warning(`Room mode has been changed`, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  return (
    <>
      {room && (
        <Styled.Container id={room.id}>
          <Styled.Header>
            <Styled.Mode>
              <Icon
                icon={room.mode === `public` ? `public` : `lock`}
                size={30}
              />
              {room.mode}
            </Styled.Mode>
            <Styled.Title>{room.name}</Styled.Title>
            <PlayerCounterWithIcon
              playersNow={room.players.length}
              playersMax={room.playersMax}
            />
          </Styled.Header>
          <Styled.ShowIdContainer>
            {!hideMessage && (
              <h3>
                <p>This is your room id</p>
                <p style={{ marginBottom: "6px" }}>
                  Share it to friends or click on it to copy
                </p>
                <CopyToClipboard text={room.id}>
                  <Button variant="contained" color="primary">
                    {room.id}
                  </Button>
                </CopyToClipboard>
              </h3>
            )}
            <FormControlLabel
              label={
                hideMessage ? `Show id to share room` : `Hide this message`
              }
              control={
                <Checkbox
                  color="primary"
                  defaultChecked
                  onChange={hideMessageHandler}
                />
              }
            />
          </Styled.ShowIdContainer>
          {room && room.id && (
            <PlayersList
              players={room.players}
              myId={myId}
              isAdmin={isAdmin}
              room={room}
            />
          )}
          {isAdmin && (
            <div>
              <h4>Options</h4>
              <FormControlLabel
                label="Private room"
                control={
                  <Switch
                    color="primary"
                    checked={room.mode === `private`}
                    onChange={roomActions.changeRoomModeHandler}
                  />
                }
              />
            </div>
          )}
          <ActionButton />
        </Styled.Container>
      )}
    </>
  );
};

export default WaitingScreen;
