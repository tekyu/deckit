import { IRoomMode } from 'components/RoomMode/IRoomMode';
import { useTranslation } from 'react-i18next';
import {
  BiGlobe,
  BiJoystickAlt,
  BiKey,
} from 'react-icons/bi';
import { ROOM_MODE } from 'store/room/roomInterfaces';
import * as Styled from './RoomMode.styled';

const RoomMode = ({
  mode = ROOM_MODE.private,
}: IRoomMode): JSX.Element => {
  const { t } = useTranslation();
  const renderIcon = () => {
    if (mode === 'private') {
      return <BiKey />;
    }
    if (mode === 'public') {
      return <BiGlobe />;
    }
    return <BiJoystickAlt />;
  };
  return (
    <Styled.RoomMode>
      <Styled.IconContainer>
        {renderIcon()}
      </Styled.IconContainer>
      <Styled.Mode>
        {t(`gameMode.${mode}`)}
      </Styled.Mode>
    </Styled.RoomMode>
  );
};

export default RoomMode;
