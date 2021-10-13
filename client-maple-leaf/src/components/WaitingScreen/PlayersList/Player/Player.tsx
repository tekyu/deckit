import React from 'react';
import { useDispatch } from 'react-redux';
import Loader from 'components/Generic/Loader/Loader';
import Icon from 'components/Generic/Icon/Icon';
import { kickPlayer } from 'store/room/roomActions';
import * as Styled from './Player.styled';

interface IPlayer {
  id?: string;
  state?: number;
  username?: string;
  color?: string;
  isAdmin?: boolean;
  isAnon?: boolean;
  avatar?: string;
  roomId?: string;
  myId?: string;
  itsMe?: boolean;
  amIAdmin?: boolean;
}

const Player = ({
  id = '',
  state = 0,
  username = '',
  color = '',
  isAdmin = false,
  isAnon = true,
  avatar = '',
  roomId = '',
  myId = '',
  itsMe = false,
  amIAdmin = false,
}: IPlayer): JSX.Element => {
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
    <Styled.Container key={id} id={id} itsMe={itsMe} isAdmin={isAdmin}>
      <Styled.UserIcon color={color} isPlayerReady={state}>
        {isAdmin && <Styled.AdminCrown icon="crown" size={30} />}
        {itsMe && <Styled.You color={color} icon="user" size={30} />}
        {canKickPlayer && (
          <Styled.RemoveIcon
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
      </Styled.UserIcon>
      <Styled.Username>{username}</Styled.Username>
      {getPlayerState()}
    </Styled.Container>
  );
};

export default Player;
