import { IPlayerBubble } from 'components/PlayerBubble/IPlayerBubble';
import { useTranslation } from 'react-i18next';
import {
  BiUserCircle, BiX,
} from 'react-icons/bi';
import * as Styled from './PlayerBubble.styled';

const PlayerBubble = ({
  username,
  id,
  ready,
  you,
  isOwner,
  adminPower = false,
  kickHandler = () => { },
}: IPlayerBubble): JSX.Element => {
  const { t } = useTranslation();
  return (
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
        {isOwner ? <Styled.Owner>{t('player.host')}</Styled.Owner> : null}
        {you ? <Styled.You>{t('player.you')}</Styled.You> : null}
      </Styled.Info>
    </Styled.PlayerBubble>
  );
};

export default PlayerBubble;
