// @ts-nocheck
import getRoom from '../../utils/getRoom';
import distributeRandomCard from '../../utils/cards/distributeRandomCard';
import distributeRandomCardsToPlayers from '../../utils/cards/distributeRandomCardsToPlayers';
import Room from '../../classes/Room';
import { gameOptions } from '../../utils/gameMapping';
import { calculateRoundPoints } from '../../utils/Deckit/calculateRoundPoints';
import prepareRoomForNextRound from '../../utils/cards/prepareRoomForNextRound';
import preparePlayersForNextRound from '../../utils/cards/preparePlayersForNextRound';
import prepareSocketForNextRound from '../../utils/cards/prepareSocketForNextRound';
import shuffle from '../../utils/cards/Shuffle';
import axios from '../../../axios';

export const GameEvents = (socket: any, io: any) => {
  socket.on('START_GAME', async ({ activeRoomId }: any) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    if (!room) return null;
    let { gameOptions } = room;
    const { decks } = gameOptions;
    // move this to roomEvents
    // create prepareRoom func
    // put this call there
    await axios
      .get(`/cards`, {
        params: {
          decks
        }
      })
      .then(({ data }) => {
        console.log('axios', data);
        room.gameOptions.remainingCards = data;
      })
      .catch(res => console.log('AXIOS catch', res.statusCode));

    const players = distributeRandomCardsToPlayers(
      room.players,
      room.gameOptions.remainingCards
    );
    players.forEach(({ id, cards }) => {
      io.to(id).emit('UPDATE_MY_CARDS', cards);
    });
    room.state = 2;
    gameOptions.round = 1;
    gameOptions.stage = 2;
    gameOptions.hinter = {
      username: room.players[0].username,
      id: room.players[0].id
    };
    room.scoreboard = players.reduce((newScoreboard, { id }) => {
      newScoreboard[id] = 0;
      return newScoreboard;
    }, {});
    io.in(activeRoomId).emit('ROOM_UPDATED', {
      state: room.state,
      players,
      scoreboard: room.scoreboard
    });
    io.in(activeRoomId).emit('GAME_UPDATED', {
      remainingCards: room.gameOptions.remainingCards.length,
      round: gameOptions.round,
      stage: gameOptions.stage,
      hinter: gameOptions.hinter,
      maxScore: gameOptions.maxScore
    });

    // distribute cards here
    // gameEvent -> cardsEvent
    // RoomCards class?
  });
  socket.on('SENT_HINT_CARD', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    room.gameOptions.hintCard = card;
    if (
      !room.gameOptions.pickedCardsToHint.some(
        ({ owner }) => socket.pswOptions.id === owner
      )
    ) {
      room.gameOptions.pickedCardsToHint.push({
        card: card,
        owner: {
          id: socket.pswOptions.id,
          color: socket.pswOptions.color,
          username: socket.pswOptions.username
        },
        pickedBy: []
      });
    }
  });

  socket.on('SENT_HINT', ({ activeRoomId, hint }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const {
      gameOptions: { hintCard, playersPickedCard }
    } = room;
    let {
      gameOptions: { stage }
    } = room;
    room.gameOptions.hint = hint;
    if (playersPickedCard.indexOf(socket.pswOptions.id) === -1) {
      playersPickedCard.push(socket.pswOptions.id);
    }
    if (room.gameOptions.hintCard) {
      stage = 3;
      io.in(activeRoomId).emit('GAME_UPDATED', {
        stage,
        hint,
        hintCard,
        playersPickedCard
      });
    }
  });

  socket.on('PICKED_CARD_TO_HINT', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const {
      gameOptions: { pickedCardsToHint, playersPickedCard },
      players
    } = room;
    let {
      gameOptions: { stage }
    } = room;
    pickedCardsToHint.push({
      card: card,
      owner: {
        id: socket.pswOptions.id,
        color: socket.pswOptions.color,
        username: socket.pswOptions.username
      },
      pickedBy: []
    });
    if (playersPickedCard.indexOf(socket.pswOptions.id) === -1) {
      playersPickedCard.push(socket.pswOptions.id);
    }
    io.in(activeRoomId).emit('GAME_UPDATED', { playersPickedCard });
    if (playersPickedCard.length === players.length) {
      stage = 4;
      const shuffledPickedCardsToHint = shuffle(pickedCardsToHint);
      io.in(activeRoomId).emit('GAME_UPDATED', {
        stage,
        pickedCardsToHint: shuffledPickedCardsToHint
      });
    }
  });

  socket.on('CHOSEN_CARD_TO_MATCH_HINT', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    let { gameOptions } = room;
    let { players, scoreboard } = room;
    const {
      pickedCardsToHint,
      choosedCardsToMatchHint,
      playersChoosedCard,
      remainingCards,
      maxScore
    } = gameOptions;
    let { stage, round } = gameOptions;

    const pickedCard = pickedCardsToHint.find(({ card: { id } }) => {
      return id === card.id;
    });
    if (playersChoosedCard.indexOf(socket.pswOptions.id) === -1) {
      choosedCardsToMatchHint.push({
        card: card,
        chooser: socket.pswOptions.id,
        owner: pickedCard.owner
      });
      pickedCard.pickedBy.push({
        id: socket.pswOptions.id,
        username: socket.pswOptions.username,
        color: socket.pswOptions.color
      });
      pickedCardsToHint;

      socket.pswOptions.choosedCard = card;

      playersChoosedCard.push(socket.pswOptions.id);
      io.in(activeRoomId).emit('GAME_UPDATED', { playersChoosedCard });
    }

    if (choosedCardsToMatchHint.length === players.length - 1) {
      room.scoreboard = calculateRoundPoints(scoreboard, gameOptions);
      room.setWinners();

      if (room.winners.length > 0) {
        room.state = 4;
        room.gameOptions.stage = 8;
        io.in(activeRoomId).emit('ROOM_UPDATED', {
          winners: room.winners,
          state: room.state,
          scoreboard: room.scoreboard
        });
        return;
      }
      room.gameOptions.stage = 5;
      io.in(activeRoomId).emit('GAME_UPDATED', {
        stage: room.gameOptions.stage,
        pickedCardsToHint
      });
      io.in(activeRoomId).emit('ROOM_UPDATED', { scoreboard: room.scoreboard });
      // award points
      // show point changes
      // show animations
      // show correct card
      // show timer for next round
      // set timer here with timestamp
      // const scoreData = players.map(({ id, gameOptions: { score } }) => {
      //   return { id, score };
      // });
      players = distributeRandomCardsToPlayers(players, remainingCards);
      players.forEach(({ id, cards }) => {
        io.to(id).emit('UPDATE_MY_CARDS', cards);
      });

      room.gameOptions = prepareRoomForNextRound(room);
      room.players = preparePlayersForNextRound(room.players);
      socket.pswOptions = prepareSocketForNextRound(socket.pswOptions);

      // TODO: FRONT TESTING FOR STAGE
      const interval = setTimeout(() => {
        io.in(activeRoomId).emit('GAME_UPDATED', {
          ...room.gameOptions,
          remainingCards: remainingCards.length
        });
        io.in(activeRoomId).emit('ROOM_UPDATED', {
          players: room.players
        });
      }, 5000);
    }
  });
};
