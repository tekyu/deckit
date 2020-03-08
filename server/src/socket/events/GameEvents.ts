import getRoom from '../../utils/getRoom';
import cards from './../../cards/cards.json';
import distributeRandomCard from '../../utils/cards/distributeRandomCard';
import distributeRandomCardsToPlayers from '../../utils/cards/distributeRandomCardsToPlayers';
import Room from '../../classes/Room';

const flushPlayersForNextRound = players => {
  return players.map(player => {
    player.gameOptions = {
      ...player.gameOptions,
      myCard: null,
      choosedCard: null
    };
    return player;
  });
};

const flushRoomForNextRound = gameOptions => {
  gameOptions.hint = null;
  gameOptions.hintCard = null;
  return gameOptions;
};

const flushSocketForNextRound = pswOptions => {
  pswOptions.myCard = null;
  pswOptions.choosedCard = null;
  return pswOptions;
};

export const GameEvents = (socket: any, io: any) => {
  console.log('Game events');
  socket.on('START_GAME', ({ activeRoomId }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    console.log('START_GAME', activeRoomId);
    if (room.players.some(({ state }) => state === 0)) {
      console.log('CANNOT START GAME // PLAYERS NOT READY');
    }
    io.in(activeRoomId).emit('GAME_STARTED');
    room.gameOptions.initialCards = cards;

    room.players = distributeRandomCardsToPlayers(
      room.players,
      room.gameOptions.initialCards
    );
    room.state = 2;
    room.gameOptions.round = 1;
    room.gameOptions.stage = 2;
    room.gameOptions.hinter = room.players[0].id;
    io.in(activeRoomId).emit('ROOM_UPDATED', room);

    // distribute cards here
    // gameEvent -> cardsEvent
    // RoomCards class?
  });
  socket.on('SENT_HINT_CARD', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    room.gameOptions.hintCard = card;
    if (room.gameOptions.hint) {
      room.gameOptions.stage = 3;
      io.in(activeRoomId).emit('ROOM_UPDATED', room);
    }
  });

  socket.on('SENT_HINT', ({ activeRoomId, hint }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    room.gameOptions.hint = hint;
    if (room.gameOptions.hintCard) {
      room.gameOptions.stage = 3;
      io.in(activeRoomId).emit('ROOM_UPDATED', room);
    }
    // io.in(activeRoomId).emit('ROOM_UPDATED', { gameOptions: room.gameOptions });
  });

  socket.on('PICKED_CARD_TO_HINT', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const player = room.players.find(({ id }) => id === socket.pswOptions.id);
    player.myCard = card;
    socket.pswOptions.myCard;
    const areAllPicked = room.players.some(({ myCard }) => !!myCard);
    if (areAllPicked) {
      room.gameOptions.stage = 4;
    }
    io.in(activeRoomId).emit('ROOM_UPDATED', room);
    // io.in(activeRoomId).emit('ROOM_UPDATED', { gameOptions: room.gameOptions });
  });

  socket.on('CHOOSED_CARD_TO_MATCH_HINT', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const player = room.players.find(({ id }) => id === socket.pswOptions.id);
    player.choosedCard = card;
    socket.pswOptions.choosedCard = card;
    const areAllPicked = room.players.some(({ choosedCard }) => !!choosedCard);
    if (areAllPicked) {
      console.log('areAllPicked', areAllPicked);
      room.gameOptions.stage = 5;
      // room.gameOptions.round += 1;
      // award points
      // show point changes
      // show animations
      // show correct card
      // show timer for next round
      // set timer here with timestamp
      // io.in(activeRoomId).emit('ROOM_UPDATED', room);

      // room.gameOptions.timestamp = date now
      // settimeout for timestamp + 10s && eventual promise
      // in the meantime:
      // room.gameOptions.hinter =
      //   room.players[room.round % room.playersConnected.length].id;
      // room.gameOptions.hint = null;
      // room.gameOptions.hintCard = null;
      // room.gameOptions = flushRoomForNextRound(room.gameOptions);
      // room.players = flushPlayersForNextRound(room.players);
      // socket.pswOptions = flushSocketForNextRound(socket.pswOptions);
      // distribute cards

      // after timeout
      // room.gameOptions.stage = 2;
      io.in(activeRoomId).emit('ROOM_UPDATED', room);
    }
    io.in(activeRoomId).emit('ROOM_UPDATED', room);
  });
};
