import cloneDeep from 'clone-deep';
import chalk from 'chalk';

export const calculateRoundPoints = (
  scoreboard,
  { hintCard, hinter, choosedCardsToMatchHint, pickedCardsToHint }
) => {
  console.log('calculateRoundPoints', scoreboard);
  let newScoreboard = cloneDeep(scoreboard);
  /**
   * RULES
   * If all players find the hinter card
   * * hinter: 0pts, others: 2pts
   * If no players find the hinter card
   * * hinter: 0pts, others: 2pts + bonus per vote
   * If at least one player, but not all have found the hinter card
   * * hinter: 3pts, players who found: 3pts, + bonus per vote
   */

  // if all players found hintCard
  const cardsEqualToHinterCard = choosedCardsToMatchHint.filter(
    ({ card: { id } }) => {
      console.log('cardsEqualToHinterCard [0]', id, hintCard.id);
      return id === hintCard.id;
    }
  );
  const numberOfCardsEqualToHintCard = cardsEqualToHinterCard.length;
  console.log(
    'cardsEqualToHinterCard',
    cardsEqualToHinterCard,
    numberOfCardsEqualToHintCard
  );
  if (numberOfCardsEqualToHintCard === choosedCardsToMatchHint.length) {
    // all players have found a hint card
    // hinter: 0pts, others: 2pts
    console.log(
      chalk.bgMagenta(
        'all players have found a hint card, hinter: 0pts, others: 2pts'
      ),
      newScoreboard,
      'cardsEqualToHinterCard',
      cardsEqualToHinterCard,
      'choosedCardsToMatchHint',
      choosedCardsToMatchHint
    );
    Object.entries(newScoreboard).forEach(([id]) => {
      if (hinter.id !== id) {
        newScoreboard[id] += 2;
      }
    });
  } else if (numberOfCardsEqualToHintCard === 0) {
    Object.entries(newScoreboard).forEach(([id]) => {
      if (hinter.id !== id) {
        newScoreboard[id] += 2;
        console.log('UPDATE SCOREBOARD [1]', id, newScoreboard);
      }
    });
    // bonus
    choosedCardsToMatchHint.forEach(({ owner: { id }, card }) => {
      if (id !== hinter.id) {
        newScoreboard[id] += 1;
        console.log('UPDATE SCOREBOARD [2]', id, card, newScoreboard);
      }
    });
    console.log(
      chalk.bgMagenta(
        'no player have found a hint card, hinter: 0pts, others: 2pts + bonus 1pts ea.'
      ),
      newScoreboard,
      'cardsEqualToHinterCard',
      cardsEqualToHinterCard,
      'choosedCardsToMatchHint',
      choosedCardsToMatchHint
    );
  } else {
    newScoreboard[hinter.id] += 3;
    console.log('[1]', newScoreboard, hinter.id, hinter);
    cardsEqualToHinterCard.forEach(({ chooser }) => {
      newScoreboard[chooser] += 3;
      console.log('[2]', newScoreboard, chooser);
    });
    choosedCardsToMatchHint.forEach(({ owner }) => {
      if (owner.id !== hinter.id) {
        newScoreboard[owner.id] += 1;
        console.log('[3]', newScoreboard, owner.id, owner);
      }
    });
    console.log(
      chalk.bgMagenta(
        'normal round score, hinter: 3pts, players who found: 3pts + bonus 1pts ea., others: bonus 1pts ea.'
      ),
      newScoreboard,
      'cardsEqualToHinterCard',
      cardsEqualToHinterCard,
      'choosedCardsToMatchHint',
      choosedCardsToMatchHint
    );
  }
  console.log('SCOREBOARD BEFORE RETURN', newScoreboard);
  return newScoreboard;
};

/**
  returned scoreboard
  {
    id: score,
    id: score
  }

*/
