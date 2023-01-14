import getRoom from '../../utils/getRoom';
import { loggers } from '../../loaders/loggers';

import { roomTopics } from './RoomEvents';
import Deckit, { GamePropsKeys, gameStage } from '../../classes/Deckit';
import IO from '../../classes/IO';
import { IExtendedSocket } from '../socket';
import updateListOfRooms from '../../utils/updateListOfRooms';
import SocketUtils from '../../classes/Utils';

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
  UPDATE_MAX_SCORE: 'MOONLIGHT-UPDATE_MAX_SCORE',
};

// eslint-disable-next-line func-names
export const GameEvents = function (socket: IExtendedSocket) {
  this.socket = socket;
  this.socketUtils = new SocketUtils(this.socket)

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

      const room: Deckit | null = getRoom(activeRoomId);
      if (!room) {
        return;
      }
      await room.startGame();

      IO.getInstance().io.in(room.id).emit(roomTopics.UPDATE_ROOM, {
        state: room.state,
        scoreboard: room.scoreboard,
      });

      updateListOfRooms(room);
    },
  );

  interface ISendHint {
    hint: string;
    cardId: string;
  }
  socket.on(gameTopics.SEND_HINT, ({ hint, cardId }: ISendHint) => {
    const deckitUserId = this.socketUtils.getDeckitUserId()

    const game: Deckit | null = getRoom(this.socketUtils.getActiveRoomId());

    if (!game || !deckitUserId) {
      return;
    }

    game.setHint({ hint, cardId, userId: deckitUserId });
    game.updateStage(gameStage.pickCardFromDeck);

    loggers.event.sent.verbose(gameTopics.UPDATE_GAME, { hint, cardId, stage: game.stage });

    game.emitUpdateGame([
      'hint',
      'stage',
      'playersPickedCardFromDeck',
      'playersPickedCardFromBoard',
    ]);

    // room.emitUpdateGame({
    //   hint: room.hint,
    //   stage: room.stage,
    //   playersPickedCardFromDeck: room.playersPickedCardFromDeck,
    //   playersPickedCardFromBoard: room.playersPickedCardFromBoard,
    // });
  });

  socket.on(gameTopics.CARD_FROM_DECK, async ({ cardId }: { cardId: string }) => {
    if (!socket.deckitUser) {
      return;
    }
    const { deckitUser: { activeRoomId, id } } = socket;
    if (!activeRoomId) {
      return;
    }

    const room: Deckit | null = getRoom(activeRoomId);

    if (!room) {
      return;
    }

    room.addCardsFromDeck({ cardId, userId: id });

    const gameUpdateKeys: GamePropsKeys[] = ['playersPickedCardFromDeck']

    if (room.players.length === room.playersPickedCardFromDeck.length) {
      room.updateStage(gameStage.chooseCardsForBoard);

      // @ts-ignore
      gameUpdateKeys.push('stage')
      // @ts-ignore
      gameUpdateKeys.push('cardsForBoard')
    }

    room.emitUpdateGame(gameUpdateKeys);
  });

  socket.on(gameTopics.CARD_FROM_BOARD, ({ cardId }: { cardId: string }) => {
    if (!socket.deckitUser) {
      return;
    }
    const { deckitUser: { activeRoomId, id } } = socket;
    if (!activeRoomId) {
      return;
    }

    const room: Deckit | null = getRoom(activeRoomId);

    if (!room) {
      return;
    }

    room.addCardsForBoard({ cardId, userId: id });

    if (room.players.length === room.playersPickedCardFromBoard.length) {
      room.nextRound();
    } else {
      room.emitUpdateGame(['playersPickedCardFromBoard']);
    }
  });

  socket.on(gameTopics.UPDATE_MAX_SCORE, ({ maxScore }: { maxScore: number }) => {
    const game: Deckit | null = getRoom(this.socketUtils.getActiveRoomId());

    if (!game) {
      loggers.warn.warn('Could not get room id when updating max score');
    }

    game?.updateMaxScore(maxScore)
    game?.emitUpdateGame(['maxScore'])
    loggers.info.info(`Max score in room ${game?.id} updated to ${game?.maxScore}`)
  });
};
