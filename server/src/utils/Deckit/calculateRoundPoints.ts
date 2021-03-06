import cloneDeep from 'clone-deep';
import chalk from 'chalk';

export const calculateRoundPoints = (
  scoreboard: any,
  { hintCard, hinter, choosedCardsToMatchHint }: any
) => {
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
    ({ card: { id } }: any) => {
      return id === hintCard.id;
    }
  );
  const numberOfCardsEqualToHintCard = cardsEqualToHinterCard.length;
  if (numberOfCardsEqualToHintCard === choosedCardsToMatchHint.length) {
    // all players have found a hint card
    // hinter: 0pts, others: 2pts
    console.log(
      chalk.bgMagenta(
        'all players have found a hint card, hinter: 0pts, others: 2pts'
      )
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
      }
    });
    // bonus
    choosedCardsToMatchHint.forEach(({ owner: { id }, card }: any) => {
      if (id !== hinter.id) {
        newScoreboard[id] += 1;
      }
    });
    console.log(
      chalk.bgMagenta(
        'no player have found a hint card, hinter: 0pts, others: 2pts + bonus 1pts ea.'
      )
    );
  } else {
    newScoreboard[hinter.id] += 3;
    cardsEqualToHinterCard.forEach(({ chooser }: any) => {
      newScoreboard[chooser] += 3;
    });
    choosedCardsToMatchHint.forEach(({ owner }: any) => {
      if (owner.id !== hinter.id) {
        newScoreboard[owner.id] += 1;
      }
    });
    console.log(
      chalk.bgMagenta(
        'normal round score, hinter: 3pts, players who found: 3pts + bonus 1pts ea., others: bonus 1pts ea.'
      )
    );
  }
  return newScoreboard;
};

/**
  returned scoreboard
  {
    id: score,
    id: score
  }

*/
