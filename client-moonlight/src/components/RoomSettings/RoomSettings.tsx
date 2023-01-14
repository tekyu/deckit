import Increment from 'components/Increment/Increment';
import Label from 'components/Label/Label';
import SimpleSwitch from 'components/SimpleSwitch/SimpleSwitch';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { gameActions, gameSelectors } from 'store/game/gameSlice';
import { ROOM_MODE } from 'store/room/roomInterfaces';
import { roomActions, roomSelectors } from 'store/room/roomSlice';
import { useAppThunkDispatch } from 'store/store';
import * as Styled from './RoomSettings.styled';

const RoomSettings = (): JSX.Element => {
  const maxScore = useSelector(gameSelectors.maxScore);
  const mode = useSelector(roomSelectors.mode);
  const dispatchSocket = useAppThunkDispatch();

  const { t } = useTranslation();

  const pointsChangeHandler = (maxScore: number) => {
    dispatchSocket(gameActions.changeMaxScore({ maxScore }));
  };

  const gameModeChangeHandler = (isPrivate: boolean) => {
    const mode: ROOM_MODE = isPrivate ? ROOM_MODE.private : ROOM_MODE.public;
    dispatchSocket(roomActions.changeRoomMode({ mode }));
  };

  return (
    <Styled.RoomSettings>
      <Styled.Points>
        <Label>Points</Label>
        <Increment value={maxScore} onChange={pointsChangeHandler} step={5} />
      </Styled.Points>

      <Styled.Visibility>
        <Label>{t('createGame.privateRoom')}</Label>
        <SimpleSwitch
          name="isPrivate"
          value={mode === ROOM_MODE.private}
          onChange={gameModeChangeHandler}
        />
      </Styled.Visibility>

    </Styled.RoomSettings>
  );
};

export default RoomSettings;
