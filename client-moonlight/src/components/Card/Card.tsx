import Button from 'components/Button/Button';
import { ICard } from 'components/Card/ICard';
import { useTranslation } from 'react-i18next';
import * as Styled from './Card.styled';

const Card = ({
  id, url, showButton, showButtonHandler, className = '',
}: ICard): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Styled.Card url={url} className={className}>
      {showButton
        ? (
          <Button
            palette="primary"
            version="contained"
            variant="light"
            onClick={() => showButtonHandler(`${id}`)}
          >
            {t('game.deck.pickThisCard')}
          </Button>
        ) : null}
    </Styled.Card>
  );
};

export default Card;
