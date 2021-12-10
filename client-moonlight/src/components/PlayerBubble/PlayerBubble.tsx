import { IPlayerBubble } from 'components/PlayerBubble/IPlayerBubble';
import {
  BiUserCircle, BiX,
} from 'react-icons/bi';
import * as Styled from './PlayerBubble.styled';

const PlayerBubble = ({
  color,
  username,
  id,
  anonymous,
  ready,
  you,
  isOwner,
  adminPower = false,
  kickHandler = () => { },
}: IPlayerBubble): JSX.Element => (
  <Styled.PlayerBubble ready={ready}>
    <Styled.Bubble ready={ready}>
      <BiUserCircle />
      {(adminPower && !isOwner && !you)
        ? <Styled.Kick onClick={() => kickHandler(id)}><BiX /></Styled.Kick>
        : null}
    </Styled.Bubble>
    <Styled.Name hasFullInfoBox={you && isOwner}>
      {username}
    </Styled.Name>
    <Styled.Info>
      {isOwner ? <Styled.Owner>{adminPower ? 'You are the host' : 'This is the host'}</Styled.Owner> : null}
      {you && !isOwner ? <Styled.You>You are the player</Styled.You> : null}
    </Styled.Info>
  </Styled.PlayerBubble>
);

export default PlayerBubble;
