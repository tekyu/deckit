import React from 'react';
import ScoreElement from 'containers/GameContainer/SidePanel/panels/score/components/ScoreElement';
import * as Styled from './Winners.styled';

const Winners = (): JSX.Element => {
  const sortedPlayers = [
    {
      score: 100,
      id: '123',
      avatar: '',
      username: 'Test',
      color: '#000000',
    },
    {
      score: 70,
      id: '1235',
      avatar: '',
      username: 'Test 1',
      color: '#000000',
    },
    {
      score: 60,
      id: '1234',
      avatar: '',
      username: 'Test 2',
      color: '#000000',
    },
    {
      score: 40,
      id: '1236',
      avatar: '',
      username: 'Test 3',
      color: '#000000',
    },

  ];

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Announcement>And the winner is</Styled.Announcement>
        <Styled.Laurel />
        <Styled.Name>blabla</Styled.Name>
        <Styled.Announcement>Congratulations!</Styled.Announcement>
      </Styled.Header>
      <Styled.RunnersupHeader>Runners up</Styled.RunnersupHeader>
      <Styled.Runnersup>
        {sortedPlayers
          && sortedPlayers.map((player) => (
            <Styled.ScoreElement key={player.id}>
              <ScoreElement
                player={player}
                score={40}
                progress={50}
              />
            </Styled.ScoreElement>
          ))}
      </Styled.Runnersup>
      <Styled.ReturnLink to="/">
        <Styled.ReturnButton
          variant="contained"
          color="primary"
          aria-label="return to main menu"
        >
          Return to main menu
        </Styled.ReturnButton>
      </Styled.ReturnLink>
    </Styled.Container>
  );
};

export default Winners;
