import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Loader from "../../../Generic/Loader/Loader";
import Icon from "../../../Generic/Icon/Icon";
import { kickPlayer } from "../../../../store/room/roomActions";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 140px;
  height: 200px;
  margin: 0 10px 10px 10px;
`;

const StyledUserIcon = styled.div`
  background: ${({ color }) => color};
  width: 100px;
  height: 100px;
  border-radius: 50px;
  position: relative;
  margin-top: 20px;
  transition: box-shadow 0.1s ease-in-out;
  ${({ isPlayerReady }) =>
    isPlayerReady &&
    `
    box-shadow: 0px 0px 60px 5px #68CAA0;
  `}
`;

const StyledRemoveIcon = styled(Icon)`
  background: #cb3066;
  color: #fff;
  border-radius: 100%;
  position: absolute;
  padding: 2px;
  top: 5px;
  left: 5px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in;
  &:focus,
  &:hover {
    box-shadow: 0px 0px 7px 0px rgba(80, 19, 40, 0.28);
  }
`;

const StyledUsername = styled.h3`
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  font-family: "Catamaran";
  margin-bottom: 20px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledAdminCrown = styled(Icon)`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
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

  const getPlayerState = () => {
    if (state === 0 && !itsMe) {
      return <Loader />;
    }
    return null;
  };

  const kickPlayerHandler = () => {
    dispatch(kickPlayer({ userId: id, activeRoomId: roomId, adminId: myId }));
  };

  const canKickPlayer = !itsMe && amIAdmin;
  return (
    <StyledContainer key={id} id={id} itsMe={itsMe} isAdmin={isAdmin}>
      <StyledUserIcon color={color} isPlayerReady={state}>
        {isAdmin && <StyledAdminCrown icon="crown" size={30} />}
        {itsMe && <StyledYou color={color} icon="user" size={30} />}
        {canKickPlayer && (
          <StyledRemoveIcon
            onClick={kickPlayerHandler}
            icon="cancel"
            size={30}
          />
        )}
        {isAnon ? (
          <Icon icon="user" size={100} />
        ) : (
          <img src={avatar} alt={`${username}'s avatar`} />
        )}
      </StyledUserIcon>
      <StyledUsername>{username}</StyledUsername>
      {getPlayerState()}
    </StyledContainer>
  );
};

export default Player;
