import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Loader from "../../../Generic/Loader/Loader";
import Icon from "../../../Generic/Icon/Icon";
import {
  updatePlayerInRoom,
  kickPlayer
} from "../../../../store/room/roomActions";

const StyledContainer = styled.div`
  ${({ itsMe }) =>
    itsMe &&
    `
    background: red;
  `}

  border: 1px solid black;
  ${({ isAdmin }) =>
    isAdmin &&
    `
    border:1px solid green;
  `}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  margin: 0 10px 20px 10px;
`;

const StyledUserIcon = styled.div`
  background: ${({ color }) => color};
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 15px 0;
  position: relative;
`;

const StyledUsername = styled.h3`
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  font-family: "Catamaran";
  margin-bottom: 10px;
`;

const StyledYou = styled(Icon)`
  background: ${({ color }) => color};
  border-radius: 50px;
  position: absolute;
  padding: 2px;
  top: 5px;
  left: 5px;
`;

const Player = ({
  id,
  state,
  username,
  color,
  admin,
  isAdmin,
  isAnon,
  isOwner,
  avatar,
  roomId,
  myId,
  itsMe,
  amIAdmin
}) => {
  const dispatch = useDispatch();
  // const readyHandler = () => {
  //   dispatch(
  //     updatePlayerInRoom({
  //       activeRoomId: roomId,
  //       playerId: id,
  //       data: { state: state === 0 ? 1 : 0 }
  //     })
  //   );
  // };
  // console.log("PLAYER", {
  //   id,
  //   state,
  //   username,
  //   color,
  //   admin,
  //   isAdmin,
  //   isAnon,
  //   isOwner,
  //   avatar,
  //   roomId
  // });

  const getPlayerState = () => {
    if (state !== 0) {
      return <span>READY</span>;
    }
    if (!itsMe) {
      return <Loader />;
    }
    return null;
  };

  const kickPlayerHandler = () => {
    console.log("kickPlayerHandler", {
      userId: id,
      activeRoomId: roomId,
      adminId: myId
    });
    dispatch(kickPlayer({ userId: id, activeRoomId: roomId, adminId: myId }));
  };

  console.log(`PLAYER ${username} state: ${state}`);
  const canKickPlayer = !itsMe && amIAdmin;
  return (
    <StyledContainer key={id} id={id} itsMe={itsMe} isAdmin={isAdmin}>
      {isAdmin && <Icon icon="crown" size={30} />}
      <StyledUserIcon color={color}>
        {itsMe && <StyledYou color={color} icon="user" size={30} />}
        {canKickPlayer && (
          <Icon onClick={kickPlayerHandler} icon="cancel" size={30} />
        )}
        {isAnon ? (
          <Icon icon="user" size={100} />
        ) : (
          <img src={avatar} alt={`${username}'s avatar`} />
        )}
      </StyledUserIcon>
      <StyledUsername>{username}</StyledUsername>
      {/* {itsMe && !isOwner && (
        <button onClick={readyHandler}>
          {state === 0 ? "Ready" : "Not Ready"}
        </button>
      )} */}
      {getPlayerState()}
    </StyledContainer>
  );
};

export default Player;
