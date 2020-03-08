import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { listener } from "store/actions";
import selectActiveRoom from "../../store/selectors/selectActiveRoom";
import selectUserId from "../../store/selectors/selectUserId";
import selectUser from "../../store/selectors/selectUser";
import { getGameMapping } from "../../utils/gameMapping";
import Timer from "../Timer/Timer";
import PlayersList from "./PlayersList/PlayersList";
import {
  updatePlayerInRoom,
  startGame,
  changeRoomMode
} from "../../store/room/roomActions";
import Icon from "../Generic/Icon/Icon";
import { updatedUser } from "../../store/user/userActions";
import ActionButton from "./ActionButton/ActionButton";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
  background: rgba(255, 0, 0, 0.1);
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const StyledHeader = styled.div`
  background: yellow;
  font-family: "Catamaran";
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px;
  font-size: 18px;
  min-height: 60px;
`;

const StyledWelcome = styled.h3`
  margin-bottom: 30px;
  font-size: 18px;
`;

const StyledTitle = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
`;

const StyledMode = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
`;

const StyledShowIdContainer = styled.div`
  margin-top: 60px;
`;

const StyledHiddenMessage = styled.h3``;

const WaitingScreen = () => {
  const [hideMessage, setHideMessage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const room = useSelector(selectActiveRoom);
  const myId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // change to selectUserState
  const history = useHistory();

  useEffect(() => {
    // console.log(`USEFFECT`, room);
    if (room) {
      setIsAdmin(myId === room.admin);
    }
  }, [myId, room]);

  // const getKickedHandler = useCallback

  useEffect(() => {
    dispatch(
      listener(`KICKED`, () => {
        history.replace("/");
        toast.error("You have been kicked from the room", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      })
    );
  }, []);

  const hideMessageHandler = () => {
    setHideMessage(hide => !hide);
  };

  const changeRoomModeHandler = () => {
    dispatch(changeRoomMode(room.id));
    toast.warning("Room mode has been changed", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  return (
    <React.Fragment>
      {room && (
        <StyledContainer id={room.id}>
          <StyledHeader>
            <StyledMode>
              <Icon
                icon={room.mode === `public` ? `public` : `lock`}
                size={30}
              />
              {room.mode}
            </StyledMode>
            <StyledTitle>{room.name}</StyledTitle>
            <Timer time={3} />
          </StyledHeader>
          <StyledShowIdContainer>
            {!hideMessage && (
              <StyledHiddenMessage>
                <button>{room.id}</button> is your room ID. Share it to friends
                or click on it to copy
              </StyledHiddenMessage>
            )}
            <label>
              <input type="checkbox" onClick={hideMessageHandler} /> Hide this
              message
            </label>
          </StyledShowIdContainer>
          {room && room.id && (
            <PlayersList
              players={room.players}
              myId={myId}
              isAdmin={isAdmin}
              room={room}
            />
          )}
          <div>
            <h4>Options</h4>
            <label onClick={changeRoomModeHandler}>
              <Icon
                size={20}
                icon={room.mode === "private" ? "tickBox" : "tickBoxUnchecked"}
              />
              Private room
              {/* {room.mode === `public` ? ` private` : ` public`} */}
            </label>
            {room.mode === "private" && (
              <p>Changing to public will show your room to everyone</p>
            )}
          </div>
          <ActionButton />
        </StyledContainer>
      )}
    </React.Fragment>
  );
};

export default WaitingScreen;
