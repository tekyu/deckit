import { IRoomMode } from 'components/RoomMode/IRoomMode';
import {
  BiGlobe,
  BiJoystickAlt,
  BiKey,
} from 'react-icons/bi';
import * as Styled from './RoomMode.styled';

const RoomMode = ({
  mode = 'private',
}: IRoomMode): JSX.Element => {
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
        {mode}
      </Styled.Mode>
    </Styled.RoomMode>
  );
};

export default RoomMode;
