import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Loader from 'components/Generic/Loader/Loader';
import Icon from 'components/Generic/Icon/Icon';
import { kickPlayer } from 'store/room/roomActions';
import * as Styled from './Player.styled';

const Player = ({
  id,
  state,
  username,
  color,
  isAdmin,
  isAnon,
  avatar,
  roomId,
  myId,
  itsMe,
  amIAdmin,
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

Player.defaultProps = {
  id: '',
  state: 0,
  username: '',
  color: '',
  isAdmin: false,
  isAnon: true,
  avatar: '',
  roomId: '',
  myId: '',
  itsMe: false,
  amIAdmin: false,
};

Player.propTypes = {
  id: PropTypes.string,
  state: PropTypes.number,
  username: PropTypes.string,
  color: PropTypes.string,
  isAdmin: PropTypes.bool,
  isAnon: PropTypes.bool,
  avatar: PropTypes.string,
  roomId: PropTypes.string,
  myId: PropTypes.string,
  itsMe: PropTypes.bool,
  amIAdmin: PropTypes.bool,
};

export default Player;
