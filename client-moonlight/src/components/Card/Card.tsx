import Button from 'components/Button/Button';
import { ICard } from 'components/Card/ICard';
import * as Styled from './Card.styled';

const Card = ({
  id, title, url, showButton, showButtonHandler, className = '',
}: ICard): JSX.Element => (
  <Styled.Card url={url} className={className}>
    {showButton
      ? (
        <Button
          palette="primary"
          version="contained"
          variant="light"
          onClick={() => showButtonHandler(`${id}`)}
        >
          Pick this card

        </Button>
      ) : null}
  </Styled.Card>
);

export default Card;
