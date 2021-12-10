// @ts-nocheck
import getRoom from '../../utils/getRoom';
import distributeRandomCardsToPlayers from '../../utils/cards/distributeRandomCardsToPlayers';
import { calculateRoundPoints } from '../../utils/Deckit/calculateRoundPoints';
import preparePlayersForNextRound from '../../utils/cards/preparePlayersForNextRound';
import prepareSocketForNextRound from '../../utils/cards/prepareSocketForNextRound';
import shuffle from '../../utils/cards/Shuffle';
import axios from '../../../axios';
import getRoomObjectForUpdate from '../../utils/getRoomObjectForUpdate';
import { loggers } from '../../loaders/loggers';

import getRoomUpdateState from '../../utils/getRoomUpdateState';
import Room from '../../classes/Room';
import { roomTopics, WAITING_ROOM } from './RoomEvents';
import { ExtendedSocket } from './interfaces/IExtendedSocket';
import { IExtendedSocketServer } from './interfaces/IExtendedSocketServer';
import Deckit from '../../classes/Deckit';

export const gameTopics = {
  START_GAME: 'MOONLIGHT-START_GAME',
  UPDATE_MY_CARDS: 'MOONLIGHT-UPDATE_MY_CARDS',
};

export const GameEvents = (socket: ExtendedSocket, io: IExtendedSocketServer) => {
  socket.on(
    gameTopics.START_GAME,
    async () => {
      loggers.event.received.verbose(gameTopics.START_GAME, {});

      if (!socket.deckitUser) {
        return;
      }
      const { deckitUser: { activeRoomId } } = socket;
      if (!activeRoomId) {
        return;
      }

      const room: Deckit = getRoom(activeRoomId, io.gameRooms);
      if (!room) {
        return;
      }

      await room.startGame();

      io.in(room.id).emit(roomTopics.UPDATE_ROOM, {
        state: room.state,
        scoreboard: room.scoreboard,
      });

      const updatedRoomObject = [getRoomObjectForUpdate(room, 'remove')];
      // if room is public, push update of the room info to Browse route
      if (room.mode === 'public') {
        io.in(WAITING_ROOM).emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
      }

      // // get list of rooms needed to be updated in waiting room
      // const updatedRoomObject = [
      //   getRoomObjectForUpdate(
      //     room,
      //     getRoomUpdateState({
      //       players: room.players.length,
      //       playersMax: room.playersMax,
      //       state: room.state,
      //     }),
      //   ),
      // ];
      // // if room is public, push update of the room info to Browse route
      // if (room.mode === 'public') {
      //   io.in(WAITING_ROOM).emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
      // }
      // // send updated room to all except sender
      // io.in(activeRoomId).emit(roomTopics.UPDATE_ROOM, { players: room.players });
    },
  );

  // 2.0 end

  socket.on('START_GAME', async ({ activeRoomId }: any) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    if (!room) return null;
    const { players } = room;
    if (players.length <= 1) {
      return null;
    }

    const arePlayersNotReady = players.some(({ state }) => state < 1);
    if (arePlayersNotReady) {
      return null;
    }

    const { gameOptions } = room;
    const { decks } = gameOptions;
    // move this to roomEvents
    // create prepareRoom func
    // put this call there
    await axios
      .get('/cards', {
        params: {
          decks,
        },
      })
      .then(({ data }) => {
        room.gameOptions.remainingCards = data;
      })
      .catch((res) => console.log('AXIOS catch', res.statusCode));

    const players = distributeRandomCardsToPlayers(
      room.players,
      room.gameOptions.remainingCards,
    );
    players.forEach(({ id, cards }) => {
      gameOptions.updateCardTracker(id, cards, 'add');
      gameOptions.emitUpdatedCards(id, cards, io);
    });
    // room.players = players;
    room.setState(2);
    gameOptions.round = 1;
    gameOptions.stage = 2;
    gameOptions.hinter = {
      username: room.players[0].username,
      id: room.players[0].id,
    };
    room.scoreboard = players.reduce((newScoreboard, { id }) => {
      newScoreboard[id] = 0;
      return newScoreboard;
    }, {});
    io.in(activeRoomId).emit('ROOM_UPDATED', {
      state: room.state,
      scoreboard: room.scoreboard,
    });
    io.in(activeRoomId).emit('GAME_UPDATED', {
      remainingCards: room.gameOptions.remainingCards.length,
      round: gameOptions.round,
      stage: gameOptions.stage,
      hinter: gameOptions.hinter,
      maxScore: gameOptions.maxScore,
    });

    const updatedRoomObject = [getRoomObjectForUpdate(room, 'remove')];
    if (room.mode === 'public') {
      io.in('WAITING_ROOM').emit('updateListOfRooms', updatedRoomObject);
    }
  });
  socket.on('SENT_HINT_CARD', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    room.gameOptions.hintCard = card;
    if (
      !room.gameOptions.pickedCardsToHint.some(
        ({ owner: { id } }) => socket.pswOptions.id === id,
      )
    ) {
      room.gameOptions.pickedCardsToHint.push({
        card,
        owner: {
          id: socket.pswOptions.id,
          color: socket.pswOptions.color,
          username: socket.pswOptions.username,
        },
        pickedBy: [],
      });
    }
  });

  socket.on('SENT_HINT', ({ activeRoomId, hint }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const {
      gameOptions: { hintCard, playersPickedCard, playersChoosedCard },
    } = room;
    room.gameOptions.hint = hint;
    if (playersPickedCard.indexOf(socket.pswOptions.id) === -1) {
      playersPickedCard.push(socket.pswOptions.id);
    }
    if (playersChoosedCard.indexOf(socket.pswOptions.id) === -1) {
      playersChoosedCard.push(socket.pswOptions.id);
    }
    // TODO: TUTAJ WYRZUCIC KARTE Z DECKU ROOM.PLAYERS
    if (room.gameOptions.hintCard) {
      room.gameOptions.stage = 3;
      room.gameOptions.updateCardTracker(
        socket.pswOptions.id,
        [room.gameOptions.hintCard],
        'remove',
      );
      io.in(activeRoomId).emit('GAME_UPDATED', {
        stage: room.gameOptions.stage,
        hint,
        hintCard,
        playersPickedCard,
      });
    }
  });

  socket.on('PICKED_CARD_TO_HINT', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const {
      gameOptions: { pickedCardsToHint, playersPickedCard, playersChoosedCard },
      players,
    } = room;
    pickedCardsToHint.push({
      card,
      owner: {
        id: socket.pswOptions.id,
        color: socket.pswOptions.color,
        username: socket.pswOptions.username,
      },
      pickedBy: [],
    });
    if (playersPickedCard.indexOf(socket.pswOptions.id) === -1) {
      playersPickedCard.push(socket.pswOptions.id);
    }
    // TODO: TUTAJ WYRZUCIC KARTE Z DECKU ROOM.PLAYERS
    room.gameOptions.updateCardTracker(socket.pswOptions.id, [card], 'remove');
    io.in(activeRoomId).emit('GAME_UPDATED', { playersPickedCard });
    if (playersPickedCard.length === players.length) {
      room.gameOptions.stage = 4;
      const shuffledPickedCardsToHint = shuffle(pickedCardsToHint);
      io.in(activeRoomId).emit('GAME_UPDATED', {
        stage: room.gameOptions.stage,
        pickedCardsToHint: shuffledPickedCardsToHint,
        playersChoosedCard,
      });
    }
  });

  socket.on('CHOSEN_CARD_TO_MATCH_HINT', ({ activeRoomId, card }) => {
    const room = getRoom(activeRoomId, io.gameRooms);
    const { gameOptions } = room;
    const { players, scoreboard } = room;
    const {
      pickedCardsToHint,
      choosedCardsToMatchHint,
      playersChoosedCard,
      hintCard,
    } = gameOptions;
    const pickedCard = pickedCardsToHint.find(({ card: { id } }) => id === card.id);
    if (playersChoosedCard.indexOf(socket.pswOptions.id) === -1) {
      choosedCardsToMatchHint.push({
        card,
        chooser: socket.pswOptions.id,
        owner: pickedCard.owner,
      });
      pickedCard.pickedBy.push({
        id: socket.pswOptions.id,
        username: socket.pswOptions.username,
        color: socket.pswOptions.color,
      });

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
          scoreboard: room.scoreboard,
        });
        return;
      }
      room.gameOptions.stage = 5;
      io.in(activeRoomId).emit('GAME_UPDATED', {
        stage: room.gameOptions.stage,
        pickedCardsToHint,
        hintCard,
      });
      io.in(activeRoomId).emit('ROOM_UPDATED', { scoreboard: room.scoreboard });
      players.forEach(({ id }) => {
        room.gameOptions.updateSingleCard(id, io);
      });

      room.gameOptions.prepareRoomForNextRound(room.players);
      room.players = preparePlayersForNextRound(room.players);
      socket.pswOptions = prepareSocketForNextRound(socket.pswOptions);
    }
  });
};
