import { IPlayerBubble } from 'components/PlayerBubble/IPlayerBubble';
import ReadyButton from 'components/ReadyButton/ReadyButton';
import { useTranslation } from 'react-i18next';
import {
  BiUserCircle, BiX,
} from 'react-icons/bi';
import * as Styled from './PlayerBubble.styled';

const PlayerBubble = ({
  username,
  id = '123',
  ready = false,
  you = false,
  isOwner = false,
  adminPower = false,
  empty = false,
  number = 1,
  kickHandler = () => { },
  state = 0,
}: IPlayerBubble): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Styled.PlayerBubble ready={ready}>
      <Styled.Info>
        {isOwner ? <Styled.Owner>{t('player.host')}</Styled.Owner> : null}
        {you ? <Styled.You>{t('player.you')}</Styled.You> : null}
      </Styled.Info>
      {empty
        ? <Styled.Empty>{number}</Styled.Empty>
        : (
          <Styled.Bubble ready={ready}>
            <BiUserCircle />
            {(adminPower && !isOwner && !you && id)
              ? <Styled.Kick ready={ready} onClick={() => kickHandler(id)}><BiX /></Styled.Kick>
              : null}
          </Styled.Bubble>
        )}
      {username && (
        <Styled.Name hasFullInfoBox={you && isOwner}>
          {username}
        </Styled.Name>
      )}
      {!adminPower && you && <ReadyButton id={id} isReady={!!state || false} state={state} />}
    </Styled.PlayerBubble>
  );
};

export default PlayerBubble;
