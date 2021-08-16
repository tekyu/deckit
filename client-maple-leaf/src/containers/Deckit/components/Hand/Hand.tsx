import React from 'react';
import { useSelector } from 'react-redux';
import 'swiper/swiper.scss';
import { deckitSelectors, userSelectors } from 'store/selectors';
import Blocker from 'components/Generic/Blocker/Blocker';
import { cardStateType, cardType } from 'containers/Deckit/components/Card/interfaces';
import Card from '../Card/Card';
import * as Styled from './Hand.styled';

const getState = (hinterId: string, stage: number, userId: string): cardStateType => {
  if (stage === 2 && hinterId === userId) {
    return 'hinter';
  }
  if (stage === 3 && hinterId !== userId) {
    return 'picker';
  }
  return '';
};

const Hand = (): JSX.Element => {
  const cards = useSelector(deckitSelectors.myCards);
  const hinter = useSelector(deckitSelectors.hinter);
  const stage = useSelector(deckitSelectors.gameStage);
  const user = useSelector(userSelectors.user); // select cards from user
  const blockHand = useSelector(deckitSelectors.blockHand);
  return (
    <Styled.Container>
      {blockHand && <Blocker />}
      <div style={{ height: '100%' }}>
        <Styled.Hand>
          {cards.map((card: cardType) => (
            <Styled.CardContainer key={card.id}>
              <Card card={card} state={getState(hinter.id, stage, user.id)} />
            </Styled.CardContainer>
          ))}
        </Styled.Hand>
      </div>
    </Styled.Container>
  );
};

export default Hand;
