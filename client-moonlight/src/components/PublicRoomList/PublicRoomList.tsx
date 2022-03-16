import RoomTile from 'components/RoomTile/RoomTile';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AnyAction } from 'redux';
import { roomActions } from 'store/room/roomSlice';
import { socketActions, socketTopics } from 'store/socket/socket';
import { useAppThunkDispatch } from 'store/store';
import { userActions, userSelectors } from 'store/user/userSlice';
import * as Styled from './PublicRoomList.styled';

interface IRoomList {
  playersMax: number;
  name: string;
  id: string;
  owner: string;
  players: number
}

interface IMinimalRoomInfo {
  id: string;
  name: string;
  owner: string;
  playersMax: number;
  players: number;
}

interface IUpdateRoomObject {
  action: 'add' | 'remove' | 'update',
  room: IMinimalRoomInfo,
  id: string
}

const PublicRoomList = (): JSX.Element => {
  const dispatch = useAppThunkDispatch();
  const [listOfRooms, setListOfRooms] = useState<IRoomList[]>([]);
  const kickedFrom = useSelector(userSelectors.kickedFrom);
  const { t } = useTranslation();
  const history = useHistory();

  const getFullListOfRoomsHandler = (rooms: IRoomList[]) => {
    setListOfRooms(rooms);
  };

  const emitFullListOfRooms = useCallback(() => {
    dispatch(socketActions.emit(
      socketTopics.room.getFullListOfRooms,
      {},
      getFullListOfRoomsHandler,
    ));
  }, []);

  useEffect(() => {
    emitFullListOfRooms();
  }, []);

  const updateListOfRooms = ({ action, room, id }: IUpdateRoomObject) => {
    if (action === 'add') {
      setListOfRooms((prev) => [...prev, room]);
    }

    if (action === 'remove') {
      setListOfRooms((prev) => prev.filter(({ id: roomId }) => roomId !== id));
    }

    if (action === 'update') {
      setListOfRooms((prev) => prev.map((roomFromList) => {
        if (roomFromList.id === id) {
          return room;
        }
        return roomFromList;
      }));
    }
  };

  useEffect(() => {
    dispatch(socketActions.listener(socketTopics.room.updateListOfRooms, updateListOfRooms));

    return () => {
      dispatch(socketActions.removeListener(
        socketTopics.room.updateListOfRooms,
        updateListOfRooms,
      ));
    };
  }, []);
  const onJoinHandler = (roomId: string) => {
    if (kickedFrom[roomId]) {
      toast.error(t('errors.room.connect.blacklisted'), {
        position: 'top-right',
        toastId: `roomlist-${roomId}`,
      });
      return;
    }

    dispatch(roomActions.joinRoom({ roomId }))
      .then(({ type, error }: AnyAction) => {
        if (type.includes('rejected')) {
          toast.error(t(`errors.room.connect.${error.message}`), {
            position: 'top-right',
            toastId: `roomlist-${roomId}`,
          });
          if (error.message === 'blacklisted') {
            dispatch(userActions.updateKickedFrom(roomId));
          }
        } else {
          history.push(`/game/${roomId}`);
        }
      }).catch(() => {
        toast.error(t('errors.room.connect.undefined'), {
          position: 'top-right',
          toastId: `roomlist-${roomId}`,
        });
      });
  };

  return (
    <Styled.PublicRoomList>
      <Styled.Header>
        {listOfRooms.length > 0
          ? t('dashboard.listOfPublicRoomsHeader')
          : (
            <>
              <p>{t('dashboard.noPublicRoomsAvailableHeader')}</p>
              <p>{t('dashboard.noPublicRoomsAvailableSubHeader')}</p>
            </>
          )}

      </Styled.Header>
      <Styled.List>

        {listOfRooms.map((room) => (
          <RoomTile
            key={room.id}
            id={room.id}
            name={room.name}
            players={room.players}
            playersMax={room.playersMax}
            owner={room.owner}
            onJoin={onJoinHandler}
          />
        ))}
      </Styled.List>
    </Styled.PublicRoomList>
  );
};

export default PublicRoomList;
