import Button from 'components/Button/Button';
import PlayerCounter from 'components/PlayerCounter/PlayerCounter';
import { IRoomTile } from 'components/RoomTile/IRoomTile';
import * as Styled from './RoomTile.styled';

const RoomTile = ({
  id,
  name,
  players,
  playersMax,
  owner,
  onJoin,
}: IRoomTile): JSX.Element => (
  <Styled.RoomTile>
    <Styled.Owner>
      Owner
      <span>
        {owner}
      </span>
    </Styled.Owner>
    <Styled.Name>{name}</Styled.Name>
    <Styled.Footer>
      <PlayerCounter current={players} max={playersMax} />
      <Button
        type="button"
        palette="primary"
        onClick={() => onJoin(id)}
      >
        Join
      </Button>
    </Styled.Footer>
  </Styled.RoomTile>
);

export default RoomTile;
