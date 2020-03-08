export const calculateRoundPoints = room => {
  const hintedCard = room.hintCard;
  const hinter = room.hinter;
  // const hinterPlayer = findPlayer(room.playersConnected, hinter);
  /**
   * RULES
   * If all players find the hinter card
   * * hinter: 0pts, others: 2pts
   * If no players find the hinter card
   * * hinter: 0pts, others: 2pts + bonus per vote
   * If at least one player, but not all have found the hinter card
   * * hinter: 3pts, players who found: 3pts, + bonus per vote
   */

  // if all players find the hinter card
  const cardsEqualToHinterCard = room.roundCards.filter(card => {
    return card.card === hintedCard.id;
  });

  if (cardsEqualToHinterCard.length === room.roundCards.length) {
    // all players have found a hint card
    // hinter: 0pts, others: 2pts
    room.playersConnected = room.playersConnected.map(player => {
      player.score = player.id !== hinter ? +(player.score + 2) : player.score;
      return player;
    });
    console.log(
      chalk.bgMagenta(
        'all players have found a hint card, hinter: 0pts, others: 2pts'
      ),
      room.playersConnected
    );
    // return room;
  } else if (cardsEqualToHinterCard.length === 0) {
    // no player have found a hint card
    // hinter: 0pts, others: 2pts + bonus per vote
    const _tempRoom = { ...room };
    _tempRoom.playersConnected = _tempRoom.playersConnected.map(player => {
      player.score = player.id !== hinter ? +(player.score + 2) : player.score;
      return player;
    });
    // bonus
    _tempRoom.roundCards.forEach(card => {
      const ownerOfTheCard = findPlayerByCardId(
        _tempRoom.playersConnected,
        card.card
      );
      // if (ownerOfTheCard.id !== hinter) {
      //     ownerOfTheCard.score = ownerOfTheCard.score + 1;
      // }
      if (ownerOfTheCard.id !== hinter) {
        ownerOfTheCard.score = +(ownerOfTheCard.score + 1);
      }
      _tempRoom.playersConnected = updatePlayer(
        _tempRoom.playersConnected,
        ownerOfTheCard
      );
      room = { ...room, ..._tempRoom };
    });
    console.log(
      chalk.bgMagenta(
        'no player have found a hint card, hinter: 0pts, others: 2pts + bonus 1pts ea.'
      ),
      room.playersConnected
    );
  } else {
    const _tempRoom = { ...room };
    _tempRoom.roundCards.forEach(card => {
      const ownerOfTheCard = findPlayerByCardId(
        _tempRoom.playersConnected,
        card.card
      );
      if (ownerOfTheCard.id !== hinter) {
        ownerOfTheCard.score = ownerOfTheCard.score + 1;
      }
      _tempRoom.playersConnected = updatePlayer(
        _tempRoom.playersConnected,
        ownerOfTheCard
      );
    });
    cardsEqualToHinterCard.forEach(card => {
      hinterPlayer.score = hinterPlayer.score + 3;
      let ownerOfTheCard = findPlayerByCardId(
        _tempRoom.playersConnected,
        card.card
      );
      ownerOfTheCard.score = ownerOfTheCard.score + 3;

      _tempRoom.playersConnected = updatePlayer(
        _tempRoom.playersConnected,
        ownerOfTheCard
      );
    });
    room = { ...room, ..._tempRoom };
    console.log(
      chalk.bgMagenta(
        'normal round score, hinter: 3pts, players who found: 3pts + bonus 1pts ea., others: bonus 1pts ea.'
      ),
      room.playersConnected
    );
  }
  return room.playersConnected;
};
