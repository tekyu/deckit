import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { listener } from "store/actions";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Slider from "react-slick";
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
import PlayerCounterWithIcon from "../Generic/PlayerCounterWithIcon/PlayerCounterWithIcon";
import $Button from "../Generic/Button/Button.styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../containers/Deckit/components/Card/Card";

const StyledContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 20px 5px 100px rgba(207, 119, 243, 0.1),
    0px 5px 100px rgba(0, 155, 255, 0.1),
    -20px 5px 100px rgba(42, 201, 219, 0.1);
  border-radius: 6px;
  padding: 5px 20px 30px 20px;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;

const StyledHeader = styled.div`
  font-family: "Catamaran";
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
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
  margin-top: 20px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  /* background: #16bffd; */
  border-radius: 3px;
  margin: 20px 0;
  padding: 16px 32px;
  /* box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.28); */
  /* box-shadow: 20px 5px 40px #cf77f3, 0px 5px 40px #009bff,
    -20px 5px 40px #2ac9db; */
  box-shadow: 0px 5px 10px rgba(207, 119, 243, 0.3),
    0px 5px 10px rgba(0, 155, 255, 0.3), 0px 5px 10px rgba(42, 201, 219, 0.3);
  background-image: linear-gradient(
    35deg,
    #2ac9db 0%,
    #009bff 47%,
    #cf77f3 120%
  );
`;

const StyledHiddenMessage = styled.h3``;

const WaitingScreen = () => {
  const [hideMessage, setHideMessage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const room = useSelector(selectActiveRoom);
  const myId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (room) {
      setIsAdmin(myId === room.admin);
    }
  }, [myId, room]);

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

  const cards1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  return (
    <React.Fragment>
      <h2>Center Mode</h2>
      <div style={{ width: "800px", overflow: "hidden" }}>
        <Slider>
          {cards1.map(card => {
            console.log("CARD IN CAROUSEL", card);
            return (
              <Card
                card={card}
                key={card.id}
                onLoad={() => window.dispatchEvent(new Event("resize"))}
              />
            );
          })}
        </Slider>
      </div>
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
            <PlayerCounterWithIcon
              playersNow={room.players.length}
              playersMax={room.playersMax}
            />
          </StyledHeader>
          <StyledShowIdContainer>
            {!hideMessage && (
              <StyledHiddenMessage>
                <p>This is your room id</p>
                <p> Share it to friends or click on it to copy</p>
                <CopyToClipboard text={room.id}>
                  <StyledButton variant="contained" color="primary">
                    {room.id}
                  </StyledButton>
                </CopyToClipboard>
              </StyledHiddenMessage>
            )}
            <FormControlLabel
              label={
                hideMessage ? "Show id to share room" : `Hide this message`
              }
              control={
                <Checkbox
                  color="primary"
                  defaultChecked
                  onChange={hideMessageHandler}
                />
              }
            />
          </StyledShowIdContainer>
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
                    checked={room.mode === "private"}
                    onChange={changeRoomModeHandler}
                  />
                }
              />
            </div>
          )}
          <ActionButton />
        </StyledContainer>
      )}
    </React.Fragment>
  );
};

export default WaitingScreen;
