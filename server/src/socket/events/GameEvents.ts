import getRoom from '../../utils/getRoom';
import getRoomObjectForUpdate from '../../utils/getRoomObjectForUpdate';
import { loggers } from '../../loaders/loggers';

import { roomTopics, WAITING_ROOM } from './RoomEvents';
import Deckit, { gameStage } from '../../classes/Deckit';
import IO from '../../classes/IO';
import { IExtendedSocket } from '../socket';

export const gameTopics = {
  START_GAME: 'MOONLIGHT-START_GAME',
  UPDATE_MY_CARDS: 'MOONLIGHT-UPDATE_MY_CARDS',
  SEND_HINT: 'MOONLIGHT-SEND_HINT',
  UPDATE_GAME: 'MOONLIGHT-UPDATE_GAME',
  CARD_FROM_DECK: 'MOONLIGHT-CARD_FROM_DECK',
  CARD_FROM_BOARD: 'MOONLIGHT-CARD_FROM_BOARD',
  NEXT_ROUND: 'MOONLIGHT-NEXT_ROUND',
  END_GAME: 'MOONLIGHT-END_GAME',
  RESET_ROUND: 'MOONLIGHT-RESET_ROUND',
};

export const GameEvents = (socket: IExtendedSocket) => {
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

      const room: Deckit = getRoom(activeRoomId);
      if (!room) {
        return;
      }
      await room.startGame();

      IO.getInstance().io.in(room.id).emit(roomTopics.UPDATE_ROOM, {
        state: room.state,
        scoreboard: room.scoreboard,
      });

      const updatedRoomObject = [getRoomObjectForUpdate(room, 'remove')];
      // if room is public, push update of the room info to Browse route
      if (room.mode === 'public') {
        IO.getInstance().io.in(WAITING_ROOM)
          .emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
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
      //   IO.getInstance().io.in(WAITING_ROOM)
      //    .emit(roomTopics.UPDATE_LIST_OF_ROOMS, updatedRoomObject);
      // }
      // // send updated room to all except sender
      // IO.getInstance().io.in(activeRoomId)
      //    .emit(roomTopics.UPDATE_ROOM, { players: room.players });
    },
  );

  interface ISendHint {
    hint: string;
    cardId: string;
  }
  socket.on(gameTopics.SEND_HINT, ({ hint, cardId }: ISendHint) => {
    if (!socket.deckitUser) {
      return;
    }
    const { deckitUser: { activeRoomId, id } } = socket;
    if (!activeRoomId) {
      return;
    }

    const room: Deckit = getRoom(activeRoomId);

    room.setHint({ hint, cardId, userId: id });
    room.updateStage(gameStage.pickCardFromDeck);

    loggers.event.sent.verbose(gameTopics.UPDATE_GAME, { hint, cardId, stage: room.stage });

    room.emitUpdateGame({
      hint: room.hint,
      stage: room.stage,
      playersPickedCardFromDeck: room.playersPickedCardFromDeck,
      playersPickedCardFromBoard: room.playersPickedCardFromBoard,
    });
  });

  socket.on(gameTopics.CARD_FROM_DECK, async ({ cardId }: { cardId: string }) => {
    if (!socket.deckitUser) {
      return;
    }
    const { deckitUser: { activeRoomId, id } } = socket;
    if (!activeRoomId) {
      return;
    }

    const room: Deckit = getRoom(activeRoomId);
    room.addCardsFromDeck({ cardId, userId: id });

    const gameUpdateObject = {
      playersPickedCardFromDeck: room.playersPickedCardFromDeck,
    };

    if (room.players.length === room.playersPickedCardFromDeck.length) {
      room.updateStage(gameStage.chooseCardsFromBoard);

      // @ts-ignore
      gameUpdateObject.stage = room.stage;
      // @ts-ignore
      gameUpdateObject.cardsForBoard = room.getCardsForBoard();
    }

    room.emitUpdateGame(gameUpdateObject);
  });

  socket.on(gameTopics.CARD_FROM_BOARD, ({ cardId }: { cardId: string }) => {
    if (!socket.deckitUser) {
      return;
    }
    const { deckitUser: { activeRoomId, id } } = socket;
    if (!activeRoomId) {
      return;
    }

    const room: Deckit = getRoom(activeRoomId);
    room.addCardsFromBoard({ cardId, userId: id });

    const gameUpdateObject = {
      playersPickedCardFromBoard: room.playersPickedCardFromBoard,
    };

    if (room.players.length === room.playersPickedCardFromBoard.length) {
      room.nextRound();
    } else {
      room.emitUpdateGame(gameUpdateObject);
    }
  });
};
